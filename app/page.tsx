"use client";

import { gql, useQuery } from "@apollo/client";
import { Post } from "@/components/Post";
import { GetPostsResponse } from "@/types";
import { NewPostSection } from "@/components/NewPostSection";

const query = gql`
  query getPosts {
    posts {
      postId
      postText
      dateISOString
      comments {
        commentText
        dateISOString
        user {
          username
          firstName
          lastName
        }
      }
      user {
        username
        firstName
        lastName
      }
    }
  }
`;

export default function Home() {
  const { data, loading, refetch } = useQuery<GetPostsResponse>(query);
  return (
    <div style={{ maxWidth: "600px" }} className="mx-auto">
      <p className="display-6 text-center"> ✨ Simple Social App ✨</p>
      <NewPostSection refetch={refetch} />
      {!data || loading ? (
        <p>loading...</p>
      ) : (
        data.posts.map((post) => (
          <Post
            key={post.dateISOString}
            postId={post.postId}
            firstName={post.user.firstName}
            lastName={post.user.lastName}
            username={post.user.username}
            postText={post.postText}
            dateISOString={post.dateISOString}
            comments={post.comments}
            refetch={refetch}
          />
        ))
      )}
    </div>
  );
}
