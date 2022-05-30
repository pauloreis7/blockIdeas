import { useWeb3React } from "@web3-react/core";
import { Box, Text, Flex } from "@chakra-ui/react";

import { IdeaContent } from "./IdeaContent";
import { VoteItem } from "./VoteItem";

import { useVotesList } from "../../hooks/cache/useVotesList";

type IdeaProps = {
  id: number;
  title: string;
  description: string;
  created_at: string | Date;
  upvotes: number;
  downvotes: number;
};

export function Idea({
  id,
  title,
  description,
  created_at,
  upvotes,
  downvotes,
}: IdeaProps) {
  // hooks
  const { account } = useWeb3React();
  const { data: votes, isLoading: votesIsLoading } = useVotesList(account);

  // console.log(votes);

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
            isVoted={
              votes?.find((vote) => vote.id === id)?.voteType === 2 ?? false
            }
            votesCount={upvotes}
          />

          <VoteItem
            id={id}
            voteType={1}
            isVoted={
              votes?.find((vote) => vote.id === id)?.voteType === 1 ?? false
            }
            votesCount={downvotes}
          />
        </Flex>
      </Flex>

      <IdeaContent description={description} created_at={created_at} />
    </Box>
  );
}
