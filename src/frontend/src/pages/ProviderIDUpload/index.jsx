import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from "react-router-dom"
export default function ProviderIDUpload() {

    const navigate = useNavigate();
    

    function handleFileUpload() {
        let file = document.querySelector('#input').files[0];
        if (file) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function() {
                if (1048576 < reader.result.length) {
                    alert('File cannot be larger than 1M');
                    return;
                } else {
                    axios.post('/api/upload_photoid/', {
                        data: reader.result
                    }).then(
                        resolution => {
                            if (resolution.data.status === 'succeeded') {
                                console.log('Success', resolution.data);
                                alert('Provider Photo ID successfully uploaded.');
                                navigate('/provideridupload');
                                // window.location.reload();
                            }
                            else {
                                alert('Upload failed, please try again.');
                                navigate('/provideridupload');
                            }
                        }, rejection => {
                            console.log('Error', rejection.response);
                        }
                    )
                    
                }
            }
        }
    }

    function handleBack() {
        navigate('/providerprofile');
    }

    const [isLoading, setLoading] = useState(true);
    const [url, setUrl] = useState();
    const [verified, setVerified] = useState("");

    useEffect(() => {
        axios.get('/api/user_info/').then(
            resolution => {
                console.log('Success', resolution.data);
                setUrl(resolution.data['photoid_src']);
                setVerified(resolution.data.photoid_verified);
                setLoading(false); 
    
            }, rejection => {
                console.log('Error', rejection.data);
            }
    
        )
    })

    if (isLoading) {
        return;
    }

    if (verified === "accepted") {
        return (
            <div className="mdui-container p=3">
                
                <div className="mdui-row mdui-m-t-5">
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <img className="mdui-img-fluid" src={url} alt="id"></img>
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-b-2">
                        <div className="mdui-typo-title mdui-text-color-green mdui-m-b-3 mdui-m-t-2">Your ID has been verified.</div>
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <input className='mdui-m-b-2 mdui-m-t-1' type='file' id='input'></input>
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleFileUpload}>Upload</button>
                        </div>
                        
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Profile</button>
                        </div>
                    </div>
                </div>
    
            </div>
                
        )
    } else if (verified === "rejected"){
        return (
            <div className="mdui-container p=3">
                
                <div className="mdui-row mdui-m-t-5">
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <img className="mdui-img-fluid" src={url} alt="id"></img>
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-b-2">
                        <div className="mdui-typo-title mdui-text-color-red mdui-m-b-3 mdui-m-t-2">Your ID is rejected. You may upload a new document for us to verify.</div>
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <input className='mdui-m-b-2 mdui-m-t-1' type='file' id='input'></input>
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleFileUpload}>Upload</button>
                        </div>
                        
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Profile</button>
                        </div>
                    </div>
                </div>
    
            </div>
                
        )
    } else if (verified === "pending"){
        return (
            <div className="mdui-container p=3">
                
                <div className="mdui-row mdui-m-t-5">
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <img className="mdui-img-fluid" src={url} alt="id"></img>
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-b-2">
                        <div className="mdui-typo-title mdui-text-color-amber mdui-m-b-3 mdui-m-t-2">We are still working to verify the document you provided.</div>
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <input className='mdui-m-b-2 mdui-m-t-1' type='file' id='input'></input>
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleFileUpload}>Upload</button>
                        </div>
                        
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Profile</button>
                        </div>
                    </div>
                </div>
    
            </div>
                
        )
    } else if (verified === "never"){
        return (
            <div className="mdui-container p=3">
                
                <div className="mdui-row mdui-m-t-5">
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <img className="mdui-img-fluid" src={url} alt="id"></img>
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-b-2">
                        <div className="mdui-typo-title mdui-text-color-deep-orange mdui-m-b-3 mdui-m-t-2">You haven't upload an ID yet. Upload one so that we can verify your identity.</div>
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <input className='mdui-m-b-2 mdui-m-t-1' type='file' id='input'></input>
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleFileUpload}>Upload</button>
                        </div>
                        
                    </div>
    
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <div className="mdui-col mdui-col-xs-8 mdui-col-sm-6 mdui-col-lg-4">
                            <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Profile</button>
                        </div>
                    </div>
                </div>
    
            </div>
                
        )
    }

    

    
}