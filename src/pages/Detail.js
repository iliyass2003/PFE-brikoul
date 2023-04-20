import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import "../style/Detail.css";
import Spinner from "../components/Spinner";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LineIcon,
  LinkedinIcon,
} from "react-share";

const Detail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    id && getProjectDetail();
  }, [id]);

  const getProjectDetail = async () => {
    const docRef = doc(db, "projects", id);
    const projectDetail = await getDoc(docRef);
    setProject(projectDetail.data());
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  }

  const url = window.location.href

  return (
    <div className="detail">
      <div className="project-detail">
        <div className="title">{project?.title}</div>
        <div className="infos">
          <div className="category">{project?.category}</div>
          <div>
            <span className="author">{project?.author}</span>{" "}
            <i
              className="fa-solid fa-clock"
              style={{ fontSize: ".7rem", color: "rgb(0, 110, 255)" }}
            ></i>
            &nbsp;
            {project?.timestamp.toDate().toDateString()}
          </div>
        </div>
        <img src={project?.imgUrl} alt={project?.title} />
        <div
          dangerouslySetInnerHTML={{ __html: project?.text }}
          className="description"
        ></div>
      </div>
      <div className="socialmedia">
        <FacebookShareButton url={url} windowWidth={600} windowHeight={600}>
          <FacebookIcon size={40} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={url} windowWidth={600} windowHeight={600}>
          <TwitterIcon size={40} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} windowWidth={600} windowHeight={600}>
          <WhatsappIcon size={40} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={url} windowWidth={600} windowHeight={600}>
          <LinkedinIcon size={40} round={true} />
        </LinkedinShareButton>
      </div>
    </div>
  );
};

export default Detail;
