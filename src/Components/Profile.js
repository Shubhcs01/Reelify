import React, { useState, useEffect } from 'react'
import NavBar from './Navbar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Components/Profile.css'
import profilePic from '../Components/profile-pic.webp';
import { useParams } from 'react-router-dom';
import { database } from '../firebase';
import { CircularProgress } from '@mui/material';


function Profile() {

    //get id from url
    const { id } = useParams();

    //state for user data
    const [userData, setUserData] = useState({});
    const [postData, setPostData] = useState({});

    //side effect for userData (relies on id) (callback function called after component renders)
    //runs only once
    //runs when id changes
    useEffect(() => {
        //get user data from firebase
        database.users.doc(id).onSnapshot(doc => {
            console.log(doc.data()); //{userData}
            //set user data
            setUserData(doc.data());
        });
    }, [id])



    return (
        <>
            {userData == null || postData == null ? <CircularProgress /> :
                //else
                <>
                <NavBar theme={'light'}/>
                <div className='profile'>
                    <div className='profile-info'>
                        <img className='profile-pic' src={profilePic}></img>
                        <p style={{fontFamily: "cursive"}}> Name: <span style={{ fontWeight: "bold" }}>{userData.fullName}</span></p>
                        <p style={{fontFamily: "cursive"}}> Email: <span style={{ fontWeight: "bold" }}>{userData.email}</span></p>
                        <hr></hr>
                        <p style={{ fontFamily: "cursive" }}>Posts {userData.postIds ? userData.postIds.length : 0} &nbsp;&nbsp;&nbsp;  Follower 0 &nbsp;&nbsp;&nbsp;  Following 0</p>
                        <hr/>
                    </div>
                </div>
                </>
            }
        </>
    )
}

export default Profile