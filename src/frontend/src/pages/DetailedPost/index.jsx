import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function DetailedPost(props) {

    const[title, setTitle] = useState("");
    const[content, setContent] = useState("");
    const[location, setLocation] = useState("");
    const[postal, setPostal] = useState("");
    const[phone, setPhone] = useState("");
    const[email, setEmail] = useState("");
    const[start, setStart] = useState("");
    const[end, setEnd] = useState("");
    const[price, setPrice] = useState("");
    const[firstName, setFirstName] = useState("");
    const[lastName, setLastName] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get("/api/get_post/", {params:{pid: props.pid}}).then(
            result => {
                if (result.data.status ==='failed'){
                    alert('Save failed, please try again!');
                    navigate('/providerposts');
                } else {
                    setTitle(result.data.title);
                    setContent(result.data.text);
                    setLocation(result.data.location);
                    setPostal(result.data.text);
                    setPhone(result.data.author_phone);
                    setEmail(result.data.author_email);
                    setStart(result.data.start_time);
                    setEnd(result.data.end_time);
                    setPrice(result.data.price)
                    setFirstName(result.data.author_first_name);
                    setLastName(result.data.author_last_name);
                }
            }, error => {
                console.log(error)
            }
        )
    })

    function handleSave() {
        axios.post("/api/save_post/", {
            pid: props.pid,
            title: title,
            text: content,
            start_time: start,
            end_time: end,
            location: location,
            postal_code: postal,
            price: price
        })
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
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Service Provider Name</label>
                    <input className="mdui-textfield-input" defaultValue={firstName + ` ` + lastName} disabled/>
                </div>
            </div>
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
            <div className="mdui-row">
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
            </div>
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