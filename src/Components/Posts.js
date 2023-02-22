import { Avatar, CircularProgress } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { database } from "../firebase";
import Video from './video';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import CommentModal from './CommentModal';
import "../Components/Feed.css";

function Posts({userData}) {

    const[posts,setPosts] = useState(null);
    const[modal,setModal] = useState(false);

    useEffect(() => {
        let unsub = database.posts.orderBy('createdAt','desc').onSnapshot((snapshot)=>{
            let postArr = [] //containing obj of posts
            snapshot.forEach(doc => {
                let data = {...doc.data(),docId:doc.id} //->obj
                postArr.push(data);
            })
            setPosts(postArr);
        })
        return unsub;
    },[])

    const handleModal = () => {
        setModal(!modal);
    }

  return (
    <div>
        {
            posts == null? <CircularProgress/> : 
            <div className='video-container'>
                {
                    posts.map((post,idx) => (
                        <div className='videos' key={idx}>
                            <Video src={post.postUrl}/>
                            <div className='fa' style={{display:'flex'}}>
                                <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
                                <h4>{userData.fullName}</h4>
                            </div>
                            <Like userData={userData} postData={post}/>
                            <CommentIcon onClick={handleModal} className='icon-styling comment-icon'/>
                            {/* <CommentModal modal={modal}/> */}
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Posts