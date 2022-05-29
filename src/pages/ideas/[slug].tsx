import {
  Divider,
  Flex,
  Heading,
  Icon,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiClock } from "react-icons/fi";
import { FaRegCommentDots } from "react-icons/fa";
import { CgArrowUp, CgArrowDown } from "react-icons/cg";

import { Header } from "../../components/Header";
import { ConnectWalletModal } from "../../components/ConnectWalletModal";
import { WalletProfileModal } from "../../components/WalletProfileModal";
import { BackButton } from "../../components/IdeaDetails/BackButton";
import { IdeaStatsItem } from "../../components/IdeaDetails/IdeaStatsItem";
import { Comment } from "../../components/IdeaDetails/Comment";

export default function Idea() {
  const { account } = useWeb3React();
  const { query } = useRouter();

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

      <BackButton />

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
          <Heading mb="6" fontSize="5xl" color="gray.100" fontWeight="600">
            My idea
          </Heading>

          <Stack w="100%" maxWidth="md" spacing="6" mb="5">
            <IdeaStatsItem
              title="created at"
              value="May 23, 2022 7:08 PM"
              icon={FiClock}
              color="gray.400"
            />

            <IdeaStatsItem
              title="up votes"
              value="14"
              icon={CgArrowUp}
              color="green.500"
            />

            <IdeaStatsItem
              title="down votes"
              value="5"
              icon={CgArrowDown}
              color="red.500"
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
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam quis
            illo aliquam repudiandae enim? Cupiditate quod ipsum expedita iusto
            fuga, vero ullam quis quae numquam vitae ad sed ea distinctio!
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
