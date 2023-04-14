import React, { useEffect } from "react";
import FontAwesome from "react-fontawesome";
import { Link } from "react-router-dom";
import { excerpt } from "../utility";
import "../style/Projects.css"

const Projects = ({
  id,
  title,
  description,
  category,
  imgUrl,
  userId,
  author,
  timestamp,
  user,
  handleDelete,
}) => {
  return (
    <div className="dailyprojects" key={id}>
      <div className="project">
        <img src={imgUrl} alt={title} />
        <div className="project-info">
          <div className="category">{category}</div>
          <div className="title">{title}</div>
          <div>
            <span  className="author">{author}</span> -&nbsp;
            <span className="projecttime">
              {timestamp.toDate().toDateString()}
            </span>
          </div>
          <div className="description">{excerpt(description, 120)}</div>
          <Link to={`/detail/${id}`}>
            <button className="read-more">Read More</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
