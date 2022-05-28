import { Flex, Heading, Image } from "@chakra-ui/react";

export function Logo() {
  return (
    <Flex alignItems="center">
      <Image
        src="/logo.png"
        alt="Ideas Chain logo"
        boxSize={["2rem", "2rem", "3rem"]}
        mr="3"
        objectFit="cover"
      />

      <Heading fontSize={["0", "3xl", "4xl"]} fontWeight="bold">
        IdeasChain
      </Heading>
    </Flex>
  );
}
