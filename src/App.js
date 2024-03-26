import { createConfig, WagmiProvider } from "wagmi";
import { http } from "viem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { sepolia } from '@wagmi/core/chains'
import { dedicatedWalletConnector } from "@magiclabs/wagmi-connector";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(process.env.REACT_APP_RPC_URL)
  },
  autoConnect: true,
  connectors: [
    dedicatedWalletConnector({
      chains: [sepolia],
      options: {
        apiKey: process.env.REACT_APP_MAGIC_API_KEY,
        isDarkMode: true,
        /* Make sure to enable OAuth options from magic dashboard */
        oauthOptions: {
          providers: ["google", "twitter", "github"],
        },
        magicSdkConfiguration: {
          network: {
            rpcUrl: process.env.REACT_APP_RPC_URL,
            chainId: 11155111,
          },
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