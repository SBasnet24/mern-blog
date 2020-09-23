import React from "react";
const PostBody = ({ post }) => {
  return (
    <React.Fragment>
      <h1 className="mt-4">{post.title} </h1>
      <p className="lead">By {post.user ? post.user.name : ""} </p>
      <hr />
      <p>{post.createdAt}</p>
      <hr />
      <img className="img-fluid rounded" src={`/images/${post.image}`} alt="" />
      <p className="lead">{post.body}</p>
      <blockquote className="blockquote">
        <p className="mb-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          posuere erat a ante.
        </p>
        <footer className="blockquote-footer">
          Someone famous in
          <cite title="Source Title">Source Title</cite>
        </footer>
      </blockquote>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error,
        nostrum, aliquid, animi, ut quas placeat totam sunt tempora commodi
        nihil ullam alias modi dicta saepe minima ab quo voluptatem obcaecati?
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, dolor
        quis. Sunt, ut, explicabo, aliquam tenetur ratione tempore quidem
        voluptates cupiditate voluptas illo saepe quaerat numquam recusandae?
        Qui, necessitatibus, est!
      </p>
    </React.Fragment>
  );
};

export default PostBody;
