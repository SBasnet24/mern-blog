import React, { useContext } from "react";
import { BlogContext } from "./../../../Context/Blog/blogContext";
import Spinner from "./../common/Spin";
import { DeleteFilled } from "@ant-design/icons";
import _ from "lodash";

const CommentBody = ({ history }) => {
  const { comments, loading, getCurrentUser, removeComment, post } = useContext(
    BlogContext
  );
  let id;
  const post_id = post._id;
  if (getCurrentUser()) {
    const user = getCurrentUser();
    id = user.id;
  }
  const handleDelete = async (comment_id) => {
    const response = await removeComment(post_id, comment_id);
    if (!_.isEmpty(response)) {
      if (response.data.status === "success")
        history.push(`/post/${post.slug}`);
    }
  };
  return (
    <React.Fragment>
      {loading && comments.length === 0 && <Spinner />}
      <div className="card" style={{ marginBottom: "40px" }}>
        <div className="card-header">
          <h2>Comments [{comments.length}]</h2>
        </div>
        {!_.isEmpty(comments) &&
          comments.map((comment) => (
            <React.Fragment key={comment._id}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <div className="media mt-4">
                    <img
                      className="d-flex mr-3 rounded-circle"
                      src="http://placehold.it/50x50"
                      alt=""
                    />
                    <div className="media-body">
                      {id === comment.user && (
                        <DeleteFilled
                          onClick={() => handleDelete(comment._id)}
                          className="pull-right"
                          style={{ fontSize: "22px" }}
                        />
                      )}
                      <h5>@{comment.name}</h5>
                      {comment.text}
                      <span className="text-muted pull-right">
                        {" "}
                        {Math.ceil(
                          (Date.parse(new Date()) -
                            Date.parse(comment.createdAt)) /
                            (60 * 60 * 60)
                        )}{" "}
                        minutes ago
                      </span>
                    </div>
                  </div>
                </li>
              </ul>
              {/* <div className="card-footer mb-4 bg-light">"Hey"</div> */}
            </React.Fragment>
          ))}
      </div>
    </React.Fragment>
  );
};

export default CommentBody;
