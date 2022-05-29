import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import { useEffect } from "react";
import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useWeb3React } from "@web3-react/core";

// web3
import { config } from "../config";

type IdeasProviderProps = PropsWithChildren<{}>;

type IdeaProps = {
  title: string;
  description: string;
  createdBy: string;
  createdAt: string | Date;
  upvotes: {
    votesCount: number;
    isVoted: boolean;
  };
  downvotes: {
    votesCount: number;
    isVoted: boolean;
  };
};

type IdeasContextData = {
  ideas: IdeaProps[];
  sendIdeaDrawerDisclosure: UseDisclosureReturn;
  isIdeasListLoading: boolean;
  setIsIdeasListLoading: (isLoading: boolean) => void;
};

export type VotesTypes = "upvote" | "downvote";

const IdeasContext = createContext({} as IdeasContextData);

export function IdeasProvider({ children }: IdeasProviderProps) {
  // states
  const [ideas, setIdeas] = useState<IdeaProps[]>([]);

  // hooks
  const disclosure = useDisclosure();
  const { account, activate, deactivate, connector } = useWeb3React();

  async function fetchIdeas() {
    setIsIdeasListLoading(true);

    try {
      const contract = config.contracts.BoardIdeas();

      const [totalIdeas] = await contract.functions.totalIdeas();
      const formattedTotalIdeas = Number(totalIdeas.toString());

      const ideas: IdeaProps[] = [];
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
        const formattedId = Number(id.toString());
        const formattedUpvotes = Number(upvotes.toString());
        const formattedDownvotes = Number(downvotes.toString());
        const formattedCreatedAt = new Date(
          Number(createdAt.toString())
        ).toDateString();

        const formattedIdea = {
          title,
          createdBy,
          description,
          id: formattedId,
          upvotes: { votesCount: formattedUpvotes, isVoted: false },
          downvotes: { votesCount: formattedDownvotes, isVoted: false },
          createdAt: formattedCreatedAt,
        };
        ideas.push(formattedIdea);
      }

      setIdeas(ideas);
    } catch (err) {
      const error = err as Error;

      console.log({ error });
    } finally {
      setIsIdeasListLoading(false);
    }
  }

  // fetches all ideas on page load
  useEffect(() => {
    (async () => await fetchIdeas())();
  }, []);

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
        ideas,
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
