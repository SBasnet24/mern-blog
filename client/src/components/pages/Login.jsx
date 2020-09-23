import React, { useContext } from "react";
import { BlogContext } from "./../../Context/Blog/blogContext";
import { Redirect } from "react-router-dom";
import LoginForm from "../layouts/login/LoginForm";

const Login = (props) => {
  const { getCurrentUser } = useContext(BlogContext);
  if (getCurrentUser()) return <Redirect to="/" />;
  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 ">Log In</h1>
          <p className="lead">Sign in to your BlogTech account</p>
          <LoginForm history={props.history} />
        </div>
      </div>
    </div>
  );
};

export default Login;
