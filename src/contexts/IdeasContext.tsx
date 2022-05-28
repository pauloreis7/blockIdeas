import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
  useEffect,
} from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";

// web3
import { config } from "../config";

type IdeasProviderProps = PropsWithChildren<{}>;

type IdeaProps = {
  title: string;
  description: string;
  created_at: number;
  upvotes: {
    votesCount: number;
    isVoted: boolean;
  };
  downvotes: {
    votesCount: number;
    isVoted: boolean;
  };
}[];

type IdeasContextData = {
  sendIdeaDrawerDisclosure: UseDisclosureReturn;
  isIdeasListLoading: boolean;
  setIsIdeasListLoading: (isLoading: boolean) => void;
};

export type VotesTypes = "upvote" | "downvote";

const IdeasContext = createContext({} as IdeasContextData);

export function IdeasProvider({ children }: IdeasProviderProps) {
  const disclosure = useDisclosure();

  // fetches all ideas on page load
  useEffect(() => {
    (async () => await fetchIdeas())();
  }, []);
  const [isIdeasListLoading, setIsIdeasListLoading] = useState(false);

  // hooks

  async function fetchIdeas() {
    setIsIdeasListLoading(true);

    try {
      const contract = config.contracts.BoardIdeas();

      const [totalIdeas] = await contract.functions.totalIdeas();
      const formattedTotalIdeas = Number(totalIdeas.toString());

      const ideas: IdeaProps = [];
      for (let i = 0; i < formattedTotalIdeas; i++) {
        const {
          createdAt,
          createdBy,
          downvotes,
          upvotes,
          id,
          description,
          title,
        } = await contract.functions.ideas(i);
      }

      console.log(ideas);
    } catch (err) {
      const error = err as Error;

      console.log({ error });
    } finally {
      setIsIdeasListLoading(false);
    }
  }

  return (
    <IdeasContext.Provider
      value={{
        sendIdeaDrawerDisclosure: disclosure,
        isIdeasListLoading,
        setIsIdeasListLoading,
      }}
    >
      {children}
    </IdeasContext.Provider>
  );
}

export const useIdeas = () => useContext(IdeasContext);
