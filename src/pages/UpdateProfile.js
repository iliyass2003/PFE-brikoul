import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import "../style/UpdateProfile.css"

const initialState = {
  phonenumber: "",
  bio: "",
  tags: [],
};

const UpdateProfile = ({ user }) => {
  const [form, setForm] = useState(initialState);
  const { phonenumber, bio, tags } = form;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  useEffect(() => {
    user.uid && getUserInfos();
  }, [user.uid]);

  const getUserInfos = async () => {
    const docRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...form,
      });
      toast.success("Profil mis à jour avec succès");
      navigate("/profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="updateprofile">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Numéro de téléphone"
          minLength={10}
          required
          maxLength={10}
          type="text"
          name="phonenumber"
          value={form.phonenumber}
          onChange={handleChange}
        />
        {form.type === "professionnel" ? (
          <ReactTagInput
            tags={tags}
            placeholder="Skills"
            onChange={handleTags}
          />
        ) : null}
        <textarea
          required
          placeholder="Décrivez-vous en moins de 300 caractères"
          maxLength={300}
          name="bio"
          id=""
          cols="30"
          rows="8"
          value={form.bio}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Modifier</button>
      </form>
    </div>
  );
};

export default UpdateProfile;
