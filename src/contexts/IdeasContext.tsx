import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useWeb3React } from "@web3-react/core";

// web3
import { config } from '../config'

type IdeasProviderProps = PropsWithChildren<{}>

type IdeasContextData = {
  sendIdeaDrawerDisclosure: UseDisclosureReturn;
  isIdeasListLoading: boolean;
  setIsIdeasListLoading: (isLoading: boolean) => void;
  handleSendIdea: () => Promise<string | void>;
};

export type VotesTypes = 'upvote' | 'downvote'

const IdeasContext = createContext({} as IdeasContextData)

export function IdeasProvider({ children }: IdeasProviderProps) {
  // hooks
  const disclosure = useDisclosure()

  async function fetchIdeas() {
    try {
      const contract = config.contracts.BoardIdeas()

      const [totalIdeas] = await contract.functions.totalIdeas()
      const formattedTotalIdeas = Number(totalIdeas.toString())

      const ideas = []
      for (let i = 0; i < formattedTotalIdeas; i++) {
        const {
          createdAt,
          createdBy,
          downvotes,
          upvotes,
          id,
          description,
          title,
        } = await contract.functions.ideas(i)
      }

      console.log(ideas)
    } catch (err) {
      const error = err as Error

      console.log({ error })
    }
  }

  // fetches all ideas on page load
  useEffect(() => {
    ;(async () => await fetchIdeas())()
  }, [])
  const { account, activate, deactivate, connector } = useWeb3React();

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
  )
}

export const useIdeas = () => useContext(IdeasContext)
