import React, {useState} from 'react'
import {NavLink} from 'react-router-dom'
// import axios from 'axios'

export default function Navbar() {

    const[login, setLogin] = useState(false);

    function test() {
        setLogin(!login);
    }
    return (
        <div className="mdui-appbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-auto mdui-loaded">
            <div className="mdui-tab mdui-color-theme">
                {/* <NavLink to="/signup" className={login?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>sign up</NavLink> */}
                <div class="mdui-toolbar-spacer"></div>
                <NavLink to="/signup" className={login?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>sign up</NavLink>
                <NavLink to="/login" className="mdui-ripple mdui-ripple-white">Log in</NavLink>
                <button onClick={test}>test</button>
            </div>
        </div>
        
    )
}