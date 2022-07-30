import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
export default function ClientorderHistory() {

    const[orders, setOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        mdui.mutation();
        axios.get("/api/get_client_order/").then(
            result => {
                if (result.data.status === 'succeeded') {
                    setOrders(result.data.result);
                }
                else {
                    alert('load list failed, please try again.');
                }
            }, error => {
                console.log("error")
            }
        )
    }, [])

    function handleComplete(oid) {
        navigate('/clientorderdetail/' + oid);
    }
    
    return(
        <div className="mdui-container">
            <h2 className="mdui-text-center">
                Order History
            </h2>
            <div className="mdui-col-xs-12 mdui-col-sm-10 mdui-col-lg-8 mdui-col-offset-sm-1 mdui-col-offset-lg-2">
                <div className="mdui-panel" mdui-panel="{accordion: true}">
                {
                    orders.map(order => {
                        return (
                            <div className="mdui-panel-item" key={order.oid}>
                                <div className="mdui-panel-item-header">
                                    {order.post_title}
                                    <div className="mdui-toolbar-spacer"></div>
                                    {
                                        (() => {
                                            if (order.status === "pending") {
                                                return (
                                                    <div className="mdui-chip mdui-shadow-0 mdui-color-blue-200">
                                                        <span className="mdui-chip-title">Pending</span>
                                                    </div>
                                                )
                                            } else if (order.status === "rejected") {
                                                return (
                                                    <div className="mdui-chip mdui-shadow-0 mdui-color-red-200">
                                                        <span className="mdui-chip-title">Refused</span>
                                                    </div>
                                                )
                                            } else if (order.status === "completed") {
                                                return (
                                                    <div className="mdui-chip mdui-shadow-0 mdui-color-grey-200">
                                                        <span className="mdui-chip-title">Completed</span>
                                                    </div>
                                                )
                                            } else {
                                                return (
                                                    <div className="mdui-chip mdui-shadow-0 mdui-color-green-200">
                                                        <span className="mdui-chip-title">Accepted</span>
                                                    </div>
                                                )
                                            }
                                        })()
                                    }
                                    
                                </div>
                                <div className="mdui-panel-item-body">
                                    <p>Time: {order.start_time}</p>
                                    <p>Date: {order.date}</p>
                                    <p>Provider: {`${order.provider_first_name} ${order.provider_last_name}`}</p>
                                    <p>Hours of service: {order.duration}</p>
                                    <p>Price: {order.post_price}</p>
                                    <button className="mdui-btn mdui-btn-dense mdui-color-blue-100 mdui-ripple" onClick={() => handleComplete(order.oid)}>
                                        Complete the Order
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }     
                    
                </div>
            </div>
            
        </div>
    )
}