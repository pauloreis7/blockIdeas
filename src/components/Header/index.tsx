import { Flex, Text, Image } from "@chakra-ui/react";

import { Logo } from "./Logo";

export function Header() {
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
          0x70...3d71
        </Text>

        <Image
          src="/metamask-logo.svg"
          alt="Metamask logo"
          ml="2"
          p="0.05rem"
          boxSize="1.75rem"
          objectFit="cover"
        />
      </Flex>
    </Flex>
  );
}
