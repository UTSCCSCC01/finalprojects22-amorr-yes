import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom"

export default function ProviderPosts(props) {

    const navigate = useNavigate();

    function handleClick(id) {
        props.changePid(id);
        navigate("/detailedpost");
    }

    function handleCreate() {
        props.changePid(0);
        navigate("/detailedpost");
    }

    let tempPosts = [
        {
            id: "001",
            firstName: "first",
            lastName: "last",
            type: "haircut"
        },
        {
            id: "002",
            firstName: "a",
            lastName: "b",
            type: "type2"
        },
        {
            id: "003",
            firstName: "c",
            lastName: "d",
            type: "type3"
        }
    ]

    return (
        <div className="mdui-container">
            <div className="mdui-table-fluid">
                <table className="mdui-table mdui-table-hoverable">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tempPosts.map(post => {
                                return (
                                    <tr onClick={() => handleClick(post.id)}>
                                        <td>{post.id}</td>
                                        <td>{post.firstName}</td>
                                        <td>{post.lastName}</td>
                                        <td>{post.type}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-m-t-2" onClick={handleCreate}>Create new post</button>
        </div>
        
    )
}