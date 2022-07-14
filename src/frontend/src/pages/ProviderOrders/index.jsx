import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ProviderOrders() {

    const[orderStatus, setOrderStatus] = useState("pending");

    useEffect(() => {
        mdui.mutation()
    })

    
    return(
        <div className="mdui-container">
            <h2 className="mdui-text-center">
                My Orders
            </h2>
            <div className="mdui-col-xs-12 mdui-col-sm-10 mdui-col-lg-8 mdui-col-offset-sm-1 mdui-col-offset-lg-2">
                <div className="mdui-panel" mdui-panel="{accordion: true}">
                    <div className="mdui-panel-item">
                        <div className="mdui-panel-item-header">
                            Title
                            <div className="mdui-toolbar-spacer"></div>
                            {
                                (() => {
                                    if (orderStatus === "pending") {
                                      return (
                                        <div className="mdui-chip mdui-shadow-0 mdui-color-blue-200">
                                            <span className="mdui-chip-title">Pending</span>
                                        </div>
                                      )
                                    } else if (orderStatus === "refused") {
                                      return (
                                        <div className="mdui-chip mdui-shadow-0 mdui-color-red-200">
                                            <span className="mdui-chip-title">Refused</span>
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
                            <p>Time</p>
                            <p>Date</p>
                            <p>Client</p>
                            <p>Service hours</p>
                            {
                                orderStatus === "pending" ? 
                                (
                                    <div>
                                        <button className="mdui-btn mdui-btn-dense mdui-color-green-200 mdui-ripple" onClick={() => setOrderStatus("accepted")}>
                                            Accept
                                        </button>
                                        <button className="mdui-btn mdui-btn-dense mdui-color-red-200 mdui-ripple mdui-m-x-3" onClick={() => setOrderStatus("refused")}>
                                            Refuse
                                        </button>
                                    </div>
                                ) :
                                (<div></div>)
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}