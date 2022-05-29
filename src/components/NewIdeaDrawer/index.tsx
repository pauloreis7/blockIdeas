import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Stack,
  SkeletonText,
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useMutation } from "react-query";

import { useGetNFT } from "../../hooks/cache/useGetNFT";
import { useIdeas } from "../../contexts/IdeasContext";
import { useSigner } from "../../hooks/useSigner";

import { queryClient } from "../../services/queryClient";
import { config } from "../../config";

import { MintAccessPass } from "./MintAccessPass";
import { NewIdeaTitleForm } from "./NewIdeaTitleForm";
import { NewIdeaDescriptionForm } from "./NewIdeaDescriptionForm";

export function NewIdeaDrawer() {
  const { signer } = useSigner();
  const { account } = useWeb3React();
  const toast = useToast();

  const { data: userHasNFT, isLoading: userHasNFTIsLoading } =
    useGetNFT(account);

  const {
    sendIdeaDrawerDisclosure,
    newIdeaTitle,
    newIdeaDescription,
    setNewIdeaTitle,
    setNewIdeaDescription,
  } = useIdeas();

  const [newIdeaTitleError, setNewIdeaTitleError] = useState("");
  const [newIdeaDescriptionError, setNewIdeaDescriptionError] = useState("");
  const [isSendingIdea, setIsSendingIdea] = useState(false);

  const sendIdea = useMutation(
    async () => {
      setNewIdeaTitleError("");
      setNewIdeaDescriptionError("");
      setIsSendingIdea(true);

      if (!account) {
        throw new Error("Wallet not connected");
      }

      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.createIdea(newIdeaTitle, newIdeaDescription)
      ).wait();

      await queryClient.cancelQueries(["ideasList"]);

      return { newIdeaTitle };
    },

    {
      onSuccess: async (data) => {
        toast({
          title: "Idea sent.",
          description: `Idea ${data?.newIdeaTitle} was sent successfully.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

        sendIdeaDrawerDisclosure.onClose();
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
        setNewIdeaTitle("");
        setNewIdeaDescription("");
        setIsSendingIdea(false);

        if (!error) {
          queryClient.invalidateQueries(["ideasList"]);
        }
      },
    }
  );

  async function handleSendIdea() {
    if (!newIdeaTitle) {
      const errorMessage = "Idea title is required";

      setNewIdeaTitleError(errorMessage);
      return;
    }

    if (!newIdeaDescription) {
      const errorMessage = "Idea description is required";

      setNewIdeaDescriptionError(errorMessage);
      return;
    }

    try {
      await sendIdea.mutateAsync();
    } catch (error) {
      console.log({ error });
    }
  }

  return (
    <Drawer
      isOpen={sendIdeaDrawerDisclosure.isOpen}
      onClose={sendIdeaDrawerDisclosure.onClose}
      placement="right"
      size={["full", "lg"]}
    >
      <DrawerOverlay />

      <DrawerContent bg="gray.900">
        <DrawerCloseButton
          top="4"
          right="4"
          size="0.5rem"
          color="gray.400"
          _hover={{ color: "red.500" }}
        />

        <DrawerHeader
          borderBottomWidth="2px"
          borderColor="gray.700"
          p="3"
          mb="6"
          bg="gray.900"
        >
          <Heading fontSize="2xl" color="gray.300">
            Create a new idea
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <SkeletonText isLoaded={!userHasNFTIsLoading}>
            {userHasNFT ? (
              <>
                <Stack spacing="24px" mb="8">
                  <NewIdeaTitleForm errorMessage={newIdeaTitleError} />

                  <NewIdeaDescriptionForm
                    errorMessage={newIdeaDescriptionError}
                  />
                </Stack>

                <Flex>
                  <Button
                    onClick={sendIdeaDrawerDisclosure.onClose}
                    variant="outline"
                    mr="1rem"
                    colorScheme="red"
                    borderWidth="2px"
                    borderColor="red.500"
                    fontSize="lg"
                    _hover={{ color: "gray.50", backgroundColor: "red.500" }}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleSendIdea}
                    isLoading={isSendingIdea}
                    loadingText="Sending"
                    fontSize="lg"
                    colorScheme="yellow"
                  >
                    Submit idea
                  </Button>
                </Flex>
              </>
            ) : (
              <MintAccessPass />
            )}
          </SkeletonText>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
