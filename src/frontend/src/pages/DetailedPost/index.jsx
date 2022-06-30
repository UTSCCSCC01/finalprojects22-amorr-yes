import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function DetailedPost(props) {

    function handleSave() {
        alert(props.pid);
    }

    return (
        <div className="mdui-container">
            <h1 className="mdui-text-center">Post Details</h1>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Service</label>
                    <input className="mdui-textfield-input"/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Service Provider Name</label>
                    <input className="mdui-textfield-input" disabled/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Content</label>
                    <textarea className="mdui-textfield-input" rows="4"></textarea>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Location</label>
                    <input className="mdui-textfield-input"/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Postal code</label>
                    <input className="mdui-textfield-input" maxLength="6"/>
                </div>
            </div>
            <div className="mdui-row">
                <div className="mdui-textfield mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <label className="mdui-textfield-label">Start from</label>
                    <input className="mdui-textfield-input" type="time" name="appt-time"/>
                </div>
                <div className="mdui-textfield mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <label className="mdui-textfield-label">to</label>
                    <input className="mdui-textfield-input" type="time" name="appt-time"/>
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