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
import { barrentenberg, noir } from "./instances/barrenterberg";
import { ProofData } from "@noir-lang/backend_barretenberg";
import { InitWasm } from "./components/InitWasm";

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
  const [proof, setProof] = useState<ProofData>();

  const onValueChange = (value: number, i: number, j: number) => {
    setInput((prev) => {
      const updateValue = prev;
      updateValue[i][j] = value;

      return [...updateValue];
    });
  };

  const generateProof = async () => {
    // Execute the circuit with the input
    const { witness } = await noir.execute({
      x: input[0],
      y: input[1],
    });

    const proof = await barrentenberg.generateProof(witness);
    setProof(proof);
  };

  console.log("proof", proof);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <InitWasm>
            <ConnectButton />
            <DotMatrixInput input={input} onValueChange={onValueChange} />
            <button
              onClick={async () => {
                await generateProof();
              }}
            >
              Generate proof
            </button>
          </InitWasm>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
