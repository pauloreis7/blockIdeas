import {
  Button,
  Text,
  Flex,
  Heading,
  SimpleGrid,
  Spinner,
  SkeletonText,
} from "@chakra-ui/react";
import { useEffect } from "react";
import Head from "next/head";
import { useWeb3React } from "@web3-react/core";
import { useMutation } from "react-query";
import dayjs from "dayjs";
import { FiExternalLink } from "react-icons/fi";

import { useIdeas } from "../contexts/IdeasContext";
import { queryClient } from "../services/queryClient";
import { config } from "../config";

import { useIdeasList, IdeaProps } from "../hooks/cache/useIdeasList";
import { useVotesList, VoteProps } from "../hooks/cache/useVotesList";

import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";
import { NewIdeaDrawer } from "../components/NewIdeaDrawer";
import { Idea } from "../components/Idea";
import { FailState } from "../components/FailState";

type PreviusIdeasContext = {
  previousIdeas: IdeaProps[];
};

type PreviusVotesContext = {
  formattedNewVote: VoteProps;
  previousIdeas: IdeaProps[];
};

type UpdateVotesMutationProps = {
  voteId: number;
  upvotes: number;
  downvotes: number;
};

export default function Home() {
  const { account } = useWeb3React();
  const { sendIdeaDrawerDisclosure } = useIdeas();
  const {
    data: ideas,
    isLoading: ideasIsLoading,
    isFetching,
    error,
  } = useIdeasList();

  const { data: votes } = useVotesList(account);

  const updateIdeasMutation = useMutation(
    async (newIdeaId: number) => {
      const contract = config.contracts.BoardIdeas();

      const {
        createdAt,
        createdBy,
        downvotes,
        upvotes,
        id,
        description,
        title,
      } = await contract.functions.ideas(newIdeaId);

      const formattedId = Number(id.toString());
      const formattedUpvotes = Number(upvotes.toString());
      const formattedDownvotes = Number(downvotes.toString());

      const formattedCreatedAt = dayjs(
        Number(createdAt.toString()) * 1000
      ).format("HH:mm - MMM, DD YYYY");

      const formattedIdea = {
        title,
        createdBy,
        description,
        isVoted: false,
        id: formattedId,
        upvotes: formattedUpvotes,
        downvotes: formattedDownvotes,
        createdAt: formattedCreatedAt,
      };

      await queryClient.cancelQueries("ideasList");

      const previousIdeas = queryClient.getQueryData("ideasList");

      queryClient.setQueryData("ideasList", (oldIdeas) => {
        if (!oldIdeas) {
          throw new Error("no old ideas");
        }

        return [formattedIdea, ...(oldIdeas as IdeaProps[])];
      });

      return { previousIdeas };
    },
    {
      onError: (error, _, context) => {
        const previousIdeas = (context as PreviusIdeasContext)?.previousIdeas;

        if (previousIdeas) {
          queryClient.setQueryData("ideasList", previousIdeas);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries("ideasList");
      },
    }
  );

  const updateVotesMutation = useMutation(
    async (vote: UpdateVotesMutationProps) => {
      const contract = config.contracts.BoardIdeas();

      const formattedVoteId = Number(vote.voteId.toString());
      const formattedUpdatedUpvotes = Number(vote.upvotes.toString());
      const formattedUpdatedDownvotes = Number(vote.downvotes.toString());

      const votedItem = votes?.findIndex(
        (oldVote) => oldVote.id === formattedVoteId
      );

      const previousIdeas = queryClient.getQueryData(
        "ideasList"
      ) as IdeaProps[];
      const previousVotes = queryClient.getQueryData(["votesList", account]) as
        | VoteProps[]
        | undefined;

      if ((!votedItem && votedItem !== 0) || !account || !previousVotes) {
        return;
      }

      const updatedIdeaIndex = previousIdeas.findIndex(
        (oldIdea) => oldIdea.id === formattedVoteId
      );

      const [voter, voteType] = await contract.functions.votes(
        formattedVoteId,
        account
      );

      const formattedNewVote = {
        id: formattedVoteId,
        voter,
        voteType,
      };

      await queryClient.cancelQueries(["votesList", account]);

      const formattedVotesList = previousVotes;
      const formattedIdeasList = previousIdeas;

      formattedVotesList[votedItem] = formattedNewVote;

      formattedIdeasList[updatedIdeaIndex].downvotes =
        formattedUpdatedDownvotes;
      formattedIdeasList[updatedIdeaIndex].upvotes = formattedUpdatedUpvotes;

      queryClient.setQueryData("votesList", (oldVotes) => formattedVotesList);
      queryClient.setQueryData("ideasList", (oldIdeas) => formattedIdeasList);

      return { previousVotes, previousIdeas, formattedNewVote };
    },
    {
      onError: (error, _, context) => {
        queryClient.setQueryData(
          ["votesList", account],
          (context as PreviusVotesContext).formattedNewVote
        );

        const previousIdeas = (context as PreviusIdeasContext)?.previousIdeas;

        if (previousIdeas) {
          queryClient.setQueryData("ideasList", previousIdeas);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries(["votesList", account]);
        queryClient.invalidateQueries("ideasList");
      },
    }
  );

  useEffect(() => {
    const contract = config.contracts.BoardIdeas();

    async function updateIdeiasList(newIdeaId: number) {
      try {
        await updateIdeasMutation.mutateAsync(newIdeaId);
      } catch (error) {
        console.log({ error });
      }
    }

    async function updateVotesList(
      voteId: number,
      upvotes: number,
      downvotes: number
    ) {
      try {
        await updateVotesMutation.mutateAsync({ voteId, upvotes, downvotes });
      } catch (error) {
        console.log({ error });
      }
    }

    contract.on("IdeaCreated", updateIdeiasList);
    contract.on("IdeaVotesUpdated", updateVotesList);

    return () => {
      contract.off("IdeaCreated", updateIdeiasList);
      contract.off("IdeaVotesUpdated", updateVotesList);
    };
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      alignItems="center"
      pb="8"
    >
      <Head>
        <title>Ideas Chain</title>
        <meta name="description" content="Share and vote to blockchain ideas" />
      </Head>

      <ConnectWalletModal />

      <WalletProfileModal />

      <NewIdeaDrawer />

      <Flex
        as="main"
        w="100%"
        h="100%"
        maxWidth="7xl"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={["6", "8", "12"]}
        mt="6"
      >
        <Flex
          w="100%"
          alignItems={["flex-start", "center"]}
          justifyContent="space-between"
          flexDirection={["column", "row"]}
          mb="8"
        >
          <Flex w="100%" alignItems="center" textAlign="left" mb={["4", "0"]}>
            <Heading
              mr="5"
              fontSize={["xl", "xl", "2xl"]}
              color="gray.300"
              fontWeight="400"
              textTransform="capitalize"
            >
              ideas list
            </Heading>

            {(ideasIsLoading || isFetching) && (
              <>
                <Spinner size="sm" color="gray.500" mr="2" />

                <Text color="gray.500">Fetching</Text>
              </>
            )}
          </Flex>

          <Flex gap="4">
            <Button
              colorScheme="purple"
              as="a"
              href="https://faucet.polygon.technology/"
              target="_blank"
              rightIcon={<FiExternalLink />}
            >
              Get MATIC
            </Button>

            <Button
              onClick={sendIdeaDrawerDisclosure.onOpen}
              colorScheme="yellow"
            >
              Send idea
            </Button>
          </Flex>
        </Flex>

        <SkeletonText
          isLoaded={!ideasIsLoading}
          w="100%"
          borderRadius="xl"
          startColor="gray.700"
          endColor="gray.600"
          spacing="6"
          noOfLines={8}
        >
          {error ? (
            <FailState errorMessage="Fail to get ideas :/" />
          ) : (
            !ideasIsLoading && (
              <SimpleGrid
                w="100%"
                h="100%"
                gap="4"
                minChildWidth="22rem"
                alignItems="center"
                justifyContent="center"
              >
                {ideas?.map((idea) => (
                  <Idea
                    id={idea.id}
                    key={idea.id}
                    title={idea.title}
                    description={idea.description}
                    created_at={idea.createdAt}
                    upvotes={idea.upvotes}
                    downvotes={idea.downvotes}
                  />
                ))}
              </SimpleGrid>
            )
          )}
        </SkeletonText>
      </Flex>
    </Flex>
  );
}
