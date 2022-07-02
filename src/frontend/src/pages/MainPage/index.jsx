export default function MainPage() {

    function handleSearch() {
        
    }

    return (

        <div className="mdui-container">
            <h1 className="mdui-text-center">Welcome to AMMOR</h1>
            <div className="mdui-textfield mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                <i className="mdui-icon material-icons">search</i>
                <input className="mdui-textfield-input" placeholder="search anything"/>
            </div>
            <div className="mdui-textfield mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                <select className="mdui-select" mdui-select="true" id="123">
                    <option value="1">State 1</option>
                    <option value="2">State 2</option>
                    <option value="3">State 3</option>
                    <option value="4">State 4</option>
                    <option value="5">State 5</option>
                    <option value="6">State 6</option>
                </select>
            </div>
            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-3">
                <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleSearch}>Search</button>
            </div>
        </div>
        
        
    )
}