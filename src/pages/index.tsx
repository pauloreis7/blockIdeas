import {
  Button,
  Text,
  Flex,
  Heading,
  Image,
  SimpleGrid,
  Spinner,
  SkeletonText,
} from "@chakra-ui/react";
import Head from "next/head";

import { useIdeas } from "../contexts/IdeasContext";
import { useIdeasList } from "../hooks/cache/useIdeasList";

import { Header } from "../components/Header";
import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";
import { NewIdeaDrawer } from "../components/NewIdeaDrawer";
import { Idea } from "../components/Idea";
import { FailState } from "../components/FailState";

export default function Home() {
  const { sendIdeaDrawerDisclosure } = useIdeas();

  const { data: ideas, isLoading, isFetching, error } = useIdeasList();

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

            {(isLoading || isFetching) && (
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
          isLoaded={!isLoading}
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
            !isLoading && (
              <SimpleGrid
                w="100%"
                h="100%"
                gap="4"
                minChildWidth="22rem"
                alignItems="center"
                justifyContent="center"
              >
                {ideas?.map((idea, i) => (
                  <Idea
                    key={i}
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
