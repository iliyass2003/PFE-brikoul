import React, {useState} from 'react';
import { toast } from 'react-toastify';
import {auth} from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import '../style/Signup.css'

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
    <div className='signup'>
      <form action="" onSubmit={handleAuth}>
        <div className='inscrire'>S'inscrire</div>
        <input type="text" placeholder='First Name' name='firstName' value={firstName} onChange={handleChange} />
        <input type="text" placeholder='Last Name' name='lastName' value={lastName} onChange={handleChange} />
        <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
        <input type="password" placeholder='Password' name='password' value={password} onChange={handleChange}/>
        <input type="password" placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={handleChange}/>
        <button type='submit'>S'inscrire</button>
        <div>Vous avez déjà un compte ? <span><a href="/login">Connexion</a></span></div>
      </form>
    </div>
  )
}

export default Signup