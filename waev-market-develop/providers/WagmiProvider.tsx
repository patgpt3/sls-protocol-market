"use client";

import { defaultRPC } from "@/web3/config";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { WagmiConfig } from "wagmi";

const waev_testnet = {
  id: 100,
  name: "Eclipse Waev Testnet",
  network: "Waev Testnet",
  nativeCurrency: {
    decimals: 18,
    name: "Waev",
    symbol: "WAEV",
  },
  rpcUrls: {
    default: { http: [defaultRPC] },
    public: { http: [defaultRPC] },
  },
  blockExplorers: {
    default: {
      name: "Waev Explorer",
      url: "https://waev.explorer.modular.cloud",
    },
  },
  testnet: true,
};

const projectId = "cd2a677835fce2fc1da920663432408d"; // to do - move this in a config or .env file
const chains = [waev_testnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId });
const includeWalletIds = [
  "1ae92b26df02f0abca6304df07debccd18262fdf5fe82daa81593582dac9a369",
  "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
];

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  // includeWalletIds: [
  //   "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
  // ],
  // excludeWalletIds: [
  //   "fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",
  // ],
});

export function WagmiProvider({ children }: { children: React.ReactNode }) {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
}
