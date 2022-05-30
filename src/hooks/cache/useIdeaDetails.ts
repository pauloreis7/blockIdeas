import { useQuery } from "react-query";
import dayjs from "dayjs";

import { config } from "../../config";

export type IdeaProps = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  isVoted: boolean;
};

type GetIdeaDetailsesponse = IdeaProps;

export async function getIdeaDetails(
  ideaId: number
): Promise<GetIdeaDetailsesponse> {
  const contract = config.contracts.BoardIdeas();

  const { createdAt, createdBy, downvotes, upvotes, id, description, title } =
    await contract.functions.ideas(String(ideaId));
  const formattedId = Number(id.toString());
  const formattedUpvotes = Number(upvotes.toString());
  const formattedDownvotes = Number(downvotes.toString());

  const formattedCreatedAt = dayjs(Number(createdAt.toString()) * 1000).format(
    "HH:mm - MMM, DD YYYY"
  );

  const formattedIdea = {
    title,
    createdBy,
    description,
    isVoted: false,
    id: formattedId,
    upvotes: formattedUpvotes,
    downvotes: formattedDownvotes,
    createdAt: formattedCreatedAt,
  };

  return formattedIdea;
}

export function useIdeaDetails(ideaId: number) {
  return useQuery(["ideaDetails", ideaId], () => getIdeaDetails(ideaId), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
