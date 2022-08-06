import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import { useParams } from 'react-router-dom';

export default function PostView() {

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[location, setLocation] = useState("");
    const[userlocation, setUserLocation] = useState("");
    const[postal, setPostal] = useState("");
    const[start, setStart] = useState("");
    const[end, setEnd] = useState("");
    const[price, setPrice] = useState("");
    const[authorid, setAuthorid] = useState("");
    const[firstname, setFirstName] = useState("");
    const[lastname, setLastName] = useState("");
    const[gravatarphoto, setGravatarPhoto] = useState("");
    const[monday, setMonday] = useState("");
    const[tuesday, setTuesday] = useState("");
    const[wednesday, setWednesday] = useState("");
    const[thursday, setThursday] = useState("");
    const[friday, setFriday] = useState("");
    const[saturday, setSaturday] = useState("");
    const[sunday, setSunday] = useState("");
    const[isProvider, setIsProvider] = useState(false);
    const[userChooseDate, setUserChooseDate] = useState("");
    const[userChooseTime, setUserChooseTime] = useState("");
    const[userChooseDuration, setUserChooseDuration] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    let post_view_change=0;

    function handleViewProvider() {
        const w = window.open('_blank');
        let url = "../../profileview/" + authorid;
        w.location.href = url;
    }

    function handleBook() {
        axios.get('/api/user_info/').then(
            result => {
                if(result.data.status === "failed") {
                    alert("please log in");
                    navigate('/login');
                } else {
                    axios.post("/api/create_order/", {
                        // uid: result.data.uid.toString(),
                        pid: params.pid,
                        start_time: userChooseTime,
                        duration: userChooseDuration,
                        date: userChooseDate,
                        client_location: userlocation,
                        client_postal_code: postal
                    }).then(
                        result => {
                            if (result.data.status === 'succeeded') {
                                alert("Booking successfully!");
                                navigate('/');
                            }
                            else if(result.data.error_id === -4) {
                                alert("Please choose required week day!");
                            }
                            else if(result.data.error_id === -5) {
                                alert("There is time conflict between your order and other orders, please try to choose another time.");
                            }
                            else {
                                alert('Booking failed, please try again.');
                            }
                        }, error => {
                            console.log(error)
                        }
                    )
                    post_view_change = post_view_change + 1;
                }
            }, error => {
                console.log('Error');
            }
        )
    }

    useEffect(() => {

        axios.get('/api/user_info/').then(
            result => {
                if(result.data.status === "failed") {
                    setIsProvider(false);
                } else {
                  if(result.data.user_type === "provider") {
                    setIsProvider(true);
                  } else {
                    setIsProvider(false);
                  }
                }
            }, error => {
                console.log('Error');
                setIsProvider(false);
            }
        )

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
                    if(result.data.result.daySelector.monday){
                        setMonday("✓");
                    }else{
                        setMonday("✕");
                    }
                    if(result.data.result.daySelector.tuesday){
                        setTuesday("✓");
                    }else{
                        setTuesday("✕");
                    }
                    if(result.data.result.daySelector.wednesday){
                        setWednesday("✓");
                    }else{
                        setWednesday("✕");
                    }
                    if(result.data.result.daySelector.thursday){
                        setThursday("✓");
                    }else{
                        setThursday("✕");
                    }
                    if(result.data.result.daySelector.friday){
                        setFriday("✓");
                    }else{
                        setFriday("✕");
                    }
                    if(result.data.result.daySelector.saturday){
                        setSaturday("✓");
                    }else{
                        setSaturday("✕");
                    }
                    if(result.data.result.daySelector.sunday){
                        setSunday("✓");
                    }else{
                        setSunday("✕");
                    }
                    axios.get("/api/user_info_by_uid/", {params:{uid: result.data.result.author_id}}).then(
                        resolution => {
                            if (resolution.data.status === 'failed'){
                                console.log("Failed");
                                console.log(resolution.data.error);
                            } else {
                                setFirstName(resolution.data.first_name);
                                setLastName(resolution.data.last_name);
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
        
    }, [post_view_change])

    function checkLogin() {
        
    }

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
                        <button className="mdui-btn mdui-text-color-blue" onClick={handleViewProvider}><u>{firstname} {lastname}</u></button>
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

            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title mdui-m-b-2">Available Days</div>
                    <div className="mdui-table-fluid">
                        <table className="mdui-table">
                            <thead>
                            <tr>
                                <th>Sun</th>
                                <th>Mon</th>
                                <th>Tue</th>
                                <th>Wed</th>
                                <th>Thu</th>
                                <th>Fri</th>
                                <th>Sat</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>{sunday}</td>
                                <td>{monday}</td>
                                <td>{tuesday}</td>
                                <td>{wednesday}</td>
                                <td>{thursday}</td>
                                <td>{friday}</td>
                                <td>{saturday}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className={isProvider?"mdui-hidden":"mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3 mdui-m-t-5"}>
                <div className="mdui-col mdui-col-xs-10 mdui-col-sm-8 mdui-col-lg-6">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" mdui-dialog="{target: '#Booking'}">Schedule an Appointment</button>
                </div>
            </div>

            <div className="mdui-dialog" id="Booking">
                <div className="mdui-dialog-content">
                    <h1 className="mdui-text-center">Make an appointment</h1>
                    <div className="mdui-row">
                        <div className="mdui-table-fluid">
                            <table className="mdui-table">
                                <thead>
                                <tr>
                                    <th>Sun</th>
                                    <th>Mon</th>
                                    <th>Tue</th>
                                    <th>Wed</th>
                                    <th>Thu</th>
                                    <th>Fri</th>
                                    <th>Sat</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{sunday}</td>
                                    <td>{monday}</td>
                                    <td>{tuesday}</td>
                                    <td>{wednesday}</td>
                                    <td>{thursday}</td>
                                    <td>{friday}</td>
                                    <td>{saturday}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="mdui-row">
                        <div className="mdui-textfield mdui-col-xs-6">
                            <label className="mdui-textfield-label">Start time</label>
                            <input className="mdui-textfield-input" type="time" name="appt-time" onChange={e => setUserChooseTime(e.target.value)}/>
                        </div>
                        <div className="mdui-textfield mdui-col-xs-6">
                            <label className="mdui-textfield-label">Hours of service</label>
                            <input className="mdui-textfield-input" type="number" onChange={e => setUserChooseDuration(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mdui-row">
                        <div className="mdui-textfield">
                            <label className="mdui-textfield-label">Date</label>
                            <input className="mdui-textfield-input" type="date" onChange={e => setUserChooseDate(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mdui-row">
                        <div className="mdui-textfield">
                            <label className="mdui-textfield-label">location</label>
                            <input className="mdui-textfield-input" onChange={e => setUserLocation(e.target.value)}/>
                        </div>
                    </div>
                    <div className="mdui-row">
                        <div className="mdui-textfield">
                            <label className="mdui-textfield-label">Postal Code</label>
                            <input className="mdui-textfield-input" maxLength="6" onChange={e => setPostal(e.target.value)}/>
                        </div>
                    </div>
                </div>
                <div className="mdui-dialog-actions">
                    <button className="mdui-btn mdui-ripple" mdui-dialog-close='true'>cancel</button>
                    <button className="mdui-btn mdui-ripple" mdui-dialog-close='true' onClick={handleBook}>Book</button>
                </div>
            </div>
        </div>
    )

}