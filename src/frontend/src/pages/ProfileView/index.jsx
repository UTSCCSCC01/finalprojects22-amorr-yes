import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

export default function ProfileView() {

    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[about, setAbout] = useState("");
    const[email, setEmail] = useState("");
    const[phone, setPhone] = useState("");
    const[gravatarphoto,setGravatarPhoto] = useState("");
    const[categories, setCategories] = useState("");

    const navigate = useNavigate();
    const params = useParams();

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
                    setPhone(resolution.data.phone);
                    setCategories(resolution.data.categories);
                    setGravatarPhoto("https://www.gravatar.com/avatar/" + resolution.data.gravatar_md5);
                }
            }, rejection => {
                console.log(rejection);
            }
        )
    });

    return (
        <div className="mdui-container">

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-card-header">
                        <img className="mdui-card-header-avatar mdui-m-r-2" src={gravatarphoto} alt="gravatar"/>
                        <div className="mdui-typo-headline mdui-m-t-2">{last_name} {first_name}</div>
                    </div>
                </div>
            </div>
            
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Contact</div>
                    <hr/>
                    <div className="mdui-typo-headline">{email}</div>
                    <div className="mdui-typo-headline">{phone}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">About</div>
                    <hr/>
                    <div className="mdui-typo-headline">{about}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Categories</div>
                    <hr/>
                    <div className="mdui-typo-headline">{categories}</div>
                </div>
            </div>

            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-10 mdui-col-sm-8 mdui-col-lg-6">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back</button>
                </div>
            </div>
        </div>
    )
}