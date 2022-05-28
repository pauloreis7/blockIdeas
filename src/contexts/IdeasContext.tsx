import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useWeb3React } from "@web3-react/core";

type IdeasProviderProps = PropsWithChildren<{}>;

type IdeasContextData = {
  sendIdeaDrawerDisclosure: UseDisclosureReturn;
  isIdeasListLoading: boolean;
  setIsIdeasListLoading: (isLoading: boolean) => void;
  handleSendIdea: () => Promise<string | void>;
};

export type VotesTypes = "upvote" | "downvote";

const IdeasContext = createContext({} as IdeasContextData);

export function IdeasProvider({ children }: IdeasProviderProps) {
  const { account, activate, deactivate, connector } = useWeb3React();

  const disclosure = useDisclosure();

  const [isIdeasListLoading, setIsIdeasListLoading] = useState(false);

  async function handleSendIdea() {
    try {
      if (!account) {
        throw new Error("Wallet not connected");
      }

      return;
    } catch (err) {
      console.log(err);

      const errorMessage = (err as Error).message;

      return errorMessage;
    }
  }

  return (
    <IdeasContext.Provider
      value={{
        sendIdeaDrawerDisclosure: disclosure,
        isIdeasListLoading,
        setIsIdeasListLoading,
        handleSendIdea,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export const useIdeas = () => useContext(IdeasContext);
