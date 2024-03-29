import React from "react";
import Feed from "./Components/Feed";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { auth } from "./firebase";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";
import PrivateRoute from "./Components/PrivateRoute";
import { useHistory } from "react-router-dom";
import Profile from "./Components/Profile";

function App() {
  const [user, setUser] = useState('');
  let history = useHistory();
  // const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  async function logout() {
    // history.push("/login");
    await auth.signOut();
    
  }

  useEffect(() => {
    let unsub = auth.onAuthStateChanged((user) => setUser(user))
    return () => {
      unsub(); //Clean Up
    }
  },[])

  const store = {
    user,
    signup,
    login,
    logout,
  };

  return (
    <div>
      <BrowserRouter >
        <Switch >
          <AuthContext.Provider value={store}>
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/feed" component={Feed} />
            <PrivateRoute path="/profile/:id" component={Profile} />
            <PrivateRoute path="/" exact component={Login} />
          </AuthContext.Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
