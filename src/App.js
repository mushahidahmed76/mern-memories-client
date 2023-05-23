import React from "react";
import { BrowserRouter, Switch,Route,Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";
import { GoogleOAuthProvider } from '@react-oauth/google';
const App = () => {
  const user = localStorage.getItem('profile');
    return(
      <GoogleOAuthProvider clientId="891910005572-pvjmaf89c8iggstia538m5nicptcgcne.apps.googleusercontent.com">
      <BrowserRouter>
         <Container maxWidth="xl">
            <NavBar />
            <Switch>
            <Route path="/" exact component={()=> <Redirect to="/posts" />} />
            <Route path="/posts" exact component={Home} />
            <Route path="/posts/search" exact component={Home} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/auth" exact component={() => (!user?<Auth/>:<Redirect to='/posts' />)} />
            </Switch>
       </Container>
      </BrowserRouter>
      </GoogleOAuthProvider>
    );
}

export default App;