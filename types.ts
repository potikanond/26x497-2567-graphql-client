export type UserResponse = {
  username: string;
  firstName: string;
  lastName: string;
};

export type CommentResponse = {
  commentText: string;
  dateISOString: string;
  user: UserResponse;
};

export type GetPostsResponse = {
  posts: Array<{
    postId: string;
    postText: string;
    dateISOString: string;
    comments: CommentResponse[];
    user: UserResponse;
  }>;
};
