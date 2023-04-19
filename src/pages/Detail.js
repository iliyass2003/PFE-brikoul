import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import "../style/Detail.css";
import Spinner from "../components/Spinner";


const Detail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    id && getProjectDetail();
  }, [id]);

  const getProjectDetail = async () => {
    const docRef = doc(db, "projects", id);
    const projectDetail = await getDoc(docRef);
    setProject(projectDetail.data());
    setLoading(false)
  };

  if(loading){
    return <Spinner/>
  }

  return (
    <div className="project-detail">
      <div className="title">{project?.title}</div>
      <div className="infos">
        <div className="category">{project?.category}</div>
        <div>
          <span className="author">{project?.author}</span> {" "}
          <i className="fa-solid fa-clock" style={{fontSize: ".7rem"}}></i>&nbsp;
          {project?.timestamp.toDate().toDateString()}
        </div>
      </div>
      <img src={project?.imgUrl} alt={project?.title} />
      <div  dangerouslySetInnerHTML={{__html: project?.text}} className="description"></div>
    </div>
  );
};

export default Detail;
