import "@rainbow-me/rainbowkit/styles.css";
import {
  ConnectButton,
  getDefaultConfig,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { optimismSepolia } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DotMatrixInput } from "./components/DotMatrixInput";

const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [optimismSepolia],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

function App() {
  const [input, setInput] = useState([
    [0, 0],
    [0, 0],
  ]);

  const onValueChange = (value: number, i: number, j: number) => {
    setInput((prev) => {
      const updateValue = prev;
      updateValue[i][j] = value;

      return [...updateValue];
    });
  };

  console.log("asdfdsf", input);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
          <DotMatrixInput input={input} onValueChange={onValueChange} />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
