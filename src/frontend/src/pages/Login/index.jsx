import React, {useState} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function Login(props) {

    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);
    const navigate = useNavigate();


    function handleLogin() {
        axios.post('/api/login/', {
            email: email,
            password: password
        }).then(
            resolution => {
                console.log('Success', resolution.data);
                if (resolution.data['status'] === 'failed') {
                    alert('Incorrect email address or password.');
                    // window.location.reload();
                }else if (resolution.data['status'] === 'succeeded') {
                    console.log('Redirecting...');
                    props.updateLoginState();
                    navigate('/clientprofile');
                }
            }, rejection => {
                console.log('Error');
            }
        )
    }

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Login
            </h2>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Email</label>
                    <input className="mdui-textfield-input" type="email" maxLength="32" onChange={getEmail} required/>
                    <div className="mdui-textfield-error">Wrong Email Format</div>
                </div>
            </div>

            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Password</label>
                    <input className="mdui-textfield-input" type="password" maxLength="32" onChange={getPassword} required/>
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