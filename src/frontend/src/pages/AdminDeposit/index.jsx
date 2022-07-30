import mdui from 'mdui'
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
export default function AdminDeposit() {
    const navigate = useNavigate();

    const[orders, setOrders] = useState([]);
    let change = 0;

    useEffect(() => {
        mdui.mutation();
        axios.get("/api/get_unpaid_order_list/").then(
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

    function handlePay(oid) {
        axios.post("/api/pay_salary/", {
            oid: oid,
        }).then(
            result => {
                if (result.data.status === 'succeeded') {
                    axios.get("/api/get_unpaid_order_list/").then(
                        result => {
                            if (result.data.status === 'succeeded') {
                                setOrders(result.data.result);
                                change++;
                                alert('order status updated!');
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

    function handleBack(){
        navigate("/admin");
    }

    
    return(
        <div className="mdui-container">
            <div class="mdui-typo">
                <h2 className="mdui-text-center">
                    Unpaid orders
                </h2>
                <h3 className="mdui-text-center">
                    <small>(Deposit providers' salary by e-transfer)</small>
                </h3>
            </div>
            
            <div className="mdui-col-xs-12 mdui-col-sm-10 mdui-col-lg-8 mdui-col-offset-sm-1 mdui-col-offset-lg-2">
                <div className="mdui-panel" mdui-panel="{accordion: true}">
                {
                    orders.map(order => {
                        return (
                            <div className="mdui-panel-item" key={order.oid}>
                                <div className="mdui-panel-item-header">
                                    {order.post_title}
                                </div>
                                <div className="mdui-panel-item-body">
                                    <p>Time: {order.start_time}</p>
                                    <p>Date: {order.date}</p>
                                    <p>Provider: {`${order.provider_first_name} ${order.provider_last_name}`}</p>
                                    <p>Provider email: {order.provider_email}</p>
                                    <p>Need to pay: ${order.salary}</p>
                                    <button className="mdui-btn mdui-btn-dense mdui-color-pink mdui-ripple" onClick={() => handlePay(order.oid)}>
                                        Pay the provider
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }     
                    
                </div>
                <div className="mdui-row mdui-m-t-5">
                    <div className="mdui-col mdui-col-xs-12 mdui-col-sm-8 mdui-col-lg-6 mdui-col-offset-sm-2 mdui-col-offset-lg-3">
                        <button className="mdui-btn mdui-color-pink-accent mdui-ripple mdui-btn-block" onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}