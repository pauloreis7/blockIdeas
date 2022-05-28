import { Button, Box, Text, Icon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

type IdeaProps = {
  description: string;
  created_at: string;
};

export function IdeaContent({ description, created_at }: IdeaProps) {
  return (
    <Box
      px="4"
      py="4"
      cursor="pointer"
      transition="200ms"
      _hover={{
        filter: "brightness(0.8)",
        button: { bottom: "1rem", visibility: "visible", opacity: "1" },
      }}
    >
      <Text mb="6" py="4" color="gray.400">
        {description}
      </Text>

      <Text w="100%" textAlign="right" color="gray.600">
        {created_at}
      </Text>

      <Button
        position="absolute"
        bottom="0"
        left="35%"
        leftIcon={<Icon as={FiSearch} fontSize="1.5rem" />}
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
