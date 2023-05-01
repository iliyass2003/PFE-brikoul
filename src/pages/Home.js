import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Projects from "../components/Projects";
import Spinner from "../components/Spinner";
import { async } from "@firebase/util";
import { toast } from "react-toastify";
import "../style/Projects.css";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import "firebase/firestore";
import "../style/Home.css";

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
    <div className="home">
      <input
        type="text"
        placeholder="Chercher..."
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
  );
};

export default Home;
