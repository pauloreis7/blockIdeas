import {
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  SkeletonText,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiClock } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";
import dayjs from "dayjs";

import { Header } from "../../components/Header";
import { ConnectWalletModal } from "../../components/ConnectWalletModal";
import { WalletProfileModal } from "../../components/WalletProfileModal";
import { BackButton } from "../../components/IdeaDetails/BackButton";
import { IdeaStatsItem } from "../../components/IdeaDetails/IdeaStatsItem";
import { Comment } from "../../components/IdeaDetails/Comment";

import { useSigner } from "../../hooks/useSigner";
import { config } from "../../config";

type Idea = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  isVoted: boolean;
};

enum VoteTypes {
  DownVote = 1,
  UpVote,
}

export default function Idea() {
  // states
  const [idea, setIdea] = useState<Idea | null>(null);

  // hooks
  const { signer } = useSigner();
  const { account } = useWeb3React();
  const { query } = useRouter();

  async function fetchIdea() {
    try {
      const contract = config.contracts.BoardIdeas();

      const {
        createdAt,
        createdBy,
        downvotes,
        upvotes,
        id,
        description,
        title,
      } = await contract.functions.ideas(String(query.slug));
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

      setIdea(formattedIdea);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleVote(voteType: VoteTypes) {
    try {
      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.voteOnIdea(voteType, idea?.id as number)
      ).wait();

      await fetchIdea();
    } catch (err) {
      console.log({ err });
    }
  }

  // fetch idea
  useEffect(() => {
    if (typeof query.slug === "string") {
      (async () => await fetchIdea())();
    }
  }, [query]);

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
        <title>My idea - Idea</title>
        <meta
          name="description"
          content="blockchain idea details and comments"
        />
      </Head>

      <Header />

      <ConnectWalletModal />

      <WalletProfileModal />

      <Flex
        as="main"
        w="100%"
        h="100%"
        maxWidth="4xl"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={["6", "8", "12"]}
        mt="6"
      >
        <Flex
          as="header"
          w="100%"
          flexDirection="column"
          justifyContent="center"
          mb="8"
          mt="4"
        >
          <SkeletonText isLoaded={idea !== null} mb="5">
            <Flex justify="space-between" align="center" gap='2'>
              <Heading mb="6" fontSize="5xl" color="gray.100" fontWeight="600">
                {idea?.title}
              </Heading>

              <BackButton />
            </Flex>
          </SkeletonText>

          <SkeletonText isLoaded={idea !== null}>
            <Stack w="100%" maxWidth="md" spacing="6" mb="5">
              <IdeaStatsItem
                title="created at"
                value={idea?.createdAt || ""}
                icon={FiClock}
                color="gray.400"
              />

              <IdeaStatsItem
                title="up votes"
                value={idea?.upvotes || 0}
                icon={CgArrowUp}
                color="green.500"
                cursor
                onClick={() => handleVote(VoteTypes.UpVote)}
              />

              <IdeaStatsItem
                title="down votes"
                value={idea?.downvotes || 0}
                icon={CgArrowDown}
                color="red.500"
                cursor
                onClick={() => handleVote(VoteTypes.DownVote)}
              />
            </Stack>
          </SkeletonText>

          <Divider mb="4" borderColor="gray.600" />

          <Flex w="100%" alignItems="center">
            <Icon
              as={FaRegCommentDots}
              mr="2"
              fontSize="2xl"
              color="gray.400"
            />

            <Input
              placeholder="Add a comment…"
              px="4"
              py="2"
              textColor="gray.300"
              bgColor="transparent"
              variant="unstyled"
              _hover={{
                backgroundColor: "whiteAlpha.100",
              }}
              _focus={{
                backgroundColor: "whiteAlpha.100",
                borderColor: "yellow.500",
              }}
            />
          </Flex>

          <Divider mt="4" mb="8" borderColor="gray.600" />

          <Text mb="12" color="gray.100">
            {idea?.description}
          </Text>

          <Stack w="100%" spacing="6">
            {tempComments.map((comment, i) => (
              <Comment
                key={i}
                senderWallet={comment.senderWallet}
                createdAt={comment.createdAt}
                text={comment.text}
              />
            ))}
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
}

const tempComments = [
  {
    senderWallet: "0x701d...3d71",
    createdAt: "17:05 - 28/05/2022",
    text: "My test comment!",
  },
  {
    senderWallet: "0x701d...3d71",
    createdAt: "17:05 - 28/05/2022",
    text: "My test comment!",
  },
  {
    senderWallet: "0x701d...3d71",
    createdAt: "17:05 - 28/05/2022",
    text: "My test comment!",
  },
];
