import React, { useEffect, useContext } from "react";
import { BlogContext } from "../../../Context/Blog/blogContext";

const Category = () => {
  const {
    getAllCategories,
    category,
    handleCategorySelect,
    selectedCategory,
  } = useContext(BlogContext);
  useEffect(() => {
    getAllCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <React.Fragment>
      <div className="card my-4">
        <h5 className="card-header">Categories</h5>
        <div className="card-body">
          <div className="row">
            <div className="col-lg-12">
              <ul className="list-group mb-0">
                {category.map((category) => (
                  <li
                    className={
                      selectedCategory.name === category.name
                        ? "list-group-item active"
                        : "list-group-item"
                    }
                    onClick={() => handleCategorySelect(category)}
                    key={category.name}
                  >
                    {category.name.toUpperCase()}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Category;
