import { Flex, Text, Image } from "@chakra-ui/react";

import { ConnectorsName } from "../../config/walletConnetors";

const connectorImagesPath = {
  metaMask: "/metamask-logo.svg",
  walletConnect: "/walletconnect-logo.svg",
};

type WalletProfileProps = {
  walletFormatted: string | null;
  connectorName: ConnectorsName;
};

export function WalletProfile({
  walletFormatted,
  connectorName,
}: WalletProfileProps) {
  return (
    <Flex
      as="button"
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
      <Text
        fontSize={["lg", "xl"]}
        fontWeight="600"
        pr="2"
        borderRight="1px"
        borderColor="gray.900"
      >
        {walletFormatted}
      </Text>

      <Image
        src={connectorImagesPath[connectorName]}
        alt={`${connectorName} logo`}
        ml="2"
        p="0.05rem"
        boxSize="1.75rem"
        objectFit="cover"
      />
    </Flex>
  );
}
