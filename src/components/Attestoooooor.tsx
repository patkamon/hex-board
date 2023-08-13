import { useState } from "react";
import { useAccount, useNetwork, useWaitForTransaction } from "wagmi";
import {
  parseString,
  stringifyAttestationBytes,
  encodeRawKey,
} from "@eth-optimism/atst";
import LoginButton from "./Login";

/**
 * These react hooks are generated with the wagmi cli via `wagmi generate`
 * @see ROOT/wagmi.config.ts
 */


export function Attestooooooor() {


  return (
    <div className="flex justify-center pt-[30vh] pb-[50%]">
      <LoginButton/>
    </div>
  );
}
