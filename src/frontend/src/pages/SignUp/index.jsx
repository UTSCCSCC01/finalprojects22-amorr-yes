import React, {useState} from 'react'
import axios from 'axios'
export default function SignUp() {

    const[firstName, setFirstName] = useState(null);
    const[lastName, setLastName] = useState(null);
    const[email, setEmail] = useState(null);
    const[password, setPassword] = useState(null);
    const[same, setSame] = useState(true);


    function handleSignUp() {
        axios.post('/api/signup/', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }).then(
            result => {
                console.log('Success', result.data);
            }, error => {
                console.log('Error');
            }
        )
        // console.log(firstName)
        // console.log(lastName)
        // console.log(email)
        // console.log(password)
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
                Sign Up
            </h2>
            

            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">First Name</label>
                    <input className="mdui-textfield-input" type="text" maxLength="32" onChange={getFirstName} required/>
                </div>
            </div>

            <div className="mdui-row">
                <div className="mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Last Name</label>
                    <input className="mdui-textfield-input" type="text" maxLength="32" onChange={getLastName} required/>
                </div>
            </div>

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
                    <input className="mdui-textfield-input" type="text" maxLength="32" pattern="^.*(?=.{6,}).*$" onChange={getPassword} required/>
                    <div className="mdui-textfield-error">Password length has to be greater than 6 and less than 32!</div>
                </div>
            </div>

            <div className="mdui-row">
                <div className={same?"mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3":"mdui-textfield mdui-textfield-floating-label mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-textfield-invalid"}>
                    <label className="mdui-textfield-label">Confirm Password</label>
                    <input className="mdui-textfield-input" type="text" maxLength="32" onChange={confirm} required/>
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
