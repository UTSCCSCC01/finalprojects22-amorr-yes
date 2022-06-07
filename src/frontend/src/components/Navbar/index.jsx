export default function Navbar() {
    return (
        <div className="mdui-appbar mdui-theme-primary-indigo mdui-theme-accent-pink mdui-theme-layout-auto mdui-loaded">
            <div className="mdui-tab mdui-color-theme">
                <a href="#example3-tab1" className="mdui-ripple mdui-ripple-white">service</a>
                <a href="#example3-tab2" className="mdui-ripple mdui-ripple-white">about</a>
                <a href="#example3-tab3" className="mdui-ripple mdui-ripple-white">sign up</a>
                <a href="#example3-tab3" className="mdui-ripple mdui-ripple-white">log in</a>
            </div>
        </div>
    )
}