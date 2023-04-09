import React, {useState} from 'react'
import { toast } from 'react-toastify';
import {auth} from "../firebase";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const [state, setState] = useState(initialState);
  const {email, password} = state;
  const navigate = useNavigate()
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  const handleAuth = async (e) => {
    e.preventDefault()
    if(email && password){
      const {user} = await signInWithEmailAndPassword(auth, email, password)
    }else{
      return toast.error("Tous les champs sont obligatoires à remplir")
    }
    navigate("/");
  }
  return (
    <form action="" onSubmit={handleAuth}>
      <h2>Connexion</h2>
      <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
      <input type="password" placeholder='Password' name='password' value={password} onChange={handleChange}/>
      <button type='submit'>Connexion</button>
      <div>N'avez pas de compte ? <span>S'inscrire</span></div>
    </form>
  )
}

export default Login