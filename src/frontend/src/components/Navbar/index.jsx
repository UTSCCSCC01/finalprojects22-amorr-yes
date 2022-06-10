export default function Navbar() {
    return (
        <div className="mdui-appbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-auto mdui-loaded">
            <div className="mdui-tab mdui-color-theme">

                {/* <NavLink to="/signup" className={login?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>sign up</NavLink> */}
                <div class="mdui-toolbar-spacer"></div>
                <NavLink to="/signup" className={login?"mdui-ripple mdui-ripple-white":"mdui-hidden"}>sign up</NavLink>
                <NavLink to="/login" className="mdui-ripple mdui-ripple-white">Log in</NavLink>
                <NavLink to="/clientprofile" className="mdui-ripple mdui-ripple-white">Profile</NavLink>
                <button onClick={test}>test</button>

            </div>
        </div>
    )
}