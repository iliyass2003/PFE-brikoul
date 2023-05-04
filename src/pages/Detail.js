import React, { useState, useEffect } from "react";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import "../style/Detail.css";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";
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

const Detail = ({user}) => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer le projet ?")) {
      try {
        await deleteDoc(doc(db, "projects", id));
        toast.success("Projet supprimé avec succès");
        navigate('/')
      } catch (err) {
        console.log(err);
      }
    }
  };

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
          <FacebookIcon size={35} round={true} />
        </FacebookShareButton>
        <TwitterShareButton url={url} windowWidth={600} windowHeight={600}>
          <TwitterIcon size={35} round={true} />
        </TwitterShareButton>
        <WhatsappShareButton url={url} windowWidth={600} windowHeight={600}>
          <WhatsappIcon size={35} round={true} />
        </WhatsappShareButton>
        <LinkedinShareButton url={url} windowWidth={600} windowHeight={600}>
          <LinkedinIcon size={35} round={true} />
        </LinkedinShareButton>
        {user?.uid === project?.userId  ? (
          <div className="editdelete">
            <Link to={`/update/${id}`}>
            <i
              className="fa-solid fa-pen-to-square"
              style={{
                color: "#005cfa",
                cursor: "pointer",
                fontSize: "1.8rem",
              }}
            ></i>
            </Link>
            <i
              className="fa-solid fa-trash"
              style={{
                color: "#ff0000",
                cursor: "pointer",
                fontSize: "1.8rem",
              }}
              onClick={() => handleDelete(id)}
            ></i>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Detail;
