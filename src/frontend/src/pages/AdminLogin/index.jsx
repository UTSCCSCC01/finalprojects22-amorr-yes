import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function AdminLogin(props) {

    const[accesscode, setAccessCode] = useState(null);
    const navigate = useNavigate();


    function handleLogin() {
        axios.post('/api/admin_login/', {
            code: accesscode
        }).then(
            resolution => {
                console.log('Success', resolution.data);
                if (resolution.data['status'] === 'failed') {
                    alert('Incorrect access code.');
                    window.location.reload();
                }else if (resolution.data['status'] === 'succeeded') {
                    console.log('Redirecting...');
                    props.updateLoginState();
                    axios.get("/api/get_admin_status/").then(
                        resolution => {
                            console.log('Success', resolution.data);
                            navigate('/admin');
                        }, rejection => {
                            console.log('Error', rejection.data);
                            alert("Sth error");
                            navigate('/adminlogin');
                        }
                    )
                    
                }
            }, rejection => {
                console.log('Error');
                alert("Sth error");
            }
        )
    }


    function getAccessCode(event) {
        setAccessCode(event.target.value);
    }

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Administrator Login
            </h2>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Access Code</label>
                    <input className="mdui-textfield-input" type="password" maxLength="32" onChange={getAccessCode} required/>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    )
}