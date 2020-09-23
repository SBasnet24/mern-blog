import React, { useContext } from "react";
import { BlogContext } from "../../Context/Blog/blogContext";
import { Redirect } from "react-router-dom";
import POST_FORM from "./../layouts/newPost/POST_FORM";

const NewPost = (props) => {
  const { getCurrentUser } = useContext(BlogContext);
  if (!getCurrentUser()) return <Redirect to="/login" />;
  return (
    <div className="container" style={{ marginTop: "60px" }}>
      <div className="row">
        <div className="col-md-12 m-auto">
          <h1 className="display-4">Add New Blog</h1>
          <POST_FORM history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default NewPost;
