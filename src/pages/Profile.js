import React, {useState, useEffect} from 'react'
import "../style/Profile.css"
import { storage } from '../firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { toast } from 'react-toastify';
import { updateProfile } from 'firebase/auth';

const Profile = ({user}) => {
  const [photoURL, setPhotoURL] = useState('https://img.icons8.com/?size=512&id=7Ffvtg1xmgaV&format=png')
  const [photo, setPhoto] = useState(null)
  const [loading, setLoading] = useState(false)
  function handleClick(){
    upload(photo, user, setLoading)
  }
  function handleChange(e){
    if(e.target.files[0]){
      setPhoto(e.target.files[0])
    }
  }
  useEffect(() => {
    if(user && user.photoURL){
      setPhotoURL(user.photoURL)
    }
  },[user])

  async function upload(file, user, setLoading){
    const fileRef = ref(storage, user.uid + '.png')
    setLoading(true)
    const snapchot = await uploadBytes(fileRef, file)
    const photoURL = await getDownloadURL(fileRef)
    updateProfile(user, {photoURL})
    setLoading(false)
    toast.success("Image bien telecharge")
  }
  return (
    <div className='profile'>
      <img src={photoURL} alt="Avatar" />
      <input type="file" onChange={handleChange}/>
      <button disabled={loading || !photo} onClick={handleClick}>Modifier</button>
    </div>
  )
}

export default Profile