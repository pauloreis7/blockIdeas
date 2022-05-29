import {
  Flex,
  Text,
  Button,
  useToast,
  Heading,
  Tag,
  TagLeftIcon,
  TagLabel,
  Image,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { FiAlertCircle } from "react-icons/fi";

// services
import { queryClient } from "../../services/queryClient";

// hooks
import { useSigner } from "../../hooks/useSigner";

// web3
import { config } from "../../config";
import { useIdeas } from "../../contexts/IdeasContext";
import { useWallet } from "../../contexts/WalletContext";

export function MintAccessPass() {
  const { setWalletModalOpen } = useWallet();
  const { sendIdeaDrawerDisclosure } = useIdeas();

  // states
  const [isMinting, setIsMinting] = useState(false);

  // hooks
  const toast = useToast();
  const { signer } = useSigner();
  const { account } = useWeb3React();

  const mint = useMutation(
    async () => {
      setIsMinting(true);

      if (!account) {
        setWalletModalOpen(true);

        throw new Error("Wallet not connected");
      }

      const contract = config.contracts.BoardIdeas(signer);

      await (await contract.functions.mintAccessPass({ value: "1" })).wait();
    },
    {
      onSuccess: async (data) => {
        toast({
          title: "Access Pass Minted",
          description: `Access Pass was mint successfully.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
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
        setIsMinting(false);

        if (!error) {
          queryClient.invalidateQueries(["userNFT"]);
        }
      },
    }
  );

  async function handleMint() {
    try {
      await mint.mutateAsync();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex textAlign="center" direction="column">
        <Heading mb="4" textAlign="left" color="red.500" fontSize="2xl">
          You don&apos;t have an Access Pass
        </Heading>

        <Text mb="8" textAlign="left" color="gray.300" fontSize="lg">
          By having an Access Pass you can publish your own ideas and vote on
          other users&apos; ideas.
        </Text>

        <Tag
          maxWidth="17rem"
          size="lg"
          mb="2"
          textAlign="left"
          variant="subtle"
          backgroundColor="transparent"
          borderWidth="2px"
          borderColor="gray.600"
          color="gray.300"
        >
          <TagLeftIcon as={FiAlertCircle} boxSize="1.25rem" />

          <TagLabel fontWeight="600">
            It costs only
            <Text as="span" ml="1" color="purple.500" fontWeight="bold">
              1 Wei of MATIC
            </Text>
          </TagLabel>
        </Tag>

        <Image
          src="/accessPassNFT.png"
          alt="Ideas Chain Access Pass Nft"
          w="34rem"
          objectFit="cover"
        />
      </Flex>

      <Button
        onClick={handleMint}
        isLoading={isMinting}
        loadingText="Minting"
        w="100%"
        maxWidth="17rem"
        px="4"
        py="7"
        colorScheme="yellow"
        fontSize="2xl"
        fontWeight="600"
        borderRadius="full"
      >
        Mint now!
      </Button>
    </Flex>
  );
}
