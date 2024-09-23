import { $username } from "@/stores/usernameStore";
import { gql, useMutation } from "@apollo/client";
import { FC, useState } from "react";
import { useStore } from "@nanostores/react";

type Props = {
  postId: string;
  refetch: Function;
};

const addCommentMutation = gql`
  mutation addComment(
    $postId: String!
    $commentText: String!
    $username: String!
  ) {
    addComment(
      postId: $postId
      commentText: $commentText
      username: $username
    ) {
      commentText
    }
  }
`;

export const NewCommentSection: FC<Props> = ({ postId, refetch }) => {
  const [opened, setOpened] = useState(false);
  const [comment, setComment] = useState("");
  const [addComment, { data, loading }] = useMutation(addCommentMutation);

  const username = useStore($username);

  return (
    <div>
      {!opened ? (
        <a
          href=""
          style={{ fontSize: "0.8rem" }}
          onClick={(e) => {
            e.preventDefault();
            setOpened(true);
          }}
        >
          Add comment
        </a>
      ) : (
        <input
          className="form-control form-control-sm mt-2"
          placeholder="Please be kind to people."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          onKeyUp={async (e) => {
            if (e.key === "Enter" && comment) {
              await addComment({
                variables: {
                  postId,
                  commentText: comment,
                  username,
                },
              });
              setComment("");
              refetch();
            }
          }}
          disabled={loading}
        />
      )}
      {loading && <span className="text-secondary">Posting...</span>}
    </div>
  );
};
