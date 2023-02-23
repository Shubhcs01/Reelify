import { Button, TextField } from "@mui/material";
import React,{useEffect,useState} from 'react';
import { database } from '../firebase';

function CommentModal(props) {

  // console.log(props.post.comments);

  const[msg,setMsg] = useState('');

  if (props.open !== props.post.postId) return;

  const handelComment = () => {
    let obj = {
      message: msg,
      userId: props.userData.userId,
      userName: props.userData.fullName,
    }
    props.post.comments.push(obj);
    setMsg('');
    let narr = props.post.comments;
    //update db
    database.posts.doc(props.post.docId).update({
        comments:narr
    });

  }

  return (
    <div className="comment-modal">
        <div className="comments">
          {
            /* Load all comments */
            props.post.comments.map((obj) => (
              <p style={{padding:"10px",margin:0}}><strong><em>{obj.userName}</em></strong> : {obj.message}</p>
            ))
          }
        </div>
        <input value={msg} onChange={(e)=>setMsg(e.target.value)}  type="text" placeholder="    Write comment..."/>
        <button onClick={handelComment}>Post</button>
     </div>
  );
}

export default CommentModal;
