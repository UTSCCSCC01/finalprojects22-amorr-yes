import React, {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export default function SignUp() {

    const[firstName, setFirstName] = useState(null);
    const[lastName, setLastName] = useState(null);
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);
    const[same, setSame] = useState(true);
    
    const navigate = useNavigate();


    function handleSignUp() {
        if(same && firstName && lastName && email && password) {
            axios.post('/api/signup/', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                user_type: "provider"
            }).then(
                result => {
                    if (result.data.status === 'succeeded') {
                        alert('Signup succeeded, please login!');
                        navigate('/login');
                    }
                    else {
                        alert('Signup failed, please try again.');
                    }
                }, error => {
                    console.log('Error');
                }
            )
        } else {
            alert("Input invalid")
        }
        
    }

    function getFirstName(event) {
        setFirstName(event.target.value);
    }

    function getLastName(event) {
        setLastName(event.target.value);
    }

    function getEmail(event) {
        setEmail(event.target.value);
    }

    function getPassword(event) {
        setPassword(event.target.value);
    }

    function confirm(event) {
        if(event.target.value === password) {
            setSame(true);
        } else {
            setSame(false);
        }
    }

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Become a Service Provider
            </h2>
            

            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">First Name</label>
                    <input className="mdui-textfield-input" type="text" maxLength="32" onChange={getFirstName} required/>
                </div>
            </div>

            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Last Name</label>
                    <input className="mdui-textfield-input" type="text" maxLength="32" onChange={getLastName} required/>
                </div>
            </div>

            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Email</label>
                    <input className="mdui-textfield-input" type="email" maxLength="32" onChange={getEmail} required/>
                    <div className="mdui-textfield-error">Wrong Email Format</div>
                </div>
            </div>

            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Password</label>
                    <input className="mdui-textfield-input" type="password" maxLength="32" pattern="^.*(?=.{6,}).*$" onChange={getPassword} required/>
                    <div className="mdui-textfield-error">Password length has to be greater than 6 and less than 32!</div>
                </div>
            </div>

            <div className="mdui-row">
                <div className={same?"mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3":"mdui-textfield  mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-textfield-invalid"}>
                    <label className="mdui-textfield-label">Confirm Password</label>
                    <input className="mdui-textfield-input" type="password" maxLength="32" onChange={confirm} required/>
                    <div className="mdui-textfield-error">Password must be the same</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleSignUp}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}
