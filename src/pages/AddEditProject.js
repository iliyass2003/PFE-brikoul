import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../style/AddEditProject.css"

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

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

  const [text, setText] = useState('')

  const { id } = useParams();

  const navigate = useNavigate();

  const { title, tags, category } = form;

  useEffect(() => {
    const uploadFile = () => {
      toast.error("Attendre le téléchargement de l'image")
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
            toast.success("Image téléchargée avec succès")
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
    const docRef = doc(db, "projects", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
      setText(snapshot.data().text)
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
    if (category && tags && title && text && file) {
      if (!id) {
        try {
          await addDoc(collection(db, "projects"), {
            ...form,
            text,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Projet créé avec succès");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "projects", id), {
            ...form,
            text,
            timestamp: serverTimestamp(),
            author: user.displayName,
            userId: user.uid,
          });
          toast.success("Projet mis à jour avec succès");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("Tous les champs sont obligatoires à remplir");
    }
    navigate("/");
  };

  return (
          <div className="addeditproject">
            <div className="form-title">
              {id ? "Modifier un projet" : "Créer un projet"}
            </div>
              <form onSubmit={handleSubmit}>
                  <input
                    className="title"
                    type="text"
                    placeholder="Titre"
                    name="title"
                    value={title}
                    onChange={handleChange}
                  />
                  <ReactTagInput
                    tags={tags}
                    placeholder="Mots clés"
                    onChange={handleTags}
                  />
                  <select
                    value={category}
                    onChange={onCategoryChange}
                  >
                    <option value={""}>Veuillez sélectionner une catégorie</option>
                    {categoryOption.map((option, index) => (
                      <option value={option || ""} key={index}>
                        {option}
                      </option>
                    ))}
                  </select>


                  <div className="editor">
                    <CKEditor
                      editor={ClassicEditor}
                      data={text}
                      onChange={(event, editor) => {
                        const data = editor.getData()
                        setText(data)
                      }}
                    />
                  </div>


                  <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <button
                    type="submit"
                    disabled={progress !== null && progress < 100}
                  >
                    {id ? "Modifier" : "Publier"}
                  </button>
              </form>
          </div>
  );
};

export default AddEditBlog;
