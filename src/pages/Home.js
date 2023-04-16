import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Projects from "../components/Projects";
import Spinner from "../components/Spinner";
import { async } from "@firebase/util";
import { toast } from "react-toastify";

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
        setLoading(false)
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      unsub();
    };
  }, []);
  if(loading){
    return <Spinner/>
  }
  const handleDelete = async (id) => {
    if(window.confirm("Are you sure you want to delete the project ?")){
      try{
        setLoading(true)
        await deleteDoc(doc(db, "projects", id))
        toast.success("Blog deleted successfully");
        setLoading(false)
      }catch(err){
        console.log(err)
      }
    }
  }
  return (
    <div>
      <div style={{margin: "20px", fontSize: "1.5rem"}}>Daily Projects</div>
      {blogs?.map((blog) => (
        <Projects key={blog.id} user={user} {...blog} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default Home;
