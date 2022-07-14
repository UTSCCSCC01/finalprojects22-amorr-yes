import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

export default function ProfileView() {

    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[about, setAbout] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhoneNumber] = useState("");
    const[gravatarphoto,setGravatarPhoto] = useState("");
    const[categories, setCategories] = useState("");
    const navigate = useNavigate();
    const params = useParams();


    

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
   


    function getCategories(event){
        setCategories(event.target.value);
    }

    function handleBack() {
        window.history.back(-1);
    }

    useEffect(() => {
        
        axios.get("/api/user_info_by_uid/", {params:{uid: params.uid}}).then(
            resolution => {
                if (resolution.data.status === 'failed'){
                    console.log("Failed");
                } else {
                    setFirstName(resolution.data.first_name);
                    setLastName(resolution.data.last_name);
                    setAbout(resolution.data.about);
                    setEmail(resolution.data.email);
                    setPhoneNumber(resolution.data.phone);
                    setCategories(resolution.data.categories);
                    setGravatarPhoto("https://www.gravatar.com/avatar/" + resolution.data.gravatar_md5);
                }
            }, rejection => {
                console.log(rejection);
            }
        )
    });

    return (
        <div className="mdui-container p=3">
            <button class="mdui-btn" onClick={handleBack}> Back </button>


            <h2 className="mdui-text-center">
                Service Provider Profile
            </h2>
            <div className="mdui-typo m=2">
                <hr/>
            </div>
            <div className="mdui-container">
                <div className="mdui-row">
                    <div className="mdui-card mdui-col-sm-6 mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-card-header">
                            <img className="mdui-card-header-avatar" src={gravatarphoto} alt="gravatar"/>
                        </div>
                        <div className="mdui-card-content">
                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">First Name</label>
                                <input className="mdui-textfield-input" type="text" disabled defaultValue={first_name} onChange={getFirstName}/>
                            </div>

                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">Last Name</label>
                                <input className="mdui-textfield-input" type="text" disabled defaultValue={last_name} onChange={getLastName}/>
                            </div>
                        
                        
                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">Email</label>
                                <input className="mdui-textfield-input" type="email" disabled defaultValue={email} onChange={getEmail}/>
                                <div className="mdui-textfield-error">Wrong Email Format</div>
                            </div>

                            <div className="mdui-textfield">
                                <label className="mdui-textfield-label">Phone</label>
                                <input className="mdui-textfield-input" disabled defaultValue={phone} onChange={getPhoneNumber}/>
                                <div className="mdui-textfield-error">Wrong Phone Format</div>
                            </div>

                    
                            <div className="mdui-row">
                                <h2 className="mdui-text-center">
                                    About Me
                                </h2>
                            </div>

                            <div className="mdui-row">
                                <div className="mdui-textfield mdui-m-l-2">
                                    <textarea className="mdui-textfield-input" rows="4" defaultValue={about} disbaled onChange={getAbout} ></textarea>
                                </div>
                            </div>
                
                            <div className="mdui-row">
                                <h2 className="mdui-text-center">
                                Categories
                                </h2>
                            </div>

                            <div className="mdui-row">
                                <div className="mdui-textfield mdui-m-l-2">
                                    <textarea className="mdui-textfield-input" rows="1" defaultValue={categories} disabled onChange={getCategories} ></textarea>
                                </div>
                            </div>


                        </div>
        
                    </div>
        
            
            
                </div> 
        
            </div>
        
        
        
        
        </div>
    )
}