import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css';
import logo from '../Assets/Instagram.png';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import { makeStyles } from '@mui/styles';
import Alert from '@mui/material/Alert';
import logo4 from '../Assets/logo4.png'
import { CarouselProvider, Slider, Slide, Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useContext, useState } from 'react';
import { useHistory } from "react-router-dom";
import AuthContext from '../AuthContext';
import Input from '@mui/material/Input';

function Login() {

    //useStyles -> For changing styles of Material-UI(MUI)
    const useStyles = makeStyles({
        text1: {
            color: 'grey',
            textAlign: 'center'
        },
        text2: {
            textAlign: 'center',
            color: 'black'
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
    const [error,setError] = useState('');

    const store = useContext(AuthContext); //store -> obj in Apps.js
    let history = useHistory();
    // console.log(store);

    const emailRegex = 
    new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/, "gm");
   
    const handleClick = async() => {
        if(email==='' || password===''){
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

        if(!emailRegex.test(email)){
            setError('Email was Incorrect');
            return;
        } else {
            setError('');
            const userObj = await store.login(email,password);
            const uid = userObj.user.uid;
            console.log("Logged In success" + uid);
            if(uid !== undefined){
                history.push("/feed");
            } else {
                alert("wrong Credential");
            }
        }

        
    }

    return (
        <div className='loginWrapper'>

            <div className='loginCard'>
                <Card variant='outlined'>

                    <div className='insta-logo'>
                        <img src={logo4} />
                    </div>

                    <CardContent>

                        {error!=='' && <Alert severity="error">{error}</Alert>}
                        
                        <Input type='text' className={classes.abc} value={email} onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" placeholder="Email" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        <Input type='password' className={classes.abc} value={password} onChange={(e)=>setPassword(e.target.value)} id="outlined-basic" placeholder="Password" variant="outlined" fullWidth={true} margin='dense' size='small' />
                        {/* <TextField id="standard-basic" label="Standard" /> */}
                    
                    </CardContent>

                    <CardActions>
                        <Button className={classes.btn} onClick={handleClick} size="small" variant="contained" fullWidth={true} color='primary'>Log In</Button>
                    </CardActions>
                    <CardContent>
                        <Typography variant="subtitle2" className={classes.text1}>
                            Email: tester@mail.com <br></br>
                            password: test12345
                        </Typography>
                    </CardContent>
                </Card>
                <Card variant='outlined' className={classes.card2}>
                    <CardContent>
                        <Typography variant="subtitle1" className={classes.text2}>
                            Don't have an account ? <Link to='/signup' style={{ textDecoration: 'none' }}>Sign up</Link>
                        </Typography>
                    </CardContent>
                </Card>
            </div>
            
        </div>
    )
}

export default Login;
