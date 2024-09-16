import { BarretenbergBackend, CompiledCircuit } from "@noir-lang/backend_barretenberg";
import { Noir } from "@noir-lang/noir_js";
import circuit from "../circuit/circuit.json";

const compiledDotMatrixCircuit = circuit as CompiledCircuit;

export const barrentenberg = new BarretenbergBackend(compiledDotMatrixCircuit);
export const noir = new Noir(compiledDotMatrixCircuit);
