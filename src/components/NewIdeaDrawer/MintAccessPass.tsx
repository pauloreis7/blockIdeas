import { useMutation } from "react-query";
import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { Flex, Text, Button, useToast } from "@chakra-ui/react";

// services
import { queryClient } from "../../services/queryClient";

// hooks
import { useSigner } from "../../hooks/useSigner";

// web3
import { config } from "../../config";

export function MintAccessPass() {
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
        throw new Error("Wallet not connected");
      }

      const contract = config.contracts.BoardIdeas(signer);

      await (await contract.functions.mintAccessPass({ value: "1" })).wait();
    },
    {
      onSuccess: async (data) => {
        setIsMinting(false);
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
        <Text>You don&apos;t seem to have an Access Pass...</Text>

        <Text>
          By having an Access Pass you can publish your own ideas and vote on
          other users&apos; ideas.
        </Text>

        <Text>
          It costs only{" "}
          <Text as="span" color="#844DE2" fontWeight="bold">
            1 MATIC
          </Text>
          !
        </Text>
      </Flex>

      <Button
        colorScheme="yellow"
        onClick={handleMint}
        isLoading={isMinting}
        loadingText="Minting..."
      >
        Mint now!
      </Button>
    </Flex>
  );
}
