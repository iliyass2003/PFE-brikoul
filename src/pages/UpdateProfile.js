import React, {useState, useEffect} from 'react'
import { doc,  getDoc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { async } from '@firebase/util'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const initialState = {
  phonenumber: "",
  bio: ""
}

const UpdateProfile = ({user}) => {
  const [form, setForm] = useState(initialState)
  const {phonenumber, bio} = form
  const navigate = useNavigate()
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    user.uid && getUserInfos();
  }, [user.uid]);

  const getUserInfos = async () => {
    const docRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await updateDoc(doc(db, "users", user.uid), {
        ...form,
      });
      toast.success("Profil mis à jour avec succès");
      navigate("/profile")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="updateprofile">
      <form onSubmit={handleSubmit}>
        <input minLength={10} required maxLength={10} type="text" name='phonenumber' value={form.phonenumber} onChange={handleChange} />
        <textarea required placeholder='Décrivez-vous en moins de 150 caractères' maxLength={150} name="bio" id="" cols="30" rows="10" value={form.bio} onChange={handleChange}></textarea>
        <button type='submit'>Modifier</button>
      </form>
    </div>
  )
}

export default UpdateProfile