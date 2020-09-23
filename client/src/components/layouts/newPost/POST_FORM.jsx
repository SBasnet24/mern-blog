import React, { useState, useContext } from "react";
import _ from "lodash";
import TextArea from "../common/form/TextArea";
import Input from "../common/form/Input";
import Select from "../common/form/Select";
import { BlogContext } from "./../../../Context/Blog/blogContext";

const POST_FORM = (history) => {
  const { addPost } = useContext(BlogContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    body: "",
    category: "",
  });
  const [image, setImage] = useState(null);
  const { title, description, body, category } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.files) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await addPost(title, body, description, category, image);
    // console.log(response);
    if (!_.isEmpty(response)) {
      if (response.data.status === "success") window.location.assign("/");
    }
  };
  return (
    <React.Fragment>
      <form noValidate onSubmit={onSubmit} encType="multipart/form-data">
        <Input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Title of Blog"
        />
        <Input
          type="text"
          name="description"
          value={description}
          onChange={onChange}
          placeholder="Small Description"
        />
        <TextArea
          type="text"
          name="body"
          value={body}
          onChange={onChange}
          placeholder="Body Of Blog"
          rows="7"
        />
        <Select value={category} name="category" onChange={onChange} />
        <Input type="file" name="image" onChange={onChange} label="Image" />
        <button className="btn btn-dark btn-lg mb-4">Submit</button>
      </form>
    </React.Fragment>
  );
};

export default POST_FORM;
