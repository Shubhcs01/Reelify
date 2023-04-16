import React, {useContext,useState} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Signup.css';
import { Link } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import AuthContext from '../AuthContext';
import { useHistory } from "react-router-dom";
import { database, storage } from '../firebase';
import Input from '@mui/material/Input';
import logoDark from '../Assets/logoDark.png'


export default function Signup() {
    
    //useStyles -> For changing styles of Material-UI (MUI)
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        card2: {
            height: '10vh',
            marginTop: '2%'
        },
        abc: {
            height: '8vh'
        },
        btn: {
            right: '0%'
        }
    })
    const classes = useStyles();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [error,setError] = useState('');

    const store = useContext(AuthContext); //store -> obj in Apps.js
    let history = useHistory();
    // console.log(store);

    const handleClick = async() => {

        if(email==='' || name==='' || password===''){
            setError('Fields should not be empty !');
            setTimeout(()=>{
                setError('');
            },2000);
            return;
        } 
        if(password.length < 6){
            setError('Length of password must be atleast 6 !');
            setTimeout(()=>{
                setError('');
            },2000);
            return;
        }

        setError('');
        const userObj = await store.signup(email,password);
        console.log(userObj);
        const uid = userObj.user.uid;
        console.log("Signup success" + uid);

        // if(uid !== undefined){
        //     history.push("/feed");
        // }

        console.log(database.users.doc(uid));

        await database.users.doc(uid).set({
            email: email,
            userId: uid,
            fullName: name,
            createdAt: database.getTimeStamp()
        });

        history.push("/feed");
    }

    return (
        <div className='signupWrapper'>

            <div className='signupCard'>
                <Card variant='outlined'>
                <div className='insta-logo'>
                        <img src={logoDark} />
                    </div>
                    <CardContent>

                        <Typography className={classes.text1} variant="subtitle1">
                            Sign up to see photos and videos from your friends.
                        </Typography>

                        {error!=='' && <Alert severity="error">{error}</Alert>}
                        
                        <Input className={classes.abc} type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <Input className={classes.abc} type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="  Email" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        {/* <TextField id="outlined-basic" label="Username" variant="outlined" fullWidth={true} margin='dense' size='small' /> */}
                        <Input className={classes.abc} type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin='dense' size='small' />

                        {/* <Button color='secondary' fullWidth={true} margin='dense' variant="outlined" startIcon={<CloudUploadIcon />} component='label'>
                            Upload Profile Image
                            <input type='file' accept='image/*' hidden />
                        </Button> */}

                    </CardContent>
                    <CardActions>
                        <Button className={classes.btn} onClick={handleClick} size="small" variant="contained" fullWidth={true} color='primary'>Sign up</Button>
                    </CardActions>
                    <CardContent>
                        {/* <Typography variant="subtitle2" className={classes.text1}>
                            { Welcome To Reelify }
                        </Typography> */}
                    </CardContent>
                </Card>
                <Card variant='outlined' className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle1" color='black' textAlign='center'>
                            Have an account ? <Link to='/login' style={{ textDecoration: 'none' }}>Login</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    );
}
