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
  console.log(user);

  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data())
    })
    return () => {unsub()}
  },[user])

  return (
    <div className="feed">
      <div className="comp" style={{ width: "50%" }}>
        <h1>Welcome to ApnaReels App</h1>
        <Button variant="outlined" color="primary" onClick={logout}>
          Logout
        </Button>
      </div>
      <UploadFile user={userData} />
      <Posts userData={userData}/>
      {/* <Video/> */}
    </div>
  );
}

export default Feed;
