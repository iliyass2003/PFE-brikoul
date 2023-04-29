import React, { useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../style/Signup.css";
import { db } from "../firebase";
import {
  doc,
  setDoc,
} from "firebase/firestore";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  type: "",
};

const Signup = () => {
  const [state, setState] = useState(initialState);
  const { firstName, lastName, email, password, confirmPassword, type } = state;
  const navigate = useNavigate();
  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Le mot de passe ne correspond pas");
    }
    if (firstName && lastName && email && password && type) {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, "users", user.uid), {
        type: type,
      });

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
    } else {
      return toast.error("Tous les champs sont obligatoires à remplir");
    }
    navigate("/");
  };
  return (
    <div className="signup">
      <form action="" onSubmit={handleAuth}>
        <div className="inscrire">S'inscrire</div>
        <input
          type="text"
          placeholder="Prénom"
          name="firstName"
          value={firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="Nom"
          name="lastName"
          value={lastName}
          onChange={handleChange}
        />
        <select name="type" value={type} onChange={handleChange}>
          <option value="">Sélectionnez le type de compte</option>
          <option value="client">Client</option>
          <option value="professionnel">Professionnel</option>
        </select>
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Le mot de passe"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Confirmez le mot de passe"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">S'inscrire</button>
        <div>
          Vous avez déjà un compte ?{" "}
          <span>
            <a href="/login">Connexion</a>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Signup;
