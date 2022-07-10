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


    useEffect(() => {
        
        axios.get("/api/user_info_by_uid/", {params:{uid: params.uid}}).then(
            resolution => {
                if (resolution.data.status === 'failed'){
                    console.log("Failed");
                } else {
                    setFirstName(resolution.data.result.first_name);
                    setLastName(resolution.data.result.last_name);
                    setAbout(resolution.data.result.about);
                    setEmail(resolution.data.result.email);
                    setPhone(resolution.data.result.phone);
                    setCategories(resolution.data.result.categories);
                    setGravatarPhoto("https://www.gravatar.com/avatar/" + resolution.data.result.gravatar_md5);
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
                        <img className="mdui-card-header-avatar" src={gravatarphoto} alt="gravatar"/>
                        <div className="mdui-typo-headline">{last_name} {first_name}</div>
                    </div>
                </div>
            </div>
            
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Contact</div>
                    <div className="mdui-typo-headline">{email}</div>
                    <div className="mdui-typo-headline">{phone}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">About</div>
                    <div className="mdui-typo-headline">{about}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Categories</div>
                    <div className="mdui-typo-headline">{categories}</div>
                </div>
            </div>
        </div>
    )
}