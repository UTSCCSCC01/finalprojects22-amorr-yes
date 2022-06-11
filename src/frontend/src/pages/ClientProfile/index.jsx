import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'
export default function ClientProfile() {
    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[about, setAbout] = useState("");
    const[password, setPassword] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhoneNumber] = useState("");
    const[gravatarphoto,setGravatarPhoto] = useState("");
    const[same, setSame] = useState(true);
    const navigate = useNavigate();
    let profile_change = 0;
    
   
    function handleSave(){
        axios.post('/api/user_info_set/',{
            first_name: first_name,
            last_name: last_name,
            about: about,
            email: email,
            phone: phone,
            password: password
        }).then(
            result => {
                if(result.data.status === "succeeded") {
                    alert("Saved successfully!");
                    navigate("/clientprofile");
                }
                    
                else
                    alert("Saved unsuccessfully, please try again!")
            }, error => {
                console.log('Error');
            }
        )
        profile_change = profile_change+ 1;
    }


    function handleIDUpload(){
        navigate('/clientidupload');
    }
    

    function getAbout(event){
        setAbout(event.target.value);
    }
    function getFirstName(event){
        setFirstName(event.target.first_name);
    }
    function getLastName(event){
        setLastName(event.target.last_name);
    }

    function getEmail(event) {
        setEmail(event.target.value);
    }
    function getPhoneNumber(event){
        setPhoneNumber(event.target.value);
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

    useEffect(() => {
        axios.get('/api/user_info/').then(
            result => {
                console.log('Success', result.data);
                   if (result.data.status ==='failed'){
                       alert('Please Log in');
                       navigate('/login');
                   
                   } else {
                    setFirstName(result.data.first_name);
                    setLastName(result.data.last_name);
                    setAbout(result.data.about);
                    setEmail(result.data.email);
                    setPhoneNumber(result.data.phone);
                    setGravatarPhoto("https://www.gravatar.com/avatar/" + result.data.gravatar_md5);
                }
    
            }, rejection => {
                console.log('Error');
            }
    
        )
    },[profile_change]);
    
    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Client Profile
            </h2>
            <div className="mdui-typo m=2">
                <hr/>
            </div>
            <div className="mdui-container">
                <div className="mdui-row">
                    <div className="mdui-card mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-card-header">
                            <img className="mdui-card-header-avatar" src={gravatarphoto} alt="gravatar"/>
                            <a className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-m-x-1" href="https://en.gravatar.com/">Gravatar</a>
                        </div>
                        <div className="mdui-card-content">
                            <input className="mdui-textfield-input mdui-col-md-4" type="text" defaultValue={first_name} onChange={getFirstName}/>
                            <input className="mdui-textfield-input mdui-col-offset-md-4" type="text" defaultValue={last_name} onChange={getLastName}/>
                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">email</label>
                                <input className="mdui-textfield-input" type="email" maxLength="32"  defaultValue={email} onChange={getEmail}/>
                                <div className="mdui-textfield-error">Wrong Email Format</div>
                            </div>

                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">phone</label>
                                <input className="mdui-textfield-input" maxLength="10" minLength="10"  defaultValue={phone} onChange={getPhoneNumber}/>
                                <div className="mdui-textfield-error">Wrong Phone Format</div>
                            </div>

                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">password</label>
                                <input className="mdui-textfield-input" type="password" maxLength="32" pattern="^.*(?=.{6,}).*$" onChange={getPassword} required/>
                                <div className="mdui-textfield-error">Password length has to be greater than 6 and less than 32!</div>
                            </div>

                            <div className={same?"mdui-textfield":"mdui-textfield mdui-textfield-invalid"}>
                                <label className="mdui-textfield-label">Confirm Password</label>
                                <input className="mdui-textfield-input" type="password" maxLength="32" onChange={confirm} required/>
                                <div className="mdui-textfield-error">Password must be the same</div>
                            </div>
                        
                        <div className="mdui-row">
                            <h2 className="mdui-text-center">
                                About Me
                            </h2>
                        </div>

                    <div className="mdui-row">
                        <div className="mdui-textfield mdui-m-l-2">
                            <textarea className="mdui-textfield-input" rows="4" defaultValue={about} maxLength="200" onChange={getAbout} ></textarea>
                        </div>
                    </div>
                    
                    <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-xm-4" mdui-dialog="{target: '#comfirmEdit'}">save</button>
                    <div className="mdui-card-actions">
                        <div className="mdui-dialog" id="comfirmEdit">
                            <div className="mdui-dialog-title">Are you sure?</div>
                            <div className="mdui-dialog-content">You'll edit your profile!</div>
                            <div className="mdui-dialog-actions">
                                <button className="mdui-btn mdui-ripple" mdui-dialog-close>cancel</button>
                                <button className="mdui-btn mdui-ripple" onClick={handleSave}>comfirm</button>
                            </div>
                        </div>

                        <div className="mdui-row">
                            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-m-t-1">
                                <a className="mdui-btn mdui-text-color-blue" onClick={handleIDUpload}><u>Upload Your Photo ID</u></a>
                            </div>
                        </div>
                    </div>
                </div>
            
            </div>
            
                
                
            </div> 
            
            </div>
            
            
            
            
        </div>
    )
}
