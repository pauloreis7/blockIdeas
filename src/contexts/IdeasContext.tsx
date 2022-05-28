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
};

export type VotesTypes = "upvote" | "downvote";

const IdeasContext = createContext({} as IdeasContextData);

export function IdeasProvider({ children }: IdeasProviderProps) {
  const disclosure = useDisclosure();

  return (
    <IdeasContext.Provider
      value={{
        sendIdeaDrawerDisclosure: disclosure,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export const useIdeas = () => useContext(IdeasContext);
