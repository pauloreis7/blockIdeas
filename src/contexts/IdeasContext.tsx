import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";

type IdeasProviderProps = PropsWithChildren<{}>;

type IdeasContextData = {
  sendIdeaDrawerDisclosure: UseDisclosureReturn;
  newIdeaTitle: string;
  newIdeaDescription: string;
  setNewIdeaDescription: (description: string) => void;
  setNewIdeaTitle: (title: string) => void;
};

export enum VotesTypes {
  Downvote = 1,
  Upvote,
}

const IdeasContext = createContext({} as IdeasContextData);

export function IdeasProvider({ children }: IdeasProviderProps) {
  const disclosure = useDisclosure();

  const [newIdeaTitle, setNewIdeaTitle] = useState("");
  const [newIdeaDescription, setNewIdeaDescription] = useState("");

  return (
    <IdeasContext.Provider
      value={{
        sendIdeaDrawerDisclosure: disclosure,
        newIdeaTitle,
        newIdeaDescription,
        setNewIdeaDescription,
        setNewIdeaTitle,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export const useIdeas = () => useContext(IdeasContext);
