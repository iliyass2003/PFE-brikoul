import React, { useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import "../style/Projects.css";

const Projects = ({
  id,
  title,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
  text
}) => {
  // userId = user?.uid;  
function stripHTML(myString) {
  let el = document.createElement("div");
  el.innerHTML = myString;
  return el.textContent || el.innerText || "";
}
  return (
    <div className="dailyprojects" key={id}>
      <div className="project">
        <img src={imgUrl} alt={title} />
        <div className="project-info">
          <div className="category">{category}</div>
          <div className="title">{title}</div>
          <div>
            <span className="author">{author}</span> &nbsp;
            <span className="projecttime">
            <i className="fa-solid fa-clock" style={{fontSize: ".7rem"}}></i> &nbsp;
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="description" dangerouslySetInnerHTML={{__html: stripHTML(excerpt(text, 120))}}></div>
          <div className="buttons">
            <Link to={`/detail/${id}`}>
              <button className="read-more">Lire plus</button>
            </Link>
              <div>
                <i
                  className="fa-solid fa-pen-to-square"
                  style={{
                    color: "#005cfa",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                ></i>
                <i
                  className="fa-solid fa-trash"
                  style={{
                    color: "#ff0000",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                  onClick={() => handleDelete(id)}
                ></i>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
