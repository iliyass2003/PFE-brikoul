import React, { useState, useEffect } from "react";
import "../style/Header.css";
import { Link } from "react-router-dom";

const Header = ({ user, handleLogout, infos }) => {
  const userId = user?.uid;
  return (
    <nav>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        <h1>
          Brikoul<span>.com</span>
        </h1>
      </Link>
      <ul>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <li>Accueil</li>
        </Link>
        {infos?.type === "client" ? (
          <Link to={"/create"} style={{ textDecoration: "none" }}>
            <li>Publier un projet</li>
          </Link>
        ) : null}
        <Link to={"/contact"} style={{ textDecoration: "none" }}>
          <li>Contact</li>
        </Link>
        {userId ? (
          <>
            {user?.photoURL ? (
              <Link to={"/profile"}>
                <li className="image">
                  <img src={user?.photoURL} alt="" />
                </li>
              </Link>
            ) : (
              <Link to={"/profile"} style={{ textDecoration: "none" }}>
                <li style={{ fontWeight: "bold" }}>{user?.displayName}</li>
              </Link>
            )}
            <li onClick={handleLogout} style={{ cursor: "pointer" }}>
              Déconnexion
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
