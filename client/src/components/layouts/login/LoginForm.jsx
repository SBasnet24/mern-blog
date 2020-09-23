import React, { useContext, useState } from "react";
import { BlogContext } from "./../../../Context/Blog/blogContext";
import _ from "lodash";
import Input from "./../common/form/Input";

const LoginForm = ({ history }) => {
  const { loginUser } = useContext(BlogContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(email, password);
    if (!_.isEmpty(response)) {
      if (response.data.status === "Success") history.push("/");
    }
  };
  return (
    <form noValidate onSubmit={onSubmit}>
      <Input
        type="email"
        name="email"
        value={email}
        onChange={onChange}
        placeholder="Email Address"
      />
      <Input
        type="password"
        name="password"
        value={password}
        onChange={onChange}
        placeholder="Email Address"
      />
      <button className="btn btn-dark btn-block mt-4">Submit</button>
    </form>
  );
};

export default LoginForm;
