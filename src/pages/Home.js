import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Projects from "../components/Projects";
import Spinner from "../components/Spinner";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import "../style/Projects.css";
import { useParams, Link } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "../style/Home.css";
import UpToTopButton from "../components/UpToTopButton";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snapchot) => {
        let list = [];
        snapchot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  const filteredBlogPosts = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(search.toLowerCase()) ||
      // blog.tags.includes(search.toLowerCase())
      blog.tags
        .map((tag) => tag.toLowerCase())
        .includes(search.toLocaleLowerCase())
  );

  function stripHTML(myString) {
    let el = document.createElement("div");
    el.innerHTML = myString;
    return el.textContent || el.innerText || "";
  }

  if (loading) {
    return <Spinner />;
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete the project ?")) {
      try {
        setLoading(true);
        await deleteDoc(doc(db, "projects", id));
        toast.success("Blog deleted successfully");
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className="home">
        <div className="start">
          <div className="infos">
            <p className="firstp">
              Bienvenue chez <span>Brikoul. </span>
              Trouvez un professionnel de confiance pour vos travaux.
            </p>
            <p className="secondp">
              Avec nos services d'installation, de travaux et de réparation,
              nous mettons chaque jour notre énergie au service d’un habitat
              durable.
            </p>
            <button>
              <Link
                to={"/create"}
                style={{ textDecoration: "none", color: "white" }}
              >
                Commencer
              </Link>
            </button>
          </div>
          <img src={require("../images/pexels-ketut-subiyanto-4246109.jpg")} />
        </div>
        <div className="commentcamarche">
          <h1>Comment ça marche</h1>
          <div className="etapes">
            <div className="etape">
              <div className="etapeheader">
                <img src={require("../images/project-management.png")} alt="" />
                <p>Publiez votre projet</p>
              </div>
              <p className="etapedescription">
                Décrivez votre projet en quelques clics et sélectionnez
                vous-même les professionnels avec qui vous souhaitez être mis en
                relation.
              </p>
            </div>
            <div className="etape">
              <div className="etapeheader">
                <img src={require("../images/e-mail.png")} alt="" />
                <p>Les professionnels vous répondent</p>
              </div>
              <p className="etapedescription">
                Les professionnels intéressés vous contactent par email.
              </p>
            </div>
            <div className="etape">
              <div className="etapeheader">
                <img src={require("../images/confiance.png")} alt="" />
                <p>Choisissez les professionnels</p>
              </div>
              <p className="etapedescription">
                Consultez les profils des professionnels et sélectionnez ceux
                que vous souhaitez rencontrer.
              </p>
            </div>
          </div>
        </div>
        <input
          type="text"
          placeholder="Chercher par titre ou tags..."
          onChange={handleChange}
          className="search"
        />
        <div className="dailyprojects">
          {filteredBlogPosts?.map((blog) => (
            <Projects
              key={blog.id}
              user={user}
              {...blog}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      </div>
      <UpToTopButton/>
    </>
  );
};

export default Home;
