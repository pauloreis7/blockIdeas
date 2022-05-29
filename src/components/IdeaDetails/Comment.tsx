import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { FiUser } from "react-icons/fi";

type CommentProps = {
  senderWallet: string;
  createdAt: string;
  text: string;
};

export function Comment({ senderWallet, createdAt, text }: CommentProps) {
  return (
    <Flex w="100%">
      <Icon as={FiUser} mr="3" fontSize="2xl" color="gray.400" />

      <Box>
        <Flex
          w="100%"
          mb="1"
          alignItems="center"
          justifyContent="space-between"
        >
          <Heading
            as="strong"
            mr="2"
            fontSize="md"
            fontWeight="400"
            color="gray.50"
          >
            {senderWallet}
          </Heading>

          <Text as="span" color="gray.500">
            {createdAt}
          </Text>
        </Flex>

        <Text color="gray.100">{text}</Text>
      </Box>
    </Flex>
  );
}
