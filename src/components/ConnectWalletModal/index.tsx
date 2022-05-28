import {
  Text,
  ScaleFade,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  ModalFooter,
  Heading,
} from "@chakra-ui/react";

import { useWallet } from "../../contexts/WalletContext";

import { ConnectWalletButton } from "./ConnectWalletButton";

export function ConnectWalletModal() {
  const {
    isWalletModalOpen,
    setWalletModalOpen,
    handleMetaMask,
    handleWalletConnect,
  } = useWallet();

  return (
    <ScaleFade initialScale={2} in={isWalletModalOpen}>
      <Modal
        onClose={() => setWalletModalOpen(false)}
        isOpen={isWalletModalOpen}
        motionPreset="slideInBottom"
      >
        <ModalOverlay zIndex={10} />

        <ModalContent bg="gray.800" borderRadius="0.5rem">
          <ModalHeader p="3" mb="6" bg="gray.900" borderRadius="0.5rem">
            <Heading fontSize="xl">Connect Wallet</Heading>
          </ModalHeader>

          <ModalCloseButton size="0.5rem" top="4" right="4" />

          <ModalBody px="5">
            <Stack spacing="8">
              <ConnectWalletButton
                title="MetaMask"
                imageUrl="/metamask-logo.svg"
                handleConnectWallet={handleMetaMask}
              />

              <ConnectWalletButton
                title="WalletConnect"
                imageUrl="/walletconnect-logo.svg"
                handleConnectWallet={handleWalletConnect}
              />
            </Stack>
          </ModalBody>

          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Text w="80%" textAlign="center" fontSize="sm" color="orange.400">
              Please note, you need connect wallet to send and vote in ideias.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
}
