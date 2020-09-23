import React from "react";
import Category from "./Category";
import SearchBar from "./SearchBar";

const SideBar = () => {
  return (
    <React.Fragment>
      <div className="col-md-4">
        <SearchBar />
        <Category />
      </div>
    </React.Fragment>
  );
};

export default SideBar;
