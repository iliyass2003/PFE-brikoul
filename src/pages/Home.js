import { collection, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Projects from "../components/Projects";

const Home = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "projects"),
      (snapchot) => {
        let list = [];
        snapchot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(list);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  console.log(blogs);
  return (
    <div>
      <div style={{margin: "20px", fontSize: "1.5rem"}}>Daily Projects</div>
      {blogs?.map((blog) => (
        <Projects key={blog.id} user={user} {...blog} />
      ))}
    </div>
  );
};

export default Home;
