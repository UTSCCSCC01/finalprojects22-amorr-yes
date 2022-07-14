import axios from 'axios';
import React, {useState, useEffect} from 'react'
import mdui from 'mdui'
import { useNavigate } from "react-router-dom"

import ServicePost from '../../components/ServicePost';


export default function MainPage() {

    const[postsList, setPostsList] = useState([]);
    const[keyword, setKeyword] = useState("");
    const[sort, setSort] = useState("price");
    const[range, setRange] = useState("");
    const[location, setLocation] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => {
        mdui.mutation();
    })

    function handleSearch() {

        let params = {
            keywords: keyword,
            sortby: sort,
        }

        if(range !== "") params.range = range;

        if(range !== "" || sort === "range") {
            
            if(location === "") {
                alert("Location cannot be empty!");
                return;
            } else {
                params.addr = location
            }
        } 

        axios.get("/api/get_post_list/", {params}).then(
            result => {
                if (result.data.status === 'succeeded') {
                    setPostsList(result.data.result);
                }
                else {
                    alert('load list failed, please try again.');
                }
            }, error => {
                console.log("error")
            }
        )
    }

    function handleClick(pid) {
        const w = window.open('_blank');
        let url = "../../postview/" + pid;
        w.location.href = url;
    }

    return (

        <div className="mdui-container">
            <h1 className="mdui-text-center">Welcome to AMMOR</h1>
            <div className="mdui-textfield mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                <i className="mdui-icon material-icons">search</i>
                <input className="mdui-textfield-input" placeholder="search anything" onChange={e => setKeyword(e.target.value)}/>
            </div>
            <div className="mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                <div className="mdui-col-xs-3">
                    <h3>Sort by: </h3>
                    <select className="mdui-select" mdui-select="true" onChange={e => setSort(e.target.value)}>
                        <option value="price">Price</option>
                        <option value="range">Distance</option>
                    </select>
                </div>

                <div className="mdui-col-xs-9">
                    <div className="mdui-textfield mdui-col-xs-6">
                        <label className="mdui-textfield-label">Location</label>
                        <input className="mdui-textfield-input" type="text" onChange={e => setLocation(e.target.value)} required/>
                    </div>
                    <div className="mdui-textfield mdui-col-xs-6">
                        <label className="mdui-textfield-label">Range (km)</label>
                        <input className="mdui-textfield-input" type="number" onChange={e => setRange(e.target.value)} required/>
                    </div>
                </div>
                
            </div>
            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-3">
                <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleSearch}>Search</button>
            </div>

            <div className="mdui-typo mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-3">
                <hr/>
            </div>
            <div className="mdui-row-xs-3 mdui-m-y-4">
                
                {
                    postsList.map(post => {
                        return (
                            <div className="mdui-col mdui-p-x-3 mdui-p-y-3" onClick={() => handleClick(post.pid)}>
                                <ServicePost post={post}/>
                            </div>
                        )
                    })
                }     
            </div>
        </div>
    )
}