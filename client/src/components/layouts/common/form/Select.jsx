import React from "react";

const Select = ({ value, onChange, name }) => {
  return (
    <div className="form-group">
      <select
        value={value}
        name={name}
        onChange={onChange}
        className="form-control form-control-lg my-1 mr-sm-2"
      >
        <option value="DEFAULT" disabled>
          Choose...
        </option>
        <option value="programming">Programming</option>
        <option value="bsccsit">BscCSIT</option>
        <option value="education">Education</option>
      </select>
    </div>
  );
};

export default Select;
