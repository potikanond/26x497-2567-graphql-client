import dayjs from "dayjs";
import { FC } from "react";
import * as relativeTime from "dayjs/plugin/relativeTime";
import { CommentResponse } from "@/types";
import { Comment } from "./Comment";
import { NewCommentSection } from "./NewCommentSection";

type Props = {
  postId: string;
  firstName: string;
  lastName: string;
  username: string;
  postText: string;
  dateISOString: string;
  comments: CommentResponse[];
  refetch: Function;
};

dayjs.extend(relativeTime as any);

export const Post: FC<Props> = ({
  postId,
  firstName,
  lastName,
  username,
  postText,
  dateISOString,
  comments,
  refetch,
}) => {
  return (
    <div className="border rounded-3 my-4 p-3">
      <div className="d-flex">
        <span className="fw-bold">
          {firstName} {lastName}
        </span>{" "}
        <span className="text-secondary">@{username}</span>
        <span className="text-secondary ms-auto">
          {dayjs().to(dayjs(dateISOString))}
        </span>
      </div>
      <div className="my-2">{postText}</div>
      <hr className="mb-0 mt-3" />
      {comments.map((comment) => (
        <Comment
          key={comment.dateISOString}
          commentText={comment.commentText}
          username={comment.user.username}
          dateISOString={comment.dateISOString}
        />
      ))}

      <NewCommentSection postId={postId} refetch={refetch} />
    </div>
  );
};
