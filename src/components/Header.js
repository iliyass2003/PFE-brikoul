import React from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";

const Header = ({ user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <nav>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h1>
          Brikoul<span>.com</span>
        </h1>
      </Link>
      <ul>
        <Link to={"/create"} style={{ textDecoration: "none" }}>
          <li>Publier un projet</li>
        </Link>
        <Link to={"/commentcamarche"} style={{ textDecoration: "none" }}>
          <li>Comment Ça Marche</li>
        </Link>
        <Link to={"/contact"} style={{ textDecoration: "none" }}>
          <li>Contact</li>
        </Link>
        {userId ? (
          <>
            {user?.photoURL ? (
              <Link to={'/profile'} >
              <li className="image"><img src={user?.photoURL} alt="" /></li>
              </Link>
            ) : (
              <Link to={'/profile'} style={{textDecoration: "none"}}>
                <li style={{fontWeight: "bold"}}>{(user?.displayName).toUpperCase()}</li>
              </Link>
            )}
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Logout
            </li>
          </>
        ) : (
          <>
            <Link to={"/signup"} style={{ textDecoration: "none" }}>
              <li>S'inscrire</li>
            </Link>
            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <li>Connexion</li>
            </Link>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
