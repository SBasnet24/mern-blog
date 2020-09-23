const formData = (title, description, body, image, id, category) => {
  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("description", description);
  formData.append("image", image);
  formData.append("user", id);
  formData.append("category", category);
  return formData;
};

export default formData;
