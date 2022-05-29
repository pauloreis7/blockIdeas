import {
  Flex,
  Box,
  Text,
  Button,
  ScaleFade,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";

import { useWallet } from "../contexts/WalletContext";

export function WalletProfileModal() {
  const { active } = useWeb3React();

  const {
    walletFormatted,
    handleSignOut,
    connectorName,
    isWalletProfileModalOpen,
    setIsWalletProfileModalOpen,
  } = useWallet();

  return (
    <ScaleFade initialScale={2} in={isWalletProfileModalOpen}>
      <Modal
        onClose={() => setIsWalletProfileModalOpen(false)}
        isOpen={isWalletProfileModalOpen}
        motionPreset="slideInBottom"
        isCentered
      >
        <ModalOverlay />

        <ModalContent
          bg="gray.800"
          width="100%"
          maxWidth="lg"
          borderRadius="1.5rem"
        >
          <ModalHeader bg="gray.900" p="3" borderTopRadius="1.5rem">
            Wallet profile
          </ModalHeader>

          <ModalCloseButton size="0.5rem" top="4" right="4" />

          <ModalBody
            display="flex"
            alignItems="center"
            justifyContent="center"
            px="6"
            py="12"
          >
            <Flex
              w="100%"
              direction={["column", "row"]}
              alignItems={["center", "center"]}
              justifyContent="space-between"
            >
              <Box mb={["3", "0"]}>
                <Text
                  flex="1"
                  mb="2"
                  fontSize="lg"
                  color="gray.200"
                  fontWeight="300"
                >
                  Connected with {connectorName}
                </Text>

                <Text flex="1" fontSize="2xl" color="yellow.400">
                  {walletFormatted}
                </Text>
              </Box>

              <Button
                ml="4"
                p="6"
                fontSize="lg"
                color="white"
                bgColor="red.500"
                borderRadius="xl"
                _hover={{
                  bgColor: "red.600",
                }}
                transition="0.2s"
                onClick={handleSignOut}
                disabled={!active}
              >
                Disconnect
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </ScaleFade>
  );
}
