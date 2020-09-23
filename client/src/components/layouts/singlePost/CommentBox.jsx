import React, { useState, useContext } from "react";
import { BlogContext } from "./../../../Context/Blog/blogContext";
import TextArea from "./../common/form/TextArea";
import _ from "lodash";

const CommentBox = ({ history }) => {
  const [comment, setComment] = useState("");
  const { getCurrentUser, addComment, post } = useContext(BlogContext);
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!getCurrentUser()) history.push("/login");
    const response = await addComment(comment, post._id);
    if (!_.isEmpty(response)) {
      if (response.data.status === "success")
        history.push(`/post/${post.slug}`);
    }
    setComment("");
  };
  const onChange = (e) => {
    setComment(e.currentTarget.value);
  };
  return (
    <React.Fragment>
      <div className="card my-4">
        <h5 className="card-header">Leave a Comment:</h5>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextArea
                name="comment"
                value={comment}
                onChange={onChange}
                rows="3"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentBox;
