import React from 'react'
import axios from 'axios';
//import { useNavigate } from "react-router-dom"
export default function FileUpload() {

    //const navigate = useNavigate();

    function handleFileUpload() {
        var file = document.querySelector('#input').files[0];
        var Base64;
        if (file) {
            var reader = new FileReader();
            Base64 = reader.readAsDataURL(file);
            reader.onload = function() {
                if (10485760 < reader.result.length) {
                    alert('File cannot be larger than 10M');
                    return;
                } else {
                    axios.post('/api/file_upload/', {
                        data: reader.result
                    }).then(
                        resolution => {
                            console.log('Success', resolution.data);
                            alert('Client Photo ID successfully uploaded.');
                            window.location.reload();
                        }, rejection => {
                            console.log('Error', rejection.data);
                        }
                    )
                    
                }
            }
        }
    }

    function handleBack() {
    //    navigate('/profile');
    }

    axios.get('/api/user_info/').then(
        resolution => {
            console.log('Success', resolution.data);

                return (
                    <div className="mdui-container p=3">

                        <img className="mdui-img-fluid" src={resolution.data['photoid_src']}></img>
                    
                        <div className="mdui-row mdui-m-t-5">
                        <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                                <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleFileUpload}>Upload</button>
                            </div>
                            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                                <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Profile</button>
                            </div>
                        </div>

                    </div>
                    
                )

        }, rejection => {
            console.log('Error', rejection.data);
        }

    )

    
}