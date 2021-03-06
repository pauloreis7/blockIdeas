import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

// types
import type { Dispatch, SetStateAction } from "react";

type NewIdeaTitleFormProps = {
  newIdeaTitle: string;
  errorMessage?: string;
  setNewIdeaTitle: Dispatch<SetStateAction<string>>;
};

export function NewIdeaTitleForm({
  errorMessage,
  newIdeaTitle,
  setNewIdeaTitle,
}: NewIdeaTitleFormProps) {
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel
        htmlFor="ideatitle"
        fontSize="lg"
        fontWeight="bold"
        color="gray.200"
      >
        Title
      </FormLabel>

      <Input
        id="ideatitle"
        placeholder="Your idea title"
        px="6"
        py="6"
        value={newIdeaTitle}
        onChange={({ target: { value } }) => setNewIdeaTitle(value)}
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

      {!!errorMessage && <FormErrorMessage>{errorMessage}</FormErrorMessage>}
    </FormControl>
  );
}
