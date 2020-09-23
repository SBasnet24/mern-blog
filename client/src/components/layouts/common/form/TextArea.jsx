import React, { useContext } from "react";
import Error from "./Error";
import { BlogContext } from "../../../../Context/Blog/blogContext";
import classnames from "classnames";

const TextArea = ({ name, value, onChange, placeholder, rows }) => {
  const { errors } = useContext(BlogContext);
  return (
    <div className="form-group">
      <textarea
        type="text"
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        className={classnames("form-control form-control-lg", {
          "is-invalid": errors[name],
        })}
        rows={rows}
      />
      <Error error={errors[name]} />
    </div>
  );
};

export default TextArea;
