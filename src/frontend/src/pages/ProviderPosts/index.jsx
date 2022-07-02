import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"

export default function ProviderPosts(props) {

    const navigate = useNavigate();

    const[postsList, setPostsList] = useState([]);

    function handleClick(pid) {
        props.changePid(pid);
        navigate("/detailedpost");
    }

    function handleCreate() {
        props.changePid(0);
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
    })

    return (
        <div className="mdui-container">
            <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                <div className="mdui-table-fluid">
                    <table className="mdui-table mdui-table-hoverable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>Time</th>
                                <th>Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                postsList.map(post => {
                                    return (
                                        <tr onClick={() => handleClick(post.pid)}>
                                            <td>{post.pid}</td>
                                            <td>{post.title}</td>
                                            <td>{post.start_time + ` - ` + post.end_time}</td>
                                            <td>{post.author_first_name + post.author_last_name}</td>
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