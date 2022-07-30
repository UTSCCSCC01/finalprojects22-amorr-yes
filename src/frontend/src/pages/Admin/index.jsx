import React, {useEffect} from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
export default function Admin(){
    const navigate = useNavigate();
    let admin_change = 0;
    function handlePhotoId() {
        const w = window.open('_blank');
        let url = "/adminphotoid";
        w.location.href = url;
    }
    function handleCertificate() {
        const w = window.open('_blank');
        let url = "/admincertificate";
        w.location.href = url;
    }
    function handleDeposit() {
        const w = window.open('_blank');
        let url = "/admindeposit";
        w.location.href = url;
    }

    useEffect(() => {
        axios.get('/api/get_admin_status/').then(
            result => {
                console.log('Success', result.data);
                   if (result.data.result === false){
                       alert('Please Log in');
                       navigate('/adminlogin');
                   }
                   
            }, rejection => {
                console.log('Error');
            }
    
        )
    },[admin_change]);

    return (
        <div className="mdui-container p=3">

            <h2 className="mdui-text-center">
                Administrator Management
            </h2>
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handlePhotoId}>Verify PhotoID</button>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleCertificate}>Verify Certification</button>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleDeposit}>Administrator Deposit</button>
                </div>
            </div>
        </div>
    )
}