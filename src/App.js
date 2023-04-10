import './App.css';
import Home from './pages/Home'
import {Routes, Route, useNavigate, Navigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AddEditProject from './pages/AddEditProject';
import NotFound from './pages/NotFound';
import Detail from './pages/Detail';
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';
import {auth} from "./firebase"
import { signOut } from 'firebase/auth';


function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser){
        setUser(authUser)
      }else{
        setUser(null)
      }
    })
  },[])
  const navigate = useNavigate()
  const handleLogout = () => {
    signOut(auth).then(() => {
      setUser(null)
      navigate("/login")
    })
  }
  return (
    <div className="App">
      <Header user={user}  handleLogout={handleLogout} />
      <ToastContainer position='top-center'/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/create' element={user?.uid ? <AddEditProject user={user}/> : <Navigate to="/login"/>}/>
        <Route path='/update/:id' element={user?.uid ? <AddEditProject user={user}/> : <Navigate to="/login"/>}/>
        <Route path='/*' element={<NotFound/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </div>
  );
}

export default App;
