'use client';

import { WagmiProvider, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { baseSepolia, polygonAmoy, sepolia } from "@wagmi/core/chains";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import { metaMask } from "wagmi/connectors/metaMask";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [sepolia, polygonAmoy, baseSepolia],
  transports: {
    [sepolia.id]: http('https://sepolia.drpc.org'),
    [polygonAmoy.id]: http('https://polygon-amoy.drpc.org'),
    [baseSepolia.id]: http('https://sepolia.base.org'),
  },
  autoConnect: true,
  connectors: [
    dedicatedWalletConnector({
      chains: [sepolia, polygonAmoy, baseSepolia],
      options: {
        networks: ["sepolia", polygonAmoy, baseSepolia],
        apiKey: process.env.NEXT_PUBLIC_MAGIC_API_KEY as string,
        isDarkMode: true,
        /* Make sure to enable OAuth options from magic dashboard */
        oauthOptions: {
          providers: ["google", "twitter", "github"],
        },
        magicSdkConfiguration: {
          network: "sepolia",
        },
      },
    }),
    metaMask(),
  ],
});

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

