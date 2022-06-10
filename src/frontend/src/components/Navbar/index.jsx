import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function Navbar(props) {

    // const[login, setLogin] = useState(false);
    const navigate = useNavigate();
    function logOut() {
        axios.get('/api/logout/').then(
            result => {
                if(result.status === "success") {
                    props.updateLoginState();
                    navigate("/signup");
                } else {
                    console.log('Failed');
                }
            }, error => {
                console.log('Error');
            }
        )
    }
    return (
        <div className="mdui-appbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-auto mdui-loaded">
            <div className="mdui-tab mdui-color-theme">

                {/* <NavLink to="/signup" className={login?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>sign up</NavLink> */}
                <div className="mdui-toolbar-spacer"></div>
                <NavLink to="/signup" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>sign up</NavLink>
                <NavLink to="/login" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Log in</NavLink>
                <NavLink to="/clientprofile" className={props.isLogin?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Profile</NavLink>
                {/* <NavLink to="/login" className={login?"mdui-hidden":"mdui-ripple mdui-ripple-white"}>Welcome {props.userName}</NavLink> */}
                <button className={props.isLogin?"mdui-ripple mdui-ripple-white":"mdui-hidden"} onClick={logOut}>Log out</button>
                {/* <button onClick={test}>test</button> */}

            </div>
        </div>
        
    )
}