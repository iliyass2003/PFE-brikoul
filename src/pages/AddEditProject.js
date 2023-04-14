import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../style/AddEditProject.css"
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
  tags: [],
  category: "",
  description: "",
  // comments: [],
  // likes: []
};

const categoryOption = [
  "Fashion",
  "Technology",
  "Food",
  "Politics",
  "Sports",
  "Business",
];

const AddEditBlog = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category, description } = form;

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
            setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          });
        }
      );
    };

    file && uploadFile();
  }, [file]);

  useEffect(() => {
    id && getBlogDetail();
  }, [id]);

  const getBlogDetail = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && tags && title && description) {
      if (!id) {
        try {
          await addDoc(collection(db, "projects"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Project created successfully");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "projects", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Project updated successfully");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill");
    }
    navigate("/");
  };

  return (
          <div className="addeditproject">
            <div className="form-title">
              {id ? "Update Project" : "Create Project"}
            </div>
              <form onSubmit={handleSubmit}>
                  <input
                    className="title"
                    type="text"
                    placeholder="Title"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                  <ReactTagInput
                    tags={tags}
                    placeholder="Tags"
                    onChange={handleTags}
                  />
                  <select
                    value={category}
                    onChange={onCategoryChange}
                  >
                    <option>Please select category</option>
                    {categoryOption.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <textarea
                    placeholder="Description"
                    value={description}
                    name="description"
                    onChange={handleChange}
                  />
                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    {id ? "Update" : "Submit"}
                  </button>
              </form>
          </div>
  );
};

export default AddEditBlog;
