import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"

export default function ProviderPosts(props) {

    const navigate = useNavigate();
    let profile_change = 0;
    const[postsList, setPostsList] = useState([]);

    function handleClick(pid) {
        props.changePid(pid);
        profile_change++;
        navigate("/detailedpost");
    }

    function handleCreate() {
        props.changePid(0);
        profile_change++;
        navigate("/detailedpost");
    }

    useEffect(() => {
        props.changePid(0);
        axios.get("/api/get_user_post_list/").then(
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
    }, [profile_change])

    return (
        <div className="mdui-container">
            <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-5">
                <div className="mdui-table-fluid">
                    <table className="mdui-table mdui-table-hoverable">
                        <thead>
                            <tr>
                                <th>Service</th>
                                <th>Time</th>
                                <th>Provider</th>
                                <th>Price</th>
                                <th>Location</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postsList.map(post => {
                                    return (
                                        <tr onClick={() => handleClick(post.pid)}>
                                            <td>{post.title}</td>
                                            <td>{post.start_time + ` - ` + post.end_time}</td>
                                            <td>{post.author_first_name + ` ` + post.author_last_name}</td>
                                            <td>{`$` + post.price}</td>
                                            <td>{post.location}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-m-t-2" onClick={handleCreate}>Create new post</button>
            </div>
            
        </div>
        
    )
}