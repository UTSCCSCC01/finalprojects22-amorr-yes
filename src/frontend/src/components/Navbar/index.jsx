import React from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Navbar(props) {

    const navigate = useNavigate();
    function logOut() {
        axios.get('/api/logout/').then(
            result => {
                if(result.data.status === "succeeded") {
                    alert('Successfully logout!');
                    props.updateLoginState();
                    navigate("/login");
                } else {
                    alert('Failed');
                }
            }, error => {
                alert('Error');
            }
        )
    }
    return (
        <div className="mdui-appbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-auto mdui-loaded">
            <div className="mdui-tab mdui-color-theme">
                <NavLink to="/" className="mdui-m-x-3">AMMOR</NavLink>
                <div className="mdui-toolbar-spacer"></div>

                <NavLink to="/providerposts" className="mdui-ripple mdui-ripple-white">Posts</NavLink>
                <NavLink to="/providersignup" className="mdui-ripple mdui-ripple-white">providersignup</NavLink>
                <NavLink to="/providerlogin" className="mdui-ripple mdui-ripple-white">providerlogin</NavLink>
                <NavLink to="/providerprofile" className="mdui-ripple mdui-ripple-white">providerprofile</NavLink>
                <NavLink to="/signup" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Sign Up</NavLink>
                <NavLink to="/login" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Log In</NavLink>
                {/* <NavLink to="/signup" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Provider Sign Up</NavLink>
                <NavLink to="/login" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Provider Log In</NavLink> */}

                <NavLink to="/clientprofile" className={props.isLogin?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>Profile</NavLink>
                <button className={props.isLogin?"mdui-ripple mdui-ripple-white":"mdui-hidden"} onClick={logOut}>Log out</button>
                
            </div>
        </div>
        
    )
}