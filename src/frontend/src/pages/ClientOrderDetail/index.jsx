import axios from 'axios';
import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"

export default function ClientOrderDetail() {

    const params = useParams();
    const navigate = useNavigate();
    const[post_title, setPost_title] = useState();
    const[provider_first_name, setProvider_first_name] = useState();
    const[provider_last_name, setProvider_last_name] = useState();
    const[date, setDate] = useState();
    const[start_time, setStart_time] = useState();
    const[post_price, setPost_price] = useState();
    const[duration, setDuration] = useState();
    const[total, setTotal] = useState();

    useEffect(() => {
        axios.get("/api/get_order_details/", {params:{oid: params.oid}}).then(
            result => {
                if(result.data.status === "failed") {
                    alert("get order failed, please try again!");
                } else {
                    setPost_title(result.data.post_title);
                    setProvider_first_name(result.data.provider_first_name);
                    setProvider_last_name(result.data.provider_last_name);
                    setDate(result.data.date);
                    setStart_time(result.data.start_time);
                    setPost_price(result.data.post_price);
                    setDuration(result.data.duration);
                    setTotal(result.data.total);
                }
            }, error => {
                console.log(error);
            }
        )
    }, []);

    function handlePay() {
        axios.get("/api/get_payment_link/").then(
            result => {
                if(result.data.status === "failed") {
                    alert("payment link failed, please try again!");
                } else {
                    axios.post("/api/complete_order/", {
                        oid: params.oid
                    }).then(
                        result => {
                            if(result.data.status === "failed") {
                                alert("complete order failed, please try again!");
                            }
                        }, error => {
                            console.log(error);
                        }
                    );
                    navigate("/clientorderHistory");
                    const w = window.open('_blank');
                    let url = result.data.link;
                    w.location.href = url;
                }
            }, error => {
                console.log(error);
            }
        )
    }

    return (
        <div className="mdui-container">
            <h1 className="mdui-text-center">Order Details</h1>
            <div className="mdui-row mdui-m-t-1">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-display-1">{post_title}</div>
                    <hr/>
                    <div className="mdui-typo-body-1">{`${provider_first_name} ${provider_last_name}`}</div>
                </div>
            </div>
            
            <div className="mdui-row mdui-m-t-5">
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Date</div>
                    <div className="mdui-typo-headline">{date}</div>
                </div>
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <div className="mdui-typo-title">Start time</div>
                    <div className="mdui-typo-headline"><small>{start_time}</small></div>
                </div>
            </div>
            <div className="mdui-row mdui-m-t-3">
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Price</div>
                    <div className="mdui-typo-headline"><small>CA$ {post_price}/hour</small></div>
                </div>
                <div className="mdui-col-xs-6 mdui-col-sm-4 mdui-col-lg-3">
                    <div className="mdui-typo-title">Hours</div>
                    <div className="mdui-typo-headline"><small>{duration} hour(s)</small></div>
                </div>
            </div>
            <div className="mdui-row mdui-m-t-3">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <div className="mdui-typo-title">Total Price <small>(10% platform fee + tax included)</small></div>
                    <div className="mdui-typo-headline"><small>CA$ {total}</small></div>
                </div>
            </div>
            <div className="mdui-row mdui-m-t-3">
                <div className="mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                    <button className="mdui-btn mdui-btn-block mdui-color-pink-accent mdui-ripple" onClick={handlePay}>Confirm and pay</button>
                </div>
            </div>
        </div>
    )
}