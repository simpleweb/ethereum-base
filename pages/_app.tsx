import type { OnboardAPI } from "@web3-onboard/core";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Header } from "../components";
import { initOnboard } from "../services";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [{ wallet }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const [onboard, setOnboard] = useState<OnboardAPI>();

  useEffect(() => {
    setOnboard(initOnboard);
  }, []);

  useEffect(() => {
    if (!connectedWallets.length) return;

    const connectedWalletsLabelArray = connectedWallets.map(
      ({ label }) => label
    );
    window.localStorage.setItem(
      "connectedWallets",
      JSON.stringify(connectedWalletsLabelArray)
    );
  }, [connectedWallets]);

  useEffect(() => {
    const previouslyConnectedWallets = JSON.parse(
      window.localStorage.getItem("connectedWallets")
    );

    async function setWalletFromLocalStorage() {
      await connect({ autoSelect: previouslyConnectedWallets[0] });
    }

    if (previouslyConnectedWallets?.length) {
      console.log({ previouslyConnectedWallets });
      setWalletFromLocalStorage();
    }
  }, [onboard, connect]);

  return (
    <div className="m-4">
      <Header />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
