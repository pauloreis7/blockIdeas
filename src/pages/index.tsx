import { Button, Flex, Heading, SimpleGrid } from "@chakra-ui/react";
import Head from "next/head";

import { useIdeas } from "../contexts/IdeasContext";

import { Header } from "../components/Header";
import { ConnectWalletModal } from "../components/ConnectWalletModal";
import { WalletProfileModal } from "../components/WalletProfileModal";
import { NewIdeaDrawer } from "../components/NewIdeaDrawer";
import { Idea } from "../components/Idea";

export default function Home() {
  const { sendIdeaDrawerDisclosure } = useIdeas();

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
          <Heading fontSize="2xl" color="gray.300" fontWeight="400">
            Ideas list
          </Heading>

          <Button
            onClick={sendIdeaDrawerDisclosure.onOpen}
            colorScheme="yellow"
          >
            Send idea
          </Button>
        </Flex>

        <SimpleGrid
          w="100%"
          h="100%"
          gap="4"
          minChildWidth="22rem"
          alignItems="center"
          justifyContent="center"
        >
          {tempIdeas.map((idea, i) => (
            <Idea
              key={i}
              title={idea.title}
              description={idea.description}
              created_at={idea.created_at}
              upvotes={idea.upvotes}
              downvotes={idea.downvotes}
            />
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
}

const tempIdeas = [
  {
    title: "My custom title",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit Temporibus nostrum doloribus porro ab debitis quam nemo. Id  itaque tota...",
    created_at: "17:05 - 28/05/2022",
    votesCount: 14,
    isVoted: true,
    upvotes: {
      votesCount: 14,
      isVoted: true,
    },
    downvotes: {
      votesCount: 4,
      isVoted: false,
    },
  },
  {
    title: "My custom title",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit Temporibus nostrum doloribus porro ab debitis quam nemo. Id  itaque tota...",
    created_at: "17:05 - 28/05/2022",
    upvotes: {
      votesCount: 3,
      isVoted: false,
    },
    downvotes: {
      votesCount: 12,
      isVoted: true,
    },
  },
];
