import { Flex } from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "../../contexts/WalletContext";

import { Logo } from "./Logo";
import { WalletProfile } from "./WalletProfile";
import { ConnectWallet } from "./ConnectWallet";

export function Header() {
  const { account } = useWeb3React();

  const {
    walletFormatted,
    connectorName,
    setWalletModalOpen,
    setIsWalletProfileModalOpen,
  } = useWallet();

  return (
    <Flex
      as="header"
      w="100%"
      alignItems="center"
      justifyContent="space-between"
      px="6"
      py="6"
    >
      <Logo />

      {account && connectorName ? (
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
