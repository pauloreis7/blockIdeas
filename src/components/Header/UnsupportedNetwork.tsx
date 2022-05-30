import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Button,
  useToast,
} from "@chakra-ui/react";

export function UnsupportedNetwork() {
  // hooks
  const toast = useToast();

  async function switchChain() {
    try {
      await (window as any).ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }], // it is the 80001 chain Id but encoded in hexadecimal and prefixed with 0x
      });
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

  return (
    <Alert
      status="warning"
      variant="left-accent"
      w="fit-content"
      borderRadius="md"
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
    </Alert>
  );
}
