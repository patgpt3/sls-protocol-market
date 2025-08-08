"use client";

import { useState } from "react";
import { ethers } from "ethers";
import { recordAccess } from "@/lib/onchain/accessRegistry";

export default function OnchainDemo(): JSX.Element {
  const [label, setLabel] = useState("demo-dataset");
  const [status, setStatus] = useState<string>("");

  const handleRecord = async () => {
    try {
      setStatus("Connecting wallet…");
      // @ts-ignore
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setStatus("Submitting on-chain receipt…");
      const receipt = await recordAccess(signer, label);
      setStatus(`Recorded at tx: ${receipt.transactionHash}`);
    } catch (e: any) {
      setStatus(`Error: ${e?.message ?? e}`);
    }
  };

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">On-chain Access Receipt (Phase 1)</h1>
      <p className="text-sm opacity-80 mb-4">
        This demo writes a minimal access receipt to the AccessRegistry contract. Configure
        <code className="mx-1">NEXT_PUBLIC_ACCESS_REGISTRY_ADDRESS</code> to enable.
      </p>
      <div className="flex gap-2 items-center mb-3">
        <input
          className="border rounded px-3 py-2 w-64"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="dataset label"
        />
        <button
          className="bg-blue-600 text-white rounded px-4 py-2"
          onClick={handleRecord}
        >
          Record Access
        </button>
      </div>
      <div className="text-sm text-gray-300 break-all">{status}</div>
    </main>
  );
}


