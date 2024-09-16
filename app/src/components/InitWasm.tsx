import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import { ReactElement, useEffect, useState } from "react";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const InitWasm = ({ children }: Props): ReactElement => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    (async () => {
      await Promise.all([
        initACVM(
          new URL(
            "@noir-lang/acvm_js/web/acvm_js_bg.wasm",
            import.meta.url
          ).toString()
        ),
        initNoirC(
          new URL(
            "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm",
            import.meta.url
          ).toString()
        ),
      ]);
      setInit(true);
    })();
  });

  return <div>{init && children}</div>;
};
