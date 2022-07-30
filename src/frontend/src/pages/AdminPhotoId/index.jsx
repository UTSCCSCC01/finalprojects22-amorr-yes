import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"

export default function AdminPhotoId() {
    const navigate = useNavigate();

    const[users, setUsers] = useState([]);
    let change = 0;
    useEffect(() => {
        mdui.mutation();
        axios.get("/api/get_unverified_photoid_list/").then(
            result => {
                if (result.data.status === 'succeeded') {
                    setUsers(result.data.result);
                }
                else {
                    alert('load list failed, please try again.');
                }
            }, error => {
                console.log("error")
            }
        )
    }, [change])

    function handleClick(uid) {
        navigate("/adminphotoidverification/" + uid);
    }

    function handleBack(){
        navigate("/admin");
    }


    return(
        <div className="mdui-container">
            <h2 className="mdui-text-center">
                Verify all User Photo ID
            </h2>
            <div className="mdui-col-xs-12 mdui-col-sm-10 mdui-col-lg-8 mdui-col-offset-sm-1 mdui-col-offset-lg-2">
                <div className="mdui-table-fluid">
                    <table className="mdui-table mdui-table-hoverable">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>User Type</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map(user => {
                                    return (
                                        <tr onClick={() => handleClick(user.uid)}>
                                            <td>{user.uid}</td>
                                            <td>{user.first_name + "  " + user.last_name}</td>
                                            <td>{user.user_type}</td>
                                            {/* <td>{user.lastname + user.firstname}</td> */}
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
                <div className="mdui-row mdui-m-t-5">
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-btn-block" onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}