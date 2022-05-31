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
  const [injectedChainId, setInjectedChainId] = useState<number | null>(null);

  // hooks
  const { chainId } = useWeb3React();
  const {
    walletFormatted,
    connectorName,
    setWalletModalOpen,
    setIsWalletProfileModalOpen,
  } = useWallet();

  useEffect(() => {
    const listener = () => {
      const { ethereum } = window as any;

      setInjectedChainId(parseInt(ethereum.chainId, 16));

      if (!chainId && ethereum && ethereum.on) {
        const handleChainChanged = (chainId: string) => {
          console.log("Handling 'chainChanged' event with payload", chainId);
          setInjectedChainId(parseInt(chainId, 16));
        };
        ethereum.on("chainChanged", handleChainChanged);

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

  if (injectedChainId === config.supportedChainIds[0] && !chainId) {
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

        <ConnectWallet handleOpenWalletConnectionModal={setWalletModalOpen} />
      </Flex>
    );
  }

  if (
    (chainId && chainId !== config.supportedChainIds[0]) ||
    injectedChainId !== config.supportedChainIds[0]
  ) {
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

        <UnsupportedNetwork />
      </Flex>
    );
  }

  if (
    (chainId === config.supportedChainIds[0] ||
      injectedChainId === config.supportedChainIds[0]) &&
    connectorName
  ) {
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

        <WalletProfile
          walletFormatted={walletFormatted}
          connectorName={connectorName}
          handleOpenWalletProfileModal={setIsWalletProfileModalOpen}
        />
      </Flex>
    );
  }

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

      <ConnectWallet handleOpenWalletConnectionModal={setWalletModalOpen} />
    </Flex>
  );
}
