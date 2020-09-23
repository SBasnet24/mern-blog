import React, { useEffect, useContext } from "react";
import { BlogContext } from "./../../Context/Blog/blogContext";
import PostBody from "./../layouts/singlePost/PostBody";
import CommentBox from "./../layouts/singlePost/CommentBox";
import CommentBody from "./../layouts/singlePost/CommentBody";
import Spinner from "../layouts/common/Spin";

const Post = (props) => {
  const { post, loading, getPost, comments } = useContext(BlogContext);
  useEffect(() => {
    getPost(props.match.params.slug);
    // eslint-disable-next-line
  }, []);
  return (
    <div className="container mt-5">
      {loading && <Spinner />}
      <div className="row">
        <div className="col-lg-8">
          <PostBody post={post} loading={loading} />
          <hr />
          <CommentBox history={props.history} />
          {comments && <CommentBody history={props.history} />}
        </div>
      </div>
    </div>
  );
};

export default Post;
