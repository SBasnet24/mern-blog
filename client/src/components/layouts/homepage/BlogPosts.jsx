import React from "react";
import PostsCard from "./PostsCard";
import Spinner from "./../common/Spin";

const BlogPosts = ({ newPosts, loading, history }) => {
  return (
    <React.Fragment>
      {loading && <Spinner />}
      {newPosts.map((post) => (
        <PostsCard key={post._id} history={history} post={post} />
      ))}
    </React.Fragment>
  );
};

export default BlogPosts;
