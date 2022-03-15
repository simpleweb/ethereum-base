import { ExternalLinkIcon } from "@heroicons/react/outline";
import { useConnectWallet, useSetChain, useWallets } from "@web3-onboard/react";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { Button } from "../components";
import { BLOCK_EXPLORER_URL } from "../helpers";

export default function Header() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const { t } = useTranslation("common");

  async function handleConnect() {
    await connect({});
    await setChain({ chainId: "0x13881" });
  }

  async function handleDisconnect() {
    if (wallet) {
      await disconnect(wallet);
    }
  }

  return (
    <header className="w-full">
      <div className="flex items-center justify-end">
        {wallet?.accounts[0].address ? (
          <>
            <a
              target="_blank"
              rel="noreferrer"
              href={BLOCK_EXPLORER_URL(wallet?.accounts[0]?.address)}
            >
              <div className="mx-2 flex hover:text-indigo-800">
                <span>
                  {wallet?.accounts[0]?.address.slice(0, 4)}...
                  {wallet?.accounts[0]?.address.slice(-4)}
                </span>
                <ExternalLinkIcon className="h-6 w-6" />
              </div>
            </a>
            <Button onClick={handleDisconnect}>
              {t("wallet.disconnect_button")}
            </Button>
          </>
        ) : (
          <Button onClick={handleConnect}>{t("wallet.connect_button")}</Button>
        )}
      </div>
    </header>
  );
}
