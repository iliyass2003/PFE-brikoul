import React, { useEffect, useState } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility/index";
import "../style/Projects.css";

const Projects = ({
  id,
  title,
  category,
  imgUrl,
  userId,
  author,
  ville,
  timestamp,
  user,
  handleDelete,
  text,
}) => {
  function stripHTML(myString) {
    let el = document.createElement("div");
    el.innerHTML = myString;
    return el.textContent || el.innerText || "";
  }
  return (
    <div className="project" key={id}>
      <div className="project-info">
        <div className="project-header">
          <div className="category">{category}</div>
          <span className="time">
            <i
              className="fa-solid fa-clock"
              style={{ fontSize: ".7rem", color: "rgb(0, 110, 255)" }}
            ></i>{" "}
            &nbsp;
            {timestamp.toDate().toDateString()}
          </span>
        </div>
        <div className="authorville">
          <span className="author">{author}</span> &nbsp;
          <span className="ville">{ville}</span>
        </div>
        <div
          className="description"
          dangerouslySetInnerHTML={{ __html: stripHTML(excerpt(text, 100)) }}
        ></div>
        <Link to={`/detail/${id}`}>
          <button className="read-more">Lire plus</button>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
