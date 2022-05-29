import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

import { useIdeas } from "../../contexts/IdeasContext";

type NewIdeaDescriptionFormProps = {
  errorMessage?: string;
};

export function NewIdeaDescriptionForm({
  errorMessage,
}: NewIdeaDescriptionFormProps) {
  const { newIdeaDescription, setNewIdeaDescription } = useIdeas();

  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel htmlFor="desc" fontSize="lg" color="gray.400">
        Description
      </FormLabel>

      <Textarea
        id="desc"
        value={newIdeaDescription}
        onChange={({ target: { value } }) => setNewIdeaDescription(value)}
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

      {!!errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
}
