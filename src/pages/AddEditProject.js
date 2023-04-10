import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

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
  const [progress, setProgress] = useState(null);
  const { title, tags, description, category } = form;
  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            toast.info("Image upload to firebase successfully");
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);
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
          <option value={option || ""} key={index}>
            {option}
          </option>
        ))}
      </select>
      <textarea
        placeholder="Description"
        name="description"
        value={description}
        onChange={handleChange}
      />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button type="submit">Publier</button>
    </form>
  );
};

export default AddEditProject;
