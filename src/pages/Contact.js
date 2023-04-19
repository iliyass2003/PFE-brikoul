import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import "../style/Contact.css";


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
  email: "",
  category: "",
  ville: "",
  number: "",
};

const categoryOption = ["Car", "Minibus"];

const villeOption = [
  "Benguerir",
  "Youssoufia",
  "Safi",
  "El-Jadida",
  "Laayoune",
];

const Contact = ({ user }) => {
  const [form, setForm] = useState(initialState);

  const [text, setText] = useState("");

  const { id } = useParams();

  const navigate = useNavigate();

  const { numero, category, ville, number } = form;

  // useEffect(() => {
  //   const uploadFile = () => {
  //     const storageRef = ref(storage, file.name);
  //     const uploadTask = uploadBytesResumable(storageRef, file);
  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         setProgress(progress);
  //       },
  //       (error) => {
  //         console.log(error);
  //       },
  //       () => {
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
  //           setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
  //         });
  //       }
  //     );
  //   };

  //   file && uploadFile();
  // }, [file]);

  useEffect(() => {
    id && getDemandeDetail();
  }, [id]);

  const getDemandeDetail = async () => {
    const docRef = doc(db, "demandes", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleTags = (tags) => {
  //   setForm({ ...form, tags });
  // };

  const onCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const onVilleChange = (e) => {
    setForm({ ...form, ville: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (category && ville && numero && number) {
      try {
        await addDoc(collection(db, "demandes"), {
          ...form,
          timestamp: serverTimestamp(),
          userId: user.uid,
        });
        toast.success("Demande envoyée avec succès");
      } catch (err) {
        console.log(err);
      }
    } else {
      return toast.error("Tous les champs sont obligatoires");
    }
    navigate("/");
  };

  return (
    <div className="contact">
      <form onSubmit={handleSubmit}>
        <div className="form-title">Demande de transport</div>
        <input
          className="numero"
          type="text"
          placeholder="Numéro de téléphone"
          name="numero"
          value={numero}
          onChange={handleChange}
        />
        <input
          className="number"
          type="number"
          placeholder="Nombre d'employés qui utiliseront le transport"
          name="number"
          value={number}
          onChange={handleChange}
        />
        <select value={category} onChange={onCategoryChange}>
          <option>Veuillez sélectionner le type de transport</option>
          {categoryOption.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>

        <select className="ville" value={ville} onChange={onVilleChange}>
          <option>Veuillez sélectionner votre ville</option>
          {villeOption.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>

        <button type="submit">Demander</button>
      </form>
    </div>
  );
};

export default Contact;
