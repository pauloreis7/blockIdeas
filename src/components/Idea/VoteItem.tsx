import { useState } from "react";
import { useMutation } from "react-query";
import { useWeb3React } from "@web3-react/core";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";
import { Text, Icon, Tooltip, Button, useToast } from "@chakra-ui/react";
import type { IconType } from "react-icons";

// web3
import { config } from "../../config";

// hooks
import { useSigner } from "../../hooks/useSigner";
import { useGetNFT } from "../../hooks/cache/useGetNFT";

// services
import { queryClient } from "../../services/queryClient";

import { useWallet } from "../../contexts/WalletContext";
import { useIdeas, VotesTypes } from "../../contexts/IdeasContext";

const voteTypesProps: {
  [Key in VotesTypes]: { icon: IconType; color: string };
} = {
  2: {
    icon: CgArrowUp,
    color: "green.500",
  },
  1: {
    icon: CgArrowDown,
    color: "red.500",
  },
};

type VoteItemProps = {
  id: number;
  voteType: VotesTypes;
  isVoted: boolean;
  votesCount: number;
};

export function VoteItem({ id, voteType, isVoted, votesCount }: VoteItemProps) {
  // hooks
  const toast = useToast();
  const { signer } = useSigner();
  const { account } = useWeb3React();

  const { setWalletModalOpen } = useWallet();
  const { sendIdeaDrawerDisclosure } = useIdeas();

  const { data: userHasNFT } = useGetNFT(account);

  // states
  const [isVoting, setIsVoting] = useState(false);

  const vote = useMutation(
    async () => {
      setIsVoting(true);

      const contract = config.contracts.BoardIdeas(signer);
      await (await contract.functions.voteOnIdea(voteType, id)).wait();
    },
    {
      onSuccess: async () => {
        toast({
          title: "Voted",
          description: `Successfuly voted`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
      onError: async (error: Error, variables: void, context: unknown) => {
        console.log({ error: Error, variables, context });

        toast({
          title: error.message,
          description: "Please try again",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
      onSettled: () => {
        setIsVoting(false);
      },
    }
  );

  async function handleVote() {
    try {
      if (!account) {
        setWalletModalOpen(true);

        toast({
          title: "Wallet not connected",
          description: "Please check your credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });

        return;
      }

      if (!userHasNFT) {
        sendIdeaDrawerDisclosure.onOpen();

        return;
      }

      await vote.mutateAsync();
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <>
      {isVoted ? (
        <Tooltip label="Remove vote" color="gray.400" fontWeight="600">
          <Button
            bgColor="transparent"
            w="50px"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={handleVote}
            disabled={isVoting}
          >
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
          </Button>
        </Tooltip>
      ) : (
        <Tooltip label="Add Vote" color="gray.400" fontWeight="600">
          <Button
            bgColor="transparent"
            w="50px"
            _hover={{}}
            _active={{}}
            _focus={{}}
            onClick={handleVote}
            disabled={isVoting}
          >
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
          </Button>
        </Tooltip>
      )}
    </>
  );
}
