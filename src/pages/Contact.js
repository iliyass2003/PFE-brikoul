import React, { useState, useEffect } from "react";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import { db, storage } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import "../style/Contact.css";

import {
  addDoc,
  collection,
  getDoc,
  serverTimestamp,
  doc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  objet: "",
  description: "",
};

const Contact = () => {
  const [form, setForm] = useState(initialState);


  const navigate = useNavigate();

  const { email, objet, description } = form;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && objet && description) {
      try {
        await addDoc(collection(db, "contact"), {
          ...form,
          timestamp: serverTimestamp(),
        });
        toast.success("Message envoyée avec succès");
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
        <div className="form-title">Contact</div>
        <input
          className="text"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          className="text"
          type="text"
          placeholder="Objet"
          name="objet"
          value={objet}
          onChange={handleChange}
        />
        <textarea
          placeholder="Description"
          name="description"
          value={description}
          onChange={handleChange}
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default Contact;
