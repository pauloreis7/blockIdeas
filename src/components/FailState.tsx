import { Flex, Heading, Image } from "@chakra-ui/react";

type FailStateProps = {
  errorMessage: string;
};

export function FailState({ errorMessage }: FailStateProps) {
  return (
    <Flex flexDirection="column" justifyContent="center" alignItems="center">
      <Image
        src="/logo.png"
        alt="Ideas Chain logo fail to get ideas"
        boxSize={["4rem", "4rem", "6rem"]}
        mb={["3", "3", "5"]}
        objectFit="cover"
        opacity="0.5"
      />

      <Heading fontSize={["xl", "xl", "2xl"]} color="gray.400">
        {errorMessage}
      </Heading>
    </Flex>
  );
}
