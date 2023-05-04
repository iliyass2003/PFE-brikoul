import React from 'react'
import '../style/Footer.css'
import { Link } from 'react-router-dom'
import "../pages/Home"

const Footer = () => {
  return (
    <div className="footer">
      <ul>
        <Link to={'/'}>
        <li>Acceuil</li>
        </Link>
        <Link to={'/contact'}>
        <li>Contact</li>
        </Link>
        <Link to={'/profile'}>
        <li>Profil</li>
        </Link>
        <Link to={'/create'}>
        <li>Publier</li>
        </Link>
      </ul>
      <div className="socialmedia">
        <Link><img src={require('../images/icons8-facebook-nouveau-96.png')} alt="" /></Link>
        <Link><img src={require('../images/icons8-instagram-96.png')} alt="" /></Link>
        <Link><img src={require('../images/icons8-twitter-entouré-96.png')} alt="" /></Link>
      </div>
      <div className='copyright'>Copyright © 2023 | Brikoul</div>
    </div>
  )
}

export default Footer