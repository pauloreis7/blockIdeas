import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormLabel,
  Heading,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import { useWeb3React } from "@web3-react/core";

// hooks
import { useSigner } from "../../hooks/useSigner";
import { useIdeas } from "../../contexts/IdeasContext";

// web3
import { config } from "../../config";

export function NewIdeaDrawer() {
  // states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // hooks
  const { signer } = useSigner();
  const { account } = useWeb3React();
  const { sendIdeaDrawerDisclosure } = useIdeas();

  async function handleSendIdea() {
    try {
      if (!account) {
        throw new Error("Wallet not connected");
      }

      const contract = config.contracts.BoardIdeas(signer);

      await (
        await contract.functions.createIdea("some title", "some desc")
      ).wait();

      setTitle("");
      setDescription("");
    } catch (err) {
      const error = err as Error;

      console.log({ error });
    }
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
            <Box>
              <FormLabel htmlFor="ideatitle" fontSize="lg" color="gray.400">
                Title
              </FormLabel>

              <Input
                id="ideatitle"
                placeholder="Your idea title"
                px="6"
                py="6"
                value={title}
                onChange={({ target: { value } }) => setTitle(value)}
                textColor="gray.300"
                borderWidth="2px"
                bgColor="gray.950"
                variant="filled"
                borderColor="gray.950"
                _hover={{
                  borderColor: "yellow.500",
                }}
                _focus={{
                  bgColor: "gray.950",
                  borderColor: "yellow.500",
                }}
              />
            </Box>

            <Box>
              <FormLabel htmlFor="desc" fontSize="lg" color="gray.400">
                Description
              </FormLabel>

              <Textarea
                id="desc"
                value={description}
                onChange={({ target: { value } }) => setDescription(value)}
                placeholder="Describe your amazing idea"
                px="6"
                py="6"
                minH="12rem"
                borderWidth="2px"
                textColor="gray.300"
                bgColor="gray.950"
                variant="filled"
                borderColor="gray.950"
                _hover={{
                  borderColor: "yellow.500",
                }}
                _focus={{
                  bgColor: "gray.950",
                  borderColor: "yellow.500",
                }}
              />
            </Box>
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

            <Button onClick={handleSendIdea} fontSize="lg" colorScheme="yellow">
              Submit idea
            </Button>
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
