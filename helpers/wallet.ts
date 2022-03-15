import type {
  ConnectOptions,
  SetChainOptions,
  WalletState,
} from "@web3-onboard/core";

async function readyToTransact(
  wallet: WalletState,
  connect: () => void,
  setChain: (options: SetChainOptions) => void
) {
  if (!wallet) {
    const walletSelected = await connect();
    if (!walletSelected) return false;
  }
  // prompt user to switch to Rinkeby for test
  await setChain({ chainId: process.env.NEXT_PUBLIC_CHAIN_ID });

  return true;
}

export { readyToTransact };
