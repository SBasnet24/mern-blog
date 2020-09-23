import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { DeleteFilled, LikeFilled, LikeOutlined } from "@ant-design/icons";
import _ from "lodash";
import { BlogContext } from "./../../../Context/Blog/blogContext";

const PostsCard = ({ post, history }) => {
  const { category, getCurrentUser, removePost } = useContext(BlogContext);
  const user = getCurrentUser();
  const [clicked, setClicked] = useState(false);
  // filtering the name of the category
  const filtered = category.filter((cat) => cat._id === post.category);
  const name = filtered.map((m) => m.name);
  const handleDelete = async (post_id) => {
    const response = await removePost(post_id);
    if (!_.isEmpty(response)) {
      if (response.data.status === "success") history.replace(`/`);
    }
  };
  const handleClick = () => setClicked(!clicked);
  return (
    <React.Fragment>
      <div className="card mb-4">
        <img
          className="card-img-top"
          src={`/images/${post.image}`}
          alt="BlogPost"
        />
        <div className="card-body">
          <h2 className="card-title">{post.title}</h2>
          <p className="card-text">
            {post.description} a laboriosam. Dicta expedita corporis animi vero
            voluptate voluptatibus possimus, veniam magni quis!
          </p>
          <div className="bg- mb-3" style={{ fontSize: "20px" }}>
            <p>
              {post.createdAt.split("T")[0]} Posted By : <b>{post.user.name}</b>
            </p>
          </div>
          <Link to={`/post/${post.slug}`} className="btn btn-dark">
            Read More &rarr;
          </Link>
          {getCurrentUser() && user.id === post.user._id && (
            <DeleteFilled
              className="pull-right"
              onClick={() => handleDelete(post._id)}
              style={{ fontSize: "40px" }}
            />
          )}
          {clicked === true ? (
            <LikeFilled
              onClick={handleClick}
              className="pull-right"
              style={{ fontSize: "40px" }}
            />
          ) : (
            <LikeOutlined
              onClick={handleClick}
              className="pull-right"
              style={{ fontSize: "40px" }}
            />
          )}
        </div>
        <div className="card-footer">
          <p>
            Category: <b>{name[0].toUpperCase()}</b>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default PostsCard;
