import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getAccount } from '@wagmi/core'

import { Attestooooooor, Balances } from "./components";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();
  const account = getAccount()
  console.log(account)

  return (
    <>
      <h1>OP Starter Project</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}
      <ConnectButton />


      {isConnected && (
        <>
          <hr />
          <Attestooooooor />
          <Balances account={account.address}/>

          <hr />
        </>
      )}
    </>
  );
}
