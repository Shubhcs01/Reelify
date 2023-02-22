import React,{useState,useEffect} from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { database } from '../firebase';

function Like({userData, postData}) {

    const [like,setLike] = useState(null);

    useEffect(()=>{
        let isLiked = postData.likes.includes(userData.userId)? true:false;
        setLike(isLiked);
    },[postData])

    const handelClick = () => {
        console.log("heart clicked!");
        if(like){
            //unlike
            //remove userId from likes[]
            let narr = postData.likes.filter((item)=>{
                return item !== userData.userId
            });
            //update db
            database.posts.doc(postData.docId).update({
                likes:narr
            });

        } else {
            //like
            //add userId to likes[]
            let narr = [...postData.likes,userData.userId ];
            //update db
            database.posts.doc(postData.docId).update({
                likes:narr
            });
        }
    }


  return (
    <div>
        {
            like != null?
            <>
            {
                like? <FavoriteIcon className='icon-styling like' onClick={handelClick}/>:<FavoriteIcon onClick={handelClick} className='icon-styling unlike'/>
            }
            </>
            :
            <>

            </>
        }
    </div>
  )
}

export default Like