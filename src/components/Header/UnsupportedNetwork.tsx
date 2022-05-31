import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast,
  useDisclosure,
  CloseButton,
} from "@chakra-ui/react";

import { useWallet } from "../../contexts/WalletContext";

export function UnsupportedNetwork() {
  const { unsupportedNetworkDisclosure } = useWallet();

  const toast = useToast();

  async function switchChain() {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }], // it is the 80001 chain Id but encoded in hexadecimal and prefixed with 0x
      });

      unsupportedNetworkDisclosure.onClose();
    } catch (err) {
      const error = err as Error & { code: number };

      if (error.code === 4902) {
        try {
          await (window as any).ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x13881",
                chainName: "Polygon-Testnet",
                rpcUrls: ["https://rpc-mumbai.matic.today"],
              },
            ],
          });
        } catch (err) {
          const error = err as Error;

          toast({
            title: error.message,
            description: "Please try again",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }
      }
    }
  }

  return unsupportedNetworkDisclosure.isOpen ? (
    <Alert
      status="warning"
      variant="left-accent"
      position="absolute"
      top="6"
      right="6"
      w="fit-content"
      borderRadius="md"
      zIndex={5}
    >
      <AlertIcon />

      <Flex direction="column" color="gray.800" gap={1}>
        <AlertTitle>Unsupported network</AlertTitle>
        <AlertDescription>
          You are connected to an unsupported network.
        </AlertDescription>

        <Button onClick={switchChain} colorScheme="yellow">
          Switch to Polygon Testnet
        </Button>
      </Flex>

      <CloseButton
        onClick={unsupportedNetworkDisclosure.onClose}
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        color="black"
      />
    </Alert>
  ) : null;
}
