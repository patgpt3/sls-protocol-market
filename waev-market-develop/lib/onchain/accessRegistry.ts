"use client";

import { ethers } from "ethers";

// Minimal ABI for an AccessRegistry contract
// interface AccessRegistry {
//   function recordAccess(bytes32 datasetId, address user) external;
//   event AccessRecorded(bytes32 indexed datasetId, address indexed user, uint256 blockTime);
// }

export const ACCESS_REGISTRY_ABI = [
  {
    inputs: [
      { internalType: "bytes32", name: "datasetId", type: "bytes32" },
      { internalType: "address", name: "user", type: "address" },
    ],
    name: "recordAccess",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "bytes32", name: "datasetId", type: "bytes32" },
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "blockTime", type: "uint256" },
    ],
    name: "AccessRecorded",
    type: "event",
  },
];

export function getAccessRegistryAddress(): string | undefined {
  return process.env.NEXT_PUBLIC_ACCESS_REGISTRY_ADDRESS;
}

export function toDatasetId(label: string): string {
  // Use keccak256 of the label for a deterministic bytes32 id
  return ethers.id(label); // returns 0x-prefixed 32-byte hash
}

export async function recordAccess(
  signer: ethers.Signer,
  datasetLabel: string,
  userAddress?: string
): Promise<ethers.TransactionReceipt> {
  const address = getAccessRegistryAddress();
  if (!address) throw new Error("AccessRegistry address not configured");

  const contract = new ethers.Contract(address, ACCESS_REGISTRY_ABI, signer);
  const datasetId = toDatasetId(datasetLabel);
  const recipient = userAddress ?? (await signer.getAddress());
  const tx = await contract.recordAccess(datasetId, recipient);
  const receipt = await tx.wait();
  return receipt as ethers.TransactionReceipt;
}


