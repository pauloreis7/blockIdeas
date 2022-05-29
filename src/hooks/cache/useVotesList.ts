import { useQuery } from "react-query";

// web3
import { config } from "../../config";

// types
import type { VotesTypes } from "../../contexts/IdeasContext";

export type VoteProps = {
  id: number;
  voter: string;
  voteType: VotesTypes;
};

type GetVotesListResponse = VoteProps[] | undefined;

async function fetchVotesList(
  account?: string | null
): Promise<GetVotesListResponse> {
  if (!account) {
    return;
  }

  const contract = config.contracts.BoardIdeas();

  const [totalIdeas] = await contract.functions.totalIdeas();
  const formattedTotalIdeas = Number(totalIdeas.toString());

  const ideas: VoteProps[] = [];
  for (let i = 0; i < formattedTotalIdeas; i++) {
    const { voter, voteType } = await contract.functions.votes(i, account);

    const formattedVote = {
      id: i,
      voter,
      voteType,
    };

    ideas.push(formattedVote);
  }

  return ideas.reverse();
}

export function useVotesList(account?: string | null) {
  return useQuery(["votesList", account], () => fetchVotesList(account), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
