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
        {userId ? (
          <>
            <li style={{fontWeight: "bold"}}>{user?.displayName}</li>
            <li onClick={handleLogout} style={{cursor: "pointer"}}>Logout</li>
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
