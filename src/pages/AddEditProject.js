import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

const initialState = {
  title: "",
  description: "",
  category: "",
  tags: [],
};

const categoryOptions = ["Peinture", "Porte", "Piscin"];

const handleChange = (e) => {};
const handleTags = () => {};
const onCategoryChange = () => {};

const AddEditProject = () => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const { title, tags, description, category } = form;
  return (
    <form action="">
      <h2>Publier un projet</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={title}
        onChange={handleChange}
      />
      <ReactTagInput tags={tags} placeholder="Tags" onChange={handleTags} />
      <select value={category} onChange={onCategoryChange}>
        <option>Please select category</option>
        {categoryOptions.map((option, index) => (
          <option value={option || ""} key={index}>{option}</option>
        ))}
      </select>
      <textarea placeholder="Description" name="description" value={description} onChange={handleChange}/>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Publier</button>
    </form>
  );
};

export default AddEditProject;
