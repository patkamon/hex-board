import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { getAccount } from '@wagmi/core'

import { Attestooooooor, Balances, LineChart } from "./components";
import "./index.css";

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

export function App() {
  /**
   * Wagmi hook for getting account information
   * @see https://wagmi.sh/docs/hooks/useAccount
   */
  const { isConnected } = useAccount();
  const account = getAccount()

  return (
    <div className="bg-gradient-to-b from-cyan-300 to-cyan-400">
      <div className="mx-24">

<div className="flex pt-8">
    <img src="./logo.png" width={40}></img>
      <h1 className="text-3xl ml-2 mr-12 font-semibold text-blue-700">HEX BOARD</h1>

      {/** @see https://www.rainbowkit.com/docs/connect-button */}

      <div className="ml-auto">
        <ConnectButton />
        </div>
</div>


      {isConnected && (
        <>


      {/* <Layout> */}
      <div className="mt-8"/>
      <BrowserRouter>
      <Routes>
        <Route  path="*" element={ <Attestooooooor />} />
        <Route  path="/home" element ={ <Balances account={account.address}/>} />
      {/* </Layout> */}
      </Routes>
      </BrowserRouter>
      <div />




        </>
      )}
      </div>
    </div>
  );
}
