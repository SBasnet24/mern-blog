// eslint-disable-next-line
import React, { useEffect, useContext } from "react";
import BlogPosts from "../layouts/homepage/BlogPosts";
import { BlogContext } from "./../../Context/Blog/blogContext";
import { paginate } from "./../../services/paginate";
import SideBar from "./../layouts/homepage/SideBar";
import Pagination from "./../layouts/homepage/Pagination";

const Home = (props) => {
  const {
    getAllPosts,
    posts: allPosts,
    loading,
    currentPage,
    pageSize,
    searchQuery,
    selectedCategory,
  } = useContext(BlogContext);
  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line
  }, []);
  const getPagedData = () => {
    let filtered = allPosts;
    if (searchQuery)
      // searching on the basis of title
      filtered = allPosts.filter((p) =>
        p.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedCategory && selectedCategory._id)
      filtered = allPosts.filter((p) => p.category === selectedCategory._id);

    const posts = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: posts };
  };
  const { totalCount, data: newPosts } = getPagedData();
  return (
    <div className="container" style={{ marginTop: "50px" }}>
      <div className="row">
        <SideBar />
        <div className="col-md-8">
          <h1 className="my-4">
            All BlogPosts
            <small> find all blogs here</small>
          </h1>
          {searchQuery && totalCount === 0 && (
            <div className="my-4">
              <h3>No posts with that search query</h3>
            </div>
          )}
          <BlogPosts
            loading={loading}
            history={props.history}
            newPosts={newPosts}
          />
          <Pagination itemsCount={totalCount} />
        </div>
      </div>
    </div>
  );
};

export default Home;
