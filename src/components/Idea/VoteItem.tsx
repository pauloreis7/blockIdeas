import { Text, Icon, Tooltip } from "@chakra-ui/react";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";

import { VotesTypes } from "../../contexts/IdeasContext";

const voteTypesProps = {
  upvote: {
    icon: CgArrowUp,
    color: "green.500",
  },
  downvote: {
    icon: CgArrowDown,
    color: "red.500",
  },
};

type VoteItemProps = {
  voteType: VotesTypes;
  isVoted: boolean;
  votesCount: number;
};

export function VoteItem({ voteType, isVoted, votesCount }: VoteItemProps) {
  return (
    <>
      {isVoted ? (
        <Tooltip label="Remove vote" color="gray.400" fontWeight="600">
          <Text
            display="flex"
            alignItems="center"
            color="gray.400"
            cursor="pointer"
            _hover={{
              filter: "brightness(0.8)",
            }}
          >
            <Icon
              as={voteTypesProps[voteType].icon}
              ml="1"
              fontSize="1.5rem"
              color={voteTypesProps[voteType].color}
            />

            {votesCount}
          </Text>
        </Tooltip>
      ) : (
        <Tooltip label="Add Vote" color="gray.400" fontWeight="600">
          <Text
            display="flex"
            alignItems="center"
            color="gray.400"
            cursor="pointer"
            _hover={{
              svg: { color: voteTypesProps[voteType].color },
            }}
          >
            <Icon
              as={voteTypesProps[voteType].icon}
              ml="1"
              fontSize="1.5rem"
              color="gray.400"
            />

            {votesCount}
          </Text>
        </Tooltip>
      )}
    </>
  );
}
