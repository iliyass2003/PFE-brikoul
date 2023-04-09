import React, {useState} from 'react'

const initialState = {
  email: "",
  password: ""
}

const Login = () => {
  const [state, setState] = useState(initialState);
  const {email, password} = state;
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  return (
    <form action="">
      <h2>Connexion</h2>
      <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
      <input type="password" placeholder='Password' name='password' value={password} onChange={handleChange}/>
      <button type='submit'></button>
      <div>N'avez pas de compte ? <span>S'inscrire</span></div>
    </form>
  )
}

export default Login