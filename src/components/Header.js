import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
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
        <Link to={"/signup"} style={{ textDecoration: "none" }}>
          <li>S'inscrire</li>
        </Link>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <li>Connexion</li>
        </Link>
      </ul>
    </nav>
  );
};

export default Header;
