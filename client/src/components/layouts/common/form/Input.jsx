import React, { useContext } from "react";
import { BlogContext } from "../../../../Context/Blog/blogContext";
import classnames from "classnames";
import Error from "./Error";

const Input = ({ name, value, onChange, placeholder, label, type }) => {
  const { errors } = useContext(BlogContext);
  return (
    <React.Fragment>
      <div className="form-group mb-3">
        {label && (
          <label>
            <h2>{label}</h2>
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className={classnames("form-control form-control-lg", {
            "is-invalid": errors[name] || errors["message"],
          })}
        />
        <Error error={errors[name] || errors["message"]} />
      </div>
    </React.Fragment>
  );
};

export default Input;
