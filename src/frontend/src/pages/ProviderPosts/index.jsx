import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import ServicePost from '../../components/ServicePost';

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
            <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-m-x-2" onClick={handleCreate}>Create new post</button>
        </div>
        
    )
}