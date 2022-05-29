import { useQuery } from "react-query";
import dayjs from "dayjs";

import { config } from "../../config";

type IdeaProps = {
  id: number;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string | Date;
  upvotes: number
  downvotes: number
  isVoted: boolean
};

type GetIdeasListResponse = IdeaProps[];

export async function getIdeasList(): Promise<GetIdeasListResponse> {
  const contract = config.contracts.BoardIdeas();

  const [totalIdeas] = await contract.functions.totalIdeas();
  const formattedTotalIdeas = Number(totalIdeas.toString());

  const ideas: IdeaProps[] = [];
  for (let i = 0; i < formattedTotalIdeas; i++) {
    const { createdAt, createdBy, downvotes, upvotes, id, description, title } =
      await contract.functions.ideas(i);
    const formattedId = Number(id.toString());
    const formattedUpvotes = Number(upvotes.toString());
    const formattedDownvotes = Number(downvotes.toString());

    const formattedCreatedAt = dayjs(
      Number(createdAt.toString()) * 1000
    ).format("HH:mm - MMM, DD YYYY");

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

    ideas.push(formattedIdea);
  }

  return ideas.reverse();
}

export function useIdeasList() {
  return useQuery(["ideasList"], () => getIdeasList(), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
