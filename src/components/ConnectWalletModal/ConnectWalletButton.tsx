import { Text, Flex, Image } from "@chakra-ui/react";

type ConnectWalletButtonProps = {
  imageUrl: string;
  title: string;
  handleConnectWallet: () => Promise<void>;
};

export function ConnectWalletButton({
  imageUrl,
  title,
  handleConnectWallet,
}: ConnectWalletButtonProps) {
  return (
    <Flex
      as="button"
      onClick={handleConnectWallet}
      direction="column"
      alignItems="center"
      p="6"
      borderRadius="0.5rem"
      cursor="pointer"
      transition="200ms"
      _hover={{
        backgroundColor: "gray.600",
      }}
    >
      <Image
        src={imageUrl}
        alt={`${title} Logo`}
        boxSize="4rem"
        objectFit="cover"
        mb="4"
      />

      <Text fontSize="2xl" fontWeight="bold">
        {title}
      </Text>
    </Flex>
  );
}
