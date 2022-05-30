import {
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
  SkeletonText,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiClock } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";
import { useMutation } from "react-query";

import { queryClient } from "../../services/queryClient";
import { config } from "../../config";

import { useSigner } from "../../hooks/useSigner";
import { useIdeaDetails } from "../../hooks/cache/useIdeaDetails";

import { Header } from "../../components/Header";
import { ConnectWalletModal } from "../../components/ConnectWalletModal";
import { WalletProfileModal } from "../../components/WalletProfileModal";
import { BackButton } from "../../components/IdeaDetails/BackButton";
import { IdeaStatsItem } from "../../components/IdeaDetails/IdeaStatsItem";
import { Comment } from "../../components/IdeaDetails/Comment";
import { FailState } from "../../components/FailState";

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
  // hooks
  const { signer } = useSigner();
  const { query } = useRouter();
  const { account } = useWeb3React();
  const toast = useToast();

  const {
    data: idea,
    isLoading: ideaIsLoading,
    error,
  } = useIdeaDetails(Number(query.slug));

  const [comment, setComment] = useState("");
  const [isCommenting, setIsCommenting] = useState(false);

  const sendComment = useMutation(
    async (comment: string) => {
      setIsCommenting(true);

      if (!account) {
        throw new Error("Wallet not connected");
      }

      if (!comment) {
        throw new Error("Comment is required");
      }

      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.commentOnIdea(comment, String(query.slug))
      ).wait();

      // await queryClient.cancelQueries(["ideasList"]);

      return;
    },

    {
      onSuccess: async (data) => {
        toast({
          title: "Comment sent.",
          description: `Comment was sent successfully.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

        setComment("");
      },
      onError: async (error: Error) => {
        toast({
          title: error.message,
          description: "Please try again",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
      onSettled: (_, error) => {
        setIsCommenting(false);
      },
    }
  );

  async function handleComment() {
    try {
      await sendComment.mutateAsync(comment);
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleVote(voteType: VoteTypes) {
    try {
      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.voteOnIdea(voteType, idea?.id as number)
      ).wait();

      queryClient.invalidateQueries("ideaDetails");
    } catch (err) {
      console.log({ err });
    }
  }

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
        <title>Idea details - Idea</title>
        <meta
          name="description"
          content="blockchain idea details and comments"
        />
      </Head>

      <Header />

      <ConnectWalletModal />

      <WalletProfileModal />

      <SkeletonText
        isLoaded={!ideaIsLoading}
        w="100%"
        display="flex"
        h="100%"
        maxWidth="4xl"
        justifyContent="center"
        flexDirection="column"
        borderRadius="xl"
        startColor="gray.700"
        endColor="gray.600"
        spacing="6"
        noOfLines={8}
      >
        {error ? (
          <FailState errorMessage="Fail to get idea :/" />
        ) : (
          !ideaIsLoading && (
            <Flex
              as="main"
              w="100%"
              h="100%"
              flexDirection="column"
              px={["6", "8", "12"]}
              mt="6"
            >
              <Flex
                as="header"
                w="100%"
                flexDirection="column"
                alignItems="flex-start"
                mb="8"
                mt="4"
              >
                <BackButton />

                <Heading
                  my="6"
                  fontSize="5xl"
                  color="gray.100"
                  fontWeight="600"
                >
                  {idea?.title}
                </Heading>
              </Flex>

              <Stack w="100%" maxWidth="md" spacing="6" mb="5">
                <IdeaStatsItem
                  title="created at"
                  value={idea?.createdAt ?? ""}
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
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
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

                <Button
                  onClick={handleComment}
                  isLoading={isCommenting}
                  isDisabled={isCommenting}
                  loadingText="Sending"
                  ml="4"
                  fontSize="sm"
                  colorScheme="yellow"
                >
                  Send comment
                </Button>
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
          )
        )}
      </SkeletonText>
    </Flex>
  );
}

const tempComments = [
  {
    senderWallet: "0x701d...3d71",
    createdAt: "17:05 - 28/05/2022",
    text: "My test comment!",
  },
];
