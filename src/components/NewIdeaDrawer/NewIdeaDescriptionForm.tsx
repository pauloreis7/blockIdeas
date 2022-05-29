import {
  FormControl,
  FormLabel,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";

// types
import type { Dispatch, SetStateAction } from "react";

type NewIdeaDescriptionFormProps = {
  errorMessage?: string;
  newIdeaDescription: string;
  setNewIdeaDescription: Dispatch<SetStateAction<string>>;
};

export function NewIdeaDescriptionForm({
  errorMessage,
  newIdeaDescription,
  setNewIdeaDescription,
}: NewIdeaDescriptionFormProps) {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel
        htmlFor="desc"
        fontSize="lg"
        fontWeight="bold"
        color="gray.200"
      >
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
