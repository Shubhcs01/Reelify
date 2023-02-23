import React from 'react';
import { database, storage } from '../firebase';
import { Button } from '@mui/material'
import {v4 as uuidv4} from 'uuid';

function UploadFile(props) {
    console.log(props);
    const handleChange = async(file) => {

        if(file){
            console.log(file)
            let uid = uuidv4()

            const uploadTask = storage.ref(`/posts/${uid}/${file.name}`).put(file);
            uploadTask.on('state_changed', fn1, fn2, fn3); // Attached EventListener
    
            //Progress
            function fn1(snapshot) {
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(`upload is ${progress} done`);
            }
    
            //Error
            function fn2(error) {
                //TODO: setError msg from mui
                console.log('error ->', error);
            }
    
            //Success
            function fn3() {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    
                    let postObj = {
                        likes:[], //-> stores all userId of users who likes the given post
                        comments:[],
                        postId: uid,
                        postUrl: url,
                        userName: props.user.fullName,
                        userId: props.user.userId,
                        createdAt: database.getTimeStamp(),
                    }

                    database.posts.add(postObj).then(async(ref)=>{
                        let res = await database.users.doc(props.user.userId).update({
                            postIds: props.user.postIds != null? [...props.user.postIds, ref.id] : [ref.id]
                        })
                        console.log(res);
                    })
                })
            }
        }
        //TODO: setError msg from mui if file not found
    }


  return (
    <div>
        <input onChange={(e)=>handleChange(e.target.files[0])} type="file" accept='video/*' id='upload-input' style={{display:'none'}} />
        <label htmlFor='upload-input'>
            <Button
                variant='contained'
                color='secondary'
                component="span"
                style={{marginBottom:"1rem"}}
            >
                Upload Video
            </Button>
        </label>

    </div>
  )
}

export default UploadFile