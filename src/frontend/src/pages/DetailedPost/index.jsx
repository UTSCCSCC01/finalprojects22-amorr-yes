import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function DetailedPost(props) {

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[location, setLocation] = useState("");
    const[postal, setPostal] = useState("");
    // const[phone, setPhone] = useState("");
    // const[email, setEmail] = useState("");
    const[start, setStart] = useState("");
    const[end, setEnd] = useState("");
    const[price, setPrice] = useState("");
    // const[firstName, setFirstName] = useState("");
    // const[lastName, setLastName] = useState("");
    let profile_change = 0;

    const navigate = useNavigate();

    useEffect(() => {
        if(props.pid !== 0) {
            console.log(props.pid);
            axios.get("/api/get_post/", {params:{pid: props.pid}}).then(
                result => {
                    if (result.data.status === 'failed'){
                        alert('Save failed, please try again!');
                        navigate('/providerposts');
                    } else {
                        console.log()
                        setTitle(result.data.result.title);
                        setContent(result.data.result.text);
                        setLocation(result.data.result.location);
                        setPostal(result.data.result.postal_code);
                        // setPhone(result.data.result.author_phone);
                        // setEmail(result.data.result.author_email);
                        setStart(result.data.result.start_time);
                        setEnd(result.data.result.end_time);
                        setPrice(result.data.result.price)
                        // setFirstName(result.data.result.author_first_name);
                        // setLastName(result.data.result.author_last_name);
                    }
                }, error => {
                    console.log(error)
                }
            )
        }
        
    },[profile_change])

    function handleSave() {
        console.log(price);
        axios.post("/api/save_post/", {
            pid: props.pid,
            title: title,
            text: content,
            start_time: start,
            end_time: end,
            location: location,
            postal_code: postal,
            price: price
        }).then(
            
            result => {
                if (result.data.status === 'succeeded') {
                    alert("saved successfully!");
                    navigate('/providerposts');
                }
                else {
                    alert('save failed, please try again.');
                }
            }, error => {
                console.log(error)
            }
        )
        profile_change++;
    }

    return (
        <div className="mdui-container">
            <h1 className="mdui-text-center">Post Details</h1>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Service</label>
                    <input className="mdui-textfield-input" defaultValue={title} onChange={e => setTitle(e.target.value)}/>
                </div>
            </div>
            {/* <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Service Provider Name</label>
                    <input className="mdui-textfield-input" defaultValue={firstName + ` ` + lastName} disabled/>
                </div>
            </div> */}
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Content</label>
                    <textarea className="mdui-textfield-input" rows="4" defaultValue={content} onChange={e => setContent(e.target.value)}></textarea>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Location</label>
                    <input className="mdui-textfield-input" defaultValue={location} onChange={e => setLocation(e.target.value)}/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Postal code</label>
                    <input className="mdui-textfield-input" maxLength="6" defaultValue={postal} onChange={e => setPostal(e.target.value)}/>
                </div>
            </div>
            {/* <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Phone number</label>
                    <input className="mdui-textfield-input" defaultValue={phone} disabled/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Email</label>
                    <input className="mdui-textfield-input" defaultValue={email} disabled/>
                </div>
            </div> */}
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Price ($)</label>
                    <input className="mdui-textfield-input" type="number" defaultValue={price} onChange={e => setPrice(e.target.value)}/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Start from</label>
                    <input className="mdui-textfield-input" type="time" name="appt-time" defaultValue={start} onChange={e => setStart(e.target.value)}/>
                </div>
                <div className="mdui-textfield mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <label className="mdui-textfield-label">to</label>
                    <input className="mdui-textfield-input" type="time" name="appt-time" defaultValue={end} onChange={e => setEnd(e.target.value)}/>
                </div>
            </div>
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}