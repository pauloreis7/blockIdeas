import { Box, Text, Flex } from "@chakra-ui/react";

import { IdeaContent } from "./IdeaContent";
import { VoteItem } from "./VoteItem";

type IdeaProps = {
  id: number;
  title: string;
  description: string;
  created_at: string | Date;
  upvotes: {
    votesCount: number;
    isVoted: boolean;
  };
  downvotes: {
    votesCount: number;
    isVoted: boolean;
  };
};

export function Idea({
  id,
  title,
  description,
  created_at,
  upvotes,
  downvotes,
}: IdeaProps) {
  return (
    <Box
      w="100%"
      maxWidth="24rem"
      mx="auto"
      position="relative"
      border="2px"
      borderRadius="0.25rem"
      borderColor="gray.600"
    >
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="space-between"
        px="4"
        py="3"
        backgroundColor="blackAlpha.300"
      >
        <Text color="gray.400" fontWeight="600" textTransform="uppercase">
          {title}
        </Text>

        <Flex alignItems="center">
          <VoteItem
            id={id}
            voteType={2}
            isVoted={upvotes.isVoted}
            votesCount={upvotes.votesCount}
          />

          <VoteItem
            id={id}
            voteType={1}
            isVoted={downvotes.isVoted}
            votesCount={downvotes.votesCount}
          />
        </Flex>
      </Flex>

      <IdeaContent description={description} created_at={created_at} />
    </Box>
  );
}
