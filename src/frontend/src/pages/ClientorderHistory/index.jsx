import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ClientorderHistory() {

    const orderStatus = "accepted";

    useEffect(() => {
        mdui.mutation()
    })

    
    return(
        <div className="mdui-container">
            <h2 className="mdui-text-center">
                Order History
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
                            <p>Content</p>
                            <p>Time</p>
                            <p>Date</p>
                            <p>Provider</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}