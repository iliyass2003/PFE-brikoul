import React, {useState} from 'react';
import { toast } from 'react-toastify';
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: ""
}

const Signup = () => {
  const [state, setState] = useState(initialState);
  const {firstName, lastName, email, password, confirmPassword} = state;
  const navigate = useNavigate()
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  const handleAuth = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
      return toast.error("Le mot de passe ne correspond pas")
    }
    if(firstName && lastName && email && password){
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {displayName: `${firstName} ${lastName}`})
    }else{
      return toast.error("Tous les champs sont obligatoires à remplir");
    }
    navigate("/")
  };
  return (
    <form action="" onSubmit={handleAuth}>
      <h2>S'inscrire</h2>
      <input type="text" placeholder='First Name' name='firstName' value={firstName} onChange={handleChange} />
      <input type="text" placeholder='Last Name' name='lastName' value={lastName} onChange={handleChange} />
      <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
      <input type="password" placeholder='Password' name='password' value={password} onChange={handleChange}/>
      <input type="password" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
      <button type='submit'>S'inscrire</button>
      <div>Vous avez déjà un compte ? <span>Connexion</span></div>
    </form>
  )
}

export default Signup