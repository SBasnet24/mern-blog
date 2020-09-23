import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BlogProvider from "./Context/Blog/blogContext";
import Navbar from "./components/layouts/common/navbar/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Post from "./components/pages/Post";
import NewPost from "./components/pages/NewPost";

const App = () => {
  return (
    <BlogProvider>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/post/:slug" exact component={Post} />
          <Route path="/new" exact component={NewPost} />
        </Switch>
      </Router>
    </BlogProvider>
  );
};

export default App;
