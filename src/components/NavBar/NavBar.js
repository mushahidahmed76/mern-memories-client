import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core';
import useStyles from './Styles';
import memoriesLogo from "../../images/memories-Logo.png";
import memoriesText from "../../images/memories-Text.png";
import { useDispatch } from 'react-redux';
import { useHistory,useLocation } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';    

const NavBar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const logout = () => {
            if(user?.result?.googleId){
                googleLogout();
            }
        dispatch({type:'LOGOUT'});
        setUser(null);
        history.push('/');
    }


    useEffect(()=>{
        // prime web developer
        const token = user?.token;
        if(token){
            const decodedToken = jwt_decode(token);
            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));

    },[location]);

    return (
    <AppBar className={classes.appBar} position="static" color="inherit">
        <Link to="/" className={classes.brandContainer}>
            <img src={memoriesText} alt="Icon" height='45px' />
            <img className={classes.image}  src={memoriesLogo} alt='memories' height="40px" />
        </Link>
        <Toolbar className={classes.toolbar}>
            { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color="secondary" onClick={logout}>Logout</Button> 
                    </div>
            ) : (
                <Button component={Link} to="/auth" variant='contained' color="primary">Sign In</Button>
            ) }
        </Toolbar>
    </AppBar>
  )
}

export default NavBar
// a = 48
// u = 106
// s = 10
// ttt = 164

// to go
// 50 -q
// 50 -cc
// 30 -722
// 10 -my
// 2 -a

// ttt = 142
// remain = 22 
