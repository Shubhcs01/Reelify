import React, { useContext, useState, useEffect } from "react";
import "../Components/Feed.css";
import Video from "./video";
import Navbar from "./Navbar";
import AuthContext from "../AuthContext";
import { Button } from "@mui/material";
import UploadFile from "./UploadFile";
import { database } from "../firebase";
import Posts from "./Posts";

function Feed() {
  
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState('');
  console.log(userData);

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => {unsub()}
  },[user])

  return (
    <div className="feed">
      <Navbar userData={userData}/>
      <UploadFile user={userData} />
      <Posts userData={userData}/>
    </div>
  );
}

export default Feed;
