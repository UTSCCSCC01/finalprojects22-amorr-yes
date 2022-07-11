import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

export default function PostView() {

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[location, setLocation] = useState("");
    const[postal, setPostal] = useState("");
    const[start, setStart] = useState("");
    const[end, setEnd] = useState("");
    const[price, setPrice] = useState("");
    const[authorid, setAuthorid] = useState("");
    const[firstname, setFirstName] = useState("");
    const[gravatarphoto,setGravatarPhoto] = useState("");



    const navigate = useNavigate();
    const params = useParams();

    function handleViewProvider() {
        navigate('../../profileview/' + authorid);
    }

    function handleAppointment() {

    }

    function handleBack() {
        navigate('../../');
    }

    useEffect(() => {
        axios.get("/api/get_post/", {params:{pid: params.pid}}).then(
            result => {
                if (result.data.status === 'failed'){
                    navigate('');
                } else {
                    console.log();
                    setTitle(result.data.result.title);
                    setContent(result.data.result.text);
                    setLocation(result.data.result.location);
                    setPostal(result.data.result.postal_code);
                    setStart(result.data.result.start_time);
                    setEnd(result.data.result.end_time);
                    setPrice(result.data.result.price);
                    setAuthorid(result.data.result.author_id);
                    console.log(result.data.result.author_id);
                    axios.get("/api/user_info_by_uid/", {params:{uid: result.data.result.author_id}}).then(
                        resolution => {
                            if (resolution.data.status === 'failed'){
                                console.log("Failed");
                                console.log(resolution.data.error);
                            } else {
                                setFirstName(resolution.data.first_name);
                                setGravatarPhoto("https://www.gravatar.com/avatar/" + resolution.data.gravatar_md5);
                            }
                        }, rejection => {
                            console.log(rejection);
                        }
                    )
                }
            }, error => {
                console.log(error);
            }
        )
        
    })

    return (
        <div className="mdui-container">
            <h1 className="mdui-text-center">Post Details</h1>
            <div className="mdui-row">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-display-1">{title}</div>
                    <hr/>
                    <div className="mdui-typo-body-1">{content}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Provider</div>
                    <div className="mdui-card-header">
                        <img className="mdui-card-header-avatar" src={gravatarphoto} alt="gravatar"/>
                        <button className="mdui-btn mdui-text-color-blue" onClick={handleViewProvider}><u>{firstname}</u></button>
                    </div>
                    
                    
                </div>
            </div>
            
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Location</div>
                    <div className="mdui-typo-headline">{location}</div>
                </div>
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <div className="mdui-typo-title">Price</div>
                    <div className="mdui-typo-headline">CA$ {price}</div>
                </div>
            </div>

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">From</div>
                    <div className="mdui-typo-headline">{start}</div>
                </div>
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <div className="mdui-typo-title">To</div>
                    <div className="mdui-typo-headline">{end}</div>
                </div>
            </div>

            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-10 mdui-col-sm-8 mdui-col-lg-6">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleAppointment}>Schedule an Appointment</button>
                </div>
            </div>

            <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-10 mdui-col-sm-8 mdui-col-lg-6">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleBack}>Back to Posts</button>
                </div>
            </div>
        </div>
    )

}