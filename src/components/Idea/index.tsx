import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

type IdeaProps = {
  title: string;
  description: string;
  created_at: string;
};

export function Idea({ title, description, created_at }: IdeaProps) {
  return (
    <Box
      w="100%"
      maxWidth="24rem"
      mx="auto"
      position="relative"
      border="2px"
      borderRadius="0.25rem"
      borderColor="gray.600"
      cursor="pointer"
      transition="200ms"
      _hover={{
        filter: "brightness(0.8)",
        button: { bottom: "1rem", visibility: "visible", opacity: "1" },
      }}
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        px="4"
        py="3"
        backgroundColor="blackAlpha.300"
      >
        <Text color="gray.400" fontWeight="600">
          {title}
        </Text>
      </Flex>

      <Box px="4" py="4">
        <Text mb="6" py="4" color="gray.400">
          {description}
        </Text>

        <Text w="100%" textAlign="right" color="gray.600">
          {created_at}
        </Text>
      </Box>

      <Button
        position="absolute"
        bottom="0"
        left="35%"
        leftIcon={<FiSearch fontSize="1.5rem" />}
        borderRadius="full"
        colorScheme="yellow"
        transition="200ms"
        visibility="hidden"
        opacity="0"
      >
        Read
      </Button>
    </Box>
  );
}
