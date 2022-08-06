import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ProviderOrders() {

    const[orders, setOrders] = useState([]);
    let change = 0;
    useEffect(() => {
        mdui.mutation();
        axios.get("/api/get_provider_order/").then(
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
    }, [change])

    function handleAccept(oid, action) {
        axios.post("/api/accept_order/", {
            oid: oid,
            accept: action
        }).then(
            result => {
                if (result.data.status === 'succeeded') {
                    axios.get("/api/get_provider_order/").then(
                        result => {
                            if (result.data.status === 'succeeded') {
                                setOrders(result.data.result);
                                change++;
                            }
                            else if(result.data.error_id === -4) {
                                alert('There is time conflict between your orders.');
                            }
                            else {
                                alert('load list failed, please try again.');
                            }
                        }, error => {
                            console.log("error")
                        }
                        
                    )
                }
                else {
                    alert('save failed, please try again.');
                }
            }, error => {
                console.log("error")
            }
        )
    }

    return(
        <div className="mdui-container">
            <h2 className="mdui-text-center">
                Orders booked with me
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
                                    <p>Client: {`${order.client_first_name} ${order.client_last_name}`}</p>
                                    <p>Location: {order.client_location}</p>
                                    <p>Postal Code: {order.client_postal_code}</p>
                                    <p>Hours of service: {order.duration} hour(s)</p>
                                    {
                                        order.status === "pending" ? 
                                        (
                                            <div>
                                                <button className="mdui-btn mdui-btn-dense mdui-color-green-200 mdui-ripple" onClick={() => handleAccept(order.oid, true)}>
                                                    Accept
                                                </button>
                                                <button className="mdui-btn mdui-btn-dense mdui-color-red-200 mdui-ripple mdui-m-x-3" onClick={() => handleAccept(order.oid, false)}>
                                                    Refuse
                                                </button>
                                            </div>
                                        ) :
                                        (<div></div>)
                                    }
                                    
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