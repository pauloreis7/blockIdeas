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
  useToast,
} from "@chakra-ui/react";
import { useWeb3React } from "@web3-react/core";
import { useState } from "react";
import { useMutation } from "react-query";

import { useIdeas } from "../../contexts/IdeasContext";
import { useSigner } from "../../hooks/useSigner";

import { queryClient } from "../../services/queryClient";
import { config } from "../../config";

import { NewIdeaTitleForm } from "./NewIdeaTitleForm";
import { NewIdeaDescriptionForm } from "./NewIdeaDescriptionForm";

export function NewIdeaDrawer() {
  const { signer } = useSigner();
  const { account } = useWeb3React();
  const toast = useToast();

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

        return;
      }

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

      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.createIdea(newIdeaTitle, newIdeaDescription)
      ).wait();

      await queryClient.cancelQueries(["ideasList"]);

      const previousIdeasList = queryClient.getQueryData(["ideasList"]);

      return { newIdeaTitle };
    },

    {
      onError: async (error: Error, _, context: any) => {
        setIsSendingIdea(false);
        toast({
          title: error.message,
          description: "Please try again",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
      onSuccess: async (_, ideaTitle) => {
        setNewIdeaTitle("");
        setNewIdeaDescription("");
        setIsSendingIdea(false);

        console.log(ideaTitle);

        toast({
          title: "Idea sent.",
          description: `Idea ${ideaTitle} was sent successfully.`,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });

        queryClient.invalidateQueries(["ideasList"]);
        sendIdeaDrawerDisclosure.onClose();
      },
    }
  );

  async function handleSendIdea() {
    await sendIdea.mutateAsync();
  }

  return (
    <Drawer
      isOpen={sendIdeaDrawerDisclosure.isOpen}
      onClose={sendIdeaDrawerDisclosure.onClose}
      placement="right"
      size="lg"
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
          <Heading fontSize="2xl" color="gray.400">
            Create a new idea
          </Heading>
        </DrawerHeader>

        <DrawerBody>
          <Stack spacing="24px" mb="8">
            <NewIdeaTitleForm errorMessage={newIdeaTitleError} />

            <NewIdeaDescriptionForm errorMessage={newIdeaDescriptionError} />
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
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
