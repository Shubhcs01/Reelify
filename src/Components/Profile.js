import React from 'react'
import NavBar from './Navbar'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import '../Components/Profile.css'
import profilePic from '../Components/profile-pic.webp';


function Profile() {
  return (
    <>
    <NavBar/>
    <div className='profile'>
        <div className='profile-info'>
            <img className='profile-pic' src={profilePic}></img>
            <h2 style={{fontFamily:"cursive"}}>Profile Name</h2>
            <p style={{fontFamily:"cursive"}}>Posts 1 &nbsp;&nbsp;&nbsp;  Follower 10K &nbsp;&nbsp;&nbsp;  Following 0</p>
        </div>
    </div>
    </>
  )
}

export default Profile