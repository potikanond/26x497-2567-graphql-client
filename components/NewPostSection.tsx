"use client";

import { $username } from "@/stores/usernameStore";
import { gql, useMutation } from "@apollo/client";
import { useStore } from "@nanostores/react";
import { FC, useState } from "react";

type Props = {
  refetch: Function;
};

const addPostMutation = gql`
  mutation AddPost($postText: String!, $username: String!) {
    addPost(postText: $postText, username: $username) {
      postText
    }
  }
`;

export const NewPostSection: FC<Props> = ({ refetch }) => {
  const [addPost, { data, loading }] = useMutation(addPostMutation);

  const [status, setStatus] = useState("");
  const username = useStore($username);

  return (
    <div className="border rounded-3 my-2 p-3">
      <div className="d-flex mb-2">
        <div className="fw-bold mb-1">What's on your mind?</div>
        <select
          className="ms-auto form-select form-select-sm"
          style={{ maxWidth: "12rem" }}
          onChange={(e) => {
            $username.set(e.target.value);
          }}
          value={username}
        >
          <option value="ElonX">Post as @ElonX</option>
          <option value="MarkZuck">Post as @MarkZuck</option>
        </select>
      </div>

      <input
        className="form-control"
        placeholder="post a status..."
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        onKeyUp={async (e) => {
          if (e.key === "Enter" && status) {
            await addPost({
              variables: { postText: status, username },
            });
            setStatus("");
            refetch();
          }
        }}
        disabled={loading}
      />
      {loading && <span className="text-secondary">Posting...</span>}
    </div>
  );
};
