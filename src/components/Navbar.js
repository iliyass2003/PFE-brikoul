import React, { useContext } from 'react'
import {signOut} from "firebase/auth"
import { auth } from '../firebase'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const Img = "https://img.icons8.com/?size=512&id=7Ffvtg1xmgaV&format=png"

  return (
    <div className='navbar'>
      <span className="logo">Brikoul</span>
      <div className="user">
        <img src={currentUser.photoURL ? currentUser.photoURL : Img} alt="" />
        <span>{currentUser.displayName}</span>
      </div>
    </div>
  )
}

export default Navbar