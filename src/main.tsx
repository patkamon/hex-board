import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { WagmiConfig } from "wagmi";
import "./index.css";

import { App } from "./App";
import { chains, config } from "./wagmi";

import { Auth0Provider } from '@auth0/auth0-react';


/**
 * Root providers and initialization of app
 * @see https://reactjs.org/docs/strict-mode.html
 * @see https://wagmi.sh/react/WagmiConfig
 * @see https://www.rainbowkit.com/docs/installation
 */
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider
    domain="" // autho0 domain
    clientId="" // autho0 client
    authorizationParams={{
      redirect_uri: "http://localhost:5173/home"
    }}
>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains}>
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
    </Auth0Provider>
  </React.StrictMode>,
);
