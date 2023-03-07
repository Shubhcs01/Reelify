import React,{useContext} from 'react'
import {useHistory, Redirect, Route} from 'react-router-dom';
import AuthContext from '../AuthContext';

function PrivateRoute({component:Component,...rest}) {

    const history = useHistory();
    const {user} = useContext(AuthContext)

    return (
        <Route {...rest} render={props=>{
            return user? <Component {...props}/> : history.push('login')
        }}/>
    )
}

export default PrivateRoute;