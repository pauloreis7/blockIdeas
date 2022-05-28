import { Flex, Text } from "@chakra-ui/react";

type ConnectWalletProps = {
  handleOpenWalletConnectionModal: (isOpen: boolean) => void;
};

export function ConnectWallet({
  handleOpenWalletConnectionModal,
}: ConnectWalletProps) {
  return (
    <Flex
      as="button"
      onClick={() => handleOpenWalletConnectionModal(true)}
      px="3"
      py="2"
      alignItems="center"
      backgroundColor="gray.700"
      borderRadius="full"
      transition="200ms"
      _hover={{
        backgroundColor: "gray.600",
      }}
    >
      <Text fontSize={["lg", "xl"]} fontWeight="600">
        Connect wallet
      </Text>
    </Flex>
  );
}
