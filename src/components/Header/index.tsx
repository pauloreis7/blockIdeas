import { Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "../../contexts/WalletContext";

import { Logo } from "./Logo";
import { UnsupportedNetwork } from "./UnsupportedNetwork";
import { WalletProfile } from "./WalletProfile";
import { ConnectWallet } from "./ConnectWallet";

import { config } from "../../config";

export function Header() {
  // states
  const [injectedChainId, setInjectedChainId] = useState("");

  // hooks
  const { account, chainId } = useWeb3React();
  const {
    walletFormatted,
    connectorName,
    setWalletModalOpen,
    setIsWalletProfileModalOpen
  } = useWallet();

  useEffect(() => {
    const listener = () => {
      const { ethereum } = window as any;

      if (!chainId && ethereum && ethereum.on) {
        const handleChainChanged = (chainId: string) => {
          console.log("Handling 'chainChanged' event with payload", chainId);
          setInjectedChainId(chainId);
        };
        ethereum.on("chainChanged", handleChainChanged);

        setInjectedChainId(ethereum.chainId);

        return () => {
          if (ethereum.removeListener) {
            ethereum.removeListener("chainChanged", handleChainChanged);
          }
        };
      }
    };

    window.addEventListener("load", listener);

    return () => {
      window.removeEventListener("load", listener);
    };
  }, [chainId]);

  return (
    <Flex
      as="header"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      wrap="wrap"
      gap={4}
      px="6"
      py="6"
    >
      <Logo />

      {!chainId &&
      injectedChainId ===
        `0x${Number(config.supportedChainIds[0]).toString(16)}` ? (
        <ConnectWallet handleOpenWalletConnectionModal={setWalletModalOpen} />
      ) : !chainId ||
        injectedChainId !==
          `0x${Number(config.supportedChainIds[0]).toString(16)}` ? (
        <UnsupportedNetwork />
      ) : account && connectorName ? (
        <WalletProfile
          walletFormatted={walletFormatted}
          connectorName={connectorName}
          handleOpenWalletProfileModal={setIsWalletProfileModalOpen}
        />
      ) : (
        <ConnectWallet handleOpenWalletConnectionModal={setWalletModalOpen} />
      )}
    </Flex>
  );
}
