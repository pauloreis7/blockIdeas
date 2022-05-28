import { Flex } from "@chakra-ui/react";
import Head from "next/head";

import { Header } from "../components/Header";
import { ConnectWalletModal } from "../components/ConnectWalletModal";

export default function Home() {
  return (
    <Flex w="100%" h="100%" minHeight="100vh" direction="column">
      <Head>
        <title>Ideas Chain</title>
        <meta name="description" content="Share and vote to blockchain ideas" />
      </Head>

      <Header />

      <ConnectWalletModal />

      <main>
        <h1>Ideas Chain</h1>
      </main>
    </Flex>
  );
}
