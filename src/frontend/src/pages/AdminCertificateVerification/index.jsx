import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

export default function AdminCertificateVerification() {

    const[first_name, setFirstName] = useState("");
    const[last_name, setLastName] = useState("");
    const[url, setUrl] = useState();

    const navigate = useNavigate();
    const params = useParams();

    function handleValidate() {
        axios.post("/api/verify_certificate/", {params:{uid: params.uid}}).then(
            resolution => {
                console.log('Success', resolution.data);
                alert("Successfully verified!");
                navigate("/AdminCertificate");
            }, rejection => {
                console.log('Error', rejection.data);
            }
    
        )
    }

    function handleBack() {
        navigate("/AdminCertificate");
    }

    useEffect(() => {
        axios.get("/api/user_info_by_uid/", {params:{uid: params.uid}}).then(
            resolution => {
                console.log('Success', resolution.data);
                setUrl(resolution.data.certificate_src);
                setFirstName(resolution.data.first_name);
                setLastName(resolution.data.last_name);
    
            }, rejection => {
                console.log('Error', rejection.data);
            }
    
        )
    })

    return (
        <div className="mdui-container p=3">
            
            <div className="mdui-row mdui-m-t-5">

                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <img className="mdui-img-fluid" src={url} alt="id"></img>
                </div>

                <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Name</div>
                    <div className="mdui-typo-headline">{first_name} {last_name}</div>
                </div>
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <div className="mdui-typo-title">UID</div>
                    <div className="mdui-typo-headline">{params.uid}</div>
                </div>
            </div>

                <div className="mdui-row mdui-m-t-5">
                    <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back</button>
                    </div>
                    <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                        <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleValidate}>Validate</button>
                    </div>
                </div>


            </div>

        </div>
    )

}



