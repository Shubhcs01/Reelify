import { Avatar, CircularProgress } from '@mui/material';
import React,{useEffect,useState} from 'react'
import { database } from "../firebase";
import Video from './video';
import { deepOrange, deepPurple } from '@mui/material/colors';
import Like from './Like';
import CommentIcon from '@mui/icons-material/Comment';
import CommentModal from './CommentModal';
import "../Components/Feed.css";
import VolumeOffIcon from '@mui/icons-material/VolumeOff';

function Posts({userData}) {

    const[posts,setPosts] = useState(null);
    const[open,setOpen] = useState(null);
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

    //Intersection observor api
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            console.log(entry);
            let elem = entry.target.childNodes[0];
            console.log(elem);
            //play()->async function, return promise
            elem.play().then(()=>{
                if(!elem.paused && !entry.isIntersecting){
                    elem.pause();
                }
            })
        });
      }, { threshold: 0.6 });

      
    useEffect(() => {
        const elements = document.querySelectorAll(".videos");
        elements.forEach((elem)=>{
            observer.observe(elem);
        })
        //cleanup (remove previous eventListener)
        return()=>{
            observer.disconnect();
        }
    },[posts])

    const handleModal = (id) => {
        setModal(!modal);
        if(modal){
            setOpen(id);
        } else {
            setOpen(null);
        }
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
                                <h4>{post.userName}</h4>
                            </div>
                            <Like userData={userData} postData={post}/>
                            <CommentIcon onClick={()=>handleModal(post.postId)} className='icon-styling comment-icon'/>
                            {
                                modal? <CommentModal open={open} userData={userData} post={post}/>:<div></div>
                            }
                        </div>
                    ))
                }
            </div>
        }
    </div>
  )
}

export default Posts