import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia, polygonAmoy, sepolia } from "@wagmi/core/chains";
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [sepolia, polygonAmoy, baseSepolia],
  transports: {
    [sepolia.id]: http("https://sepolia.drpc.org"),
    [polygonAmoy.id]: http("https://polygon-amoy.drpc.org"),
    [baseSepolia.id]: http("https://sepolia.base.org"),
  },
  autoConnect: true,
  connectors: [
    dedicatedWalletConnector({
      chains: [sepolia, polygonAmoy, baseSepolia],
      options: {
        networks: [sepolia, polygonAmoy, baseSepolia],
        apiKey: process.env.REACT_APP_MAGIC_API_KEY,
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
