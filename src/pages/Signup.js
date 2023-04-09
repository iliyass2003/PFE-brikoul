import React, {useState} from 'react'

const initialState = {
  email: "",
  password: ""
}

const Signup = () => {
  const [state, setState] = useState(initialState);
  const {email, password} = state;
  const handleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  }
  return (
    <form action="">
      <h2>S'inscrire</h2>
      <input type="email" placeholder='Email' name='email' value={email} onChange={handleChange}/>
      <input type="password" placeholder='Password' name='password' value={password} onChange={handleChange}/>
      <button type='submit'></button>
      <div>Vous avez déjà un compte ? <span>Connexion</span></div>
    </form>
  )
}

export default Signup