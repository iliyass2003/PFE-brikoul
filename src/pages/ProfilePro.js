import React, {useContext, useState, useEffect} from 'react'
import { ChatContext } from '../context/ChatContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import "../style/Profile.css";
import { useParams } from 'react-router-dom';

const ProfilePro = () => {
  const { data } = useContext(ChatContext);
  const [infos, setInfos] = useState(null);
  const { id } = useParams()
  useEffect(() => {
    id && getUserInfos();
  }, [id]);
  const getUserInfos = async () => {
    const docRef = doc(db, "users", id);
    const userInfos = await getDoc(docRef);
    setInfos(userInfos.data());
  };
  return (
    <div className="profile">
      <div className="profile-infos">
        <img src={infos?.photoURL} alt="Avatar" />
        <div className="displayname info">
          {infos?.username}
          <img src={require("../images/morocco.png")} />
        </div>
        <div>
          <div className="email info">
            <i class="fa-solid fa-envelope"></i>
            {infos?.email}
          </div>
          <div className="number info">
            <i class="fa-solid fa-phone"></i>
            {infos?.phonenumber ? (
              infos?.phonenumber
            ) : (
              <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
                Pas de numéro de téléphone
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="right">
        <div className="bio">
          <span className="bioheader">Bio</span>
          {infos?.bio ? (
            infos?.bio
          ) : (
            <p style={{ color: "rgb(187, 187, 187)", fontSize: "1rem" }}>
              Pas de bio
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
                Pas de compétences à afficher
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
                Pas de catégorie à afficher
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProfilePro