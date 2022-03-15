import injectedModule from "@web3-onboard/injected-wallets";
import { init } from "@web3-onboard/react";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL;

const injected = injectedModule();

export default init({
  wallets: [injected],
  chains: [
    {
      id: "0x13881",
      token: "MATIC",
      label: "Polygon Mumbai",
      rpcUrl: RPC_URL,
    },
  ],
  appMetadata: {
    name: "Ethereum Base",
    icon: "<svg><svg/>",
    description: "Ethereum base website",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
    ],
  },
});
