import React, { useContext } from "react";
import { BlogContext } from "./../../../Context/Blog/blogContext";

const SearchBar = () => {
  const { handleSearch } = useContext(BlogContext);

  const handleChange = (e) => {
    handleSearch(e.currentTarget.value);
  };
  return (
    <React.Fragment>
      <div className="card my-4">
        <h5 className="card-header">Search</h5>
        <div className="card-body">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search for..."
              onChange={handleChange}
            />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button">
                Go!
              </button>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SearchBar;
