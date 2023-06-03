import React, { useState, useEffect } from "react";
import "../style/Profile.css";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { toast } from "react-toastify";
import { updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { updateDoc } from "firebase/firestore";
import {
  doc,
  getDoc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
import { Link } from "react-router-dom";

const Profile = ({ user }) => {
  const [photoURL, setPhotoURL] = useState(
    "https://img.icons8.com/?size=512&id=7Ffvtg1xmgaV&format=png"
  );
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState(null);

  useEffect(() => {
    user.uid && getUserInfos();
  }, [user.uid]);
  const getUserInfos = async () => {
    const docRef = doc(db, "users", user.uid);
    const userInfos = await getDoc(docRef);
    setInfos(userInfos.data());
  };
  function handleClick() {
    upload(photo, user, setLoading);
  }
  function handleChange(e) {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  }
  useEffect(() => {
    if (user && user.photoURL) {
      setPhotoURL(user.photoURL);
    }
  }, [user]);

  async function upload(file, user, setLoading) {
    const fileRef = ref(storage, user.uid + ".png");
    setLoading(true);
    const snapchot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(user, { photoURL });
    await updateDoc(doc(db, "users", user.uid), {
      photoURL
    });
    setLoading(false);
    toast.success("Changement d'image réussi");
    window.location.reload();
  }

  return (
    <div className="profile">
      <div className="profile-infos">
        <img src={photoURL} alt="Avatar" />
        <div className="change-photo">
          <input type="file" onChange={handleChange} />
          <button disabled={loading || !photo} onClick={handleClick}>
            Modifier
          </button>
        </div>
        <div className="displayname info">
          {user.displayName}
          <img src={require("../images/morocco.png")} />
        </div>
        <div>
          <div className="email info">
            <i class="fa-solid fa-envelope"></i>
            {user.email}
          </div>
          <div className="number info">
            <i class="fa-solid fa-phone"></i>
            {infos?.phonenumber ? (
              infos?.phonenumber
            ) : (
              <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
                Modifier votre numéro de téléphone
              </p>
            )}
          </div>
        </div>
        <Link to={"/profile/update"}>
          <button>Modifier le profil</button>
        </Link>
      </div>
      <div className="right">
        <div className="bio">
          <span className="bioheader">Bio</span>
          {infos?.bio ? (
            infos?.bio
          ) : (
            <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
              Modifier votre description
            </p>
          )}
        </div>
        {infos?.type === "professionnel" ? (
          <div className="skills">
            <div className="skillsheader">Skills</div>
            {infos?.tags.length > 0 ? (
              <>
                {(infos?.tags).map((tag) => (
                  <span>{tag}</span>
                ))}
              </>
            ) : (
              <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
                Ajouter de nouvelles compétences à votre profil
              </p>
            )}
          </div>
        ) : null}
        {infos?.type === "professionnel" ? (
          <div className="bio">
            <span className="bioheader">Catégorie de travail</span>
            {infos?.category ? (
              infos?.category
            ) : (
              <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
                Modifier votre catégorie de travail
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Profile;
