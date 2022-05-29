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
import { useMutation } from "react-query";
import dayjs from "dayjs";

import { useIdeas } from "../contexts/IdeasContext";
import { queryClient } from "../services/queryClient";
import { config } from "../config";

import { useIdeasList, IdeaProps } from "../hooks/cache/useIdeasList";

import { Header } from "../components/Header";
import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";
import { NewIdeaDrawer } from "../components/NewIdeaDrawer";
import { Idea } from "../components/Idea";
import { FailState } from "../components/FailState";

type PreviusContext = {
  previousIdeas: IdeaProps[];
};

export default function Home() {
  // hooks
  const { sendIdeaDrawerDisclosure } = useIdeas();
  const {
    data: ideas,
    isLoading: ideasIsLoading,
    isFetching,
    error,
    isFetchedAfterMount,
  } = useIdeasList();

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

      queryClient.setQueryData("ideasList", (oldIdeas) => [
        formattedIdea,
        ...(oldIdeas as IdeaProps[]),
      ]);

      return { previousIdeas };
    },
    {
      onError: (error, _, context) => {
        console.log("error", { error });

        const previousIdeas = (context as PreviusContext)?.previousIdeas;

        if (!previousIdeas) {
          return;
        }

        queryClient.setQueryData("ideasList", previousIdeas);
      },
      onSettled: () => {
        queryClient.invalidateQueries("ideasList");
      },
    }
  );

  useEffect(() => {
    const contract = config.contracts.BoardIdeas();

    async function updateIdeiaList(newIdeaId: number) {
      if (!isFetchedAfterMount) {
        return;
      }

      console.log("hiiiii");

      await updateIdeasMutation.mutateAsync(newIdeaId);
    }

    contract.on("IdeaCreated", updateIdeiaList);

    return () => {
      contract.off("IdeaCreated", updateIdeiaList);
    };
  }, []);

  return (
    <Flex
      w="100%"
      h="100%"
      minHeight="100vh"
      direction="column"
      alignItems="center"
      pb="8"
    >
      <Head>
        <title>Ideas Chain</title>
        <meta name="description" content="Share and vote to blockchain ideas" />
      </Head>

      <Header />

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
          alignItems="center"
          justifyContent="space-between"
          mb="8"
        >
          <Flex w="100%" alignItems="center" textAlign="left">
            <Heading
              mr="5"
              fontSize="2xl"
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

          <Button
            onClick={sendIdeaDrawerDisclosure.onOpen}
            colorScheme="yellow"
          >
            Send idea
          </Button>
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
