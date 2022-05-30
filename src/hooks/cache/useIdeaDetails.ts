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
  comments: CommentProps[];
};

export type CommentProps = {
  text: string;
  createdBy: string;
  createdAt: string;
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
    comments: [],
  } as IdeaProps;

  const [totalCommentsLength] = await contract.functions.ideaCommentsLength(
    String(ideaId)
  );

  const formattedCommentsLength = Number(totalCommentsLength.toString());

  for (let i = 0; i < formattedCommentsLength; i++) {
    const { createdAt, createdBy, text } = await contract.functions.comments(
      ideaId,
      i
    );

    const formattedCreatedAt = dayjs(
      Number(createdAt.toString()) * 1000
    ).format("HH:mm - MMM, DD YYYY");

    const formattedComment = {
      createdAt: formattedCreatedAt,
      createdBy: `${createdBy.substring(0, 6)}...${createdBy.substring(
        createdBy.length - 4
      )}`,
      text,
    };

    formattedIdea.comments.push(formattedComment);
  }

  return formattedIdea;
}

export function useIdeaDetails(ideaId: number) {
  return useQuery(["ideaDetails", ideaId], () => getIdeaDetails(ideaId), {
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
