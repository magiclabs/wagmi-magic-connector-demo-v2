import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { goerli, mainnet, polygonAmoy, sepolia } from "@wagmi/core/chains";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [sepolia, mainnet, polygonAmoy, goerli],
  transports: {
    [sepolia.id]: http(process.env.REACT_APP_SEPOLIA_RPC_URL),
    [mainnet.id]: http(process.env.REACT_APP_ETHEREUM_RPC_URL),
    [polygonAmoy.id]: http(process.env.REACT_APP_POLYGON_AMOY_RPC_URL),
  },
  autoConnect: true,
  connectors: [
    dedicatedWalletConnector({
      chains: [sepolia, mainnet, polygonAmoy, goerli],
      options: {
        networks: [
          "sepolia",
          "mainnet",
          "goerli",
          { chainId: 80002, rpcUrl: "https://polygon-amoy.drpc.org" },
        ],
        apiKey: process.env.REACT_APP_MAGIC_API_KEY,
        isDarkMode: true,
        /* Make sure to enable OAuth options from magic dashboard */
        oauthOptions: {
          providers: ["google", "twitter", "github"],
        },
        magicSdkConfiguration: {
          network: "mainnet",
        },
      },
    }),
  ],
});

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Dashboard />
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
