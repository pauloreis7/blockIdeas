import { Text, Flex, Image } from "@chakra-ui/react";

type ConnectWalletButtonProps = {
  imageUrl: string;
  title: string;
};

export function ConnectWalletButton({
  imageUrl,
  title,
}: ConnectWalletButtonProps) {
  return (
    <Flex
      as="button"
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
