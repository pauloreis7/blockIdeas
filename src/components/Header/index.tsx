import { Flex } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "../../contexts/WalletContext";

import { Logo } from "./Logo";
import { UnsupportedNetwork } from "./UnsupportedNetwork";
import { WalletProfile } from "./WalletProfile";
import { ConnectWallet } from "./ConnectWallet";

import { config } from "../../config";

export function Header() {
  const { account, chainId } = useWeb3React();

  const {
    walletFormatted,
    connectorName,
    setWalletModalOpen,
    setIsWalletProfileModalOpen,
    showChainError,
  } = useWallet();

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

      {showChainError && chainId !== config.supportedChainIds[0] ? (
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
