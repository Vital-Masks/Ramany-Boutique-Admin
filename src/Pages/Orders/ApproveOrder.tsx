import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css'
import { Link, useLocation } from 'react-router-dom'
import OrdersService from '../../Services/OrdersService'
import Swal from 'sweetalert2'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { FormValidator } from '@syncfusion/ej2-inputs';
import { capitalize } from '@mui/material';



let ApproveOrder = () => {
  

    const search = useLocation().search;
    const orderId = new URLSearchParams(search).get('id')


    const [orderDetail, setOrderDetail] = useState({
        order: {}
    });



    const [customerDetail, setCustomerDetail] = useState({});
    const [clothDetail, setClothDetail] = useState<string[]>([]);
    const [jewelleryDetails, setJewelleryDetails] = useState<string[]>([]);


    // const [customerName, setCustomerName] = useState("");
    // const [customerEmail, setcustomerEmail] = useState("");
    // const [totalCost, setTotalCost] = useState("");
    // const [productName, setproductName] = useState("");
    // const [sizeAndCount, setSizeAndCount] = useState({});
    // const [totalCost, setTotalCost] = useState("");
    // const [totalCost, setTotalCost] = useState("");
    // const [totalCost, setTotalCost] = useState("");
   


   
    const getOrderById = () => {
        OrdersService.getOrderById(orderId).then(response => {
            let obj = response.data
            console.log("res", obj)
            setOrderDetail(() => ({
                order: response.data
            }))
            setCustomerDetail(obj.customerId)
            setClothDetail(obj.clothDetails)
            setJewelleryDetails(obj.jewelleryDetails)
            // setjewelleryName(obj.jewelleryName)
            // setjewelleryCode(obj.jewelleryCode)
           

        })

    }

    
    

    let { order } = orderDetail

    useEffect(() => {
        getOrderById()
    }, []);

    return (
        <div className="content-wrapper">
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Invoice</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active">Invoice</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="callout callout-info">
                                <h5>
                                    <i className="fas fa-info" /> Note:
                                </h5>
                                This page has been enhanced for printing. Click the print button at
                                the bottom of the invoice in order to print the invoice.
                            </div>
                            <div className="invoice p-3 mb-3">
                                <div className="row">
                                    <div className="col-12">
                                        <h4>
                                            <i className="fas fa-globe" /> Ramany Boutique
                                            <small className="float-right">Date: 09/08/2022</small>
                                        </h4>
                                    </div>
                                </div>
                                <div className="row invoice-info">
                                    <div className="col-sm-4 invoice-col">
                                        From
                                        <address>
                                            <strong>Ramany Boutique</strong>
                                            <br />
                                            Dubai Main Road, 
                                            <br />
                                            Dumai Kurukku santhu,
                                            <br />
                                            Dubai.
                                            <br />
                                            Phone: (804) 123-5432
                                            <br />
                                            Email:yathushan@gmail.com
                                        </address>
                                    </div>
                                    <div className="col-sm-4 invoice-col">
                                        To
                                        <address>
                                            <strong style={{ textTransform: 'capitalize'}}>{customerDetail['firstName']}</strong>
                                            <br />
                                            {customerDetail['address']},
                                            <br />
                                            {customerDetail['city']},
                                            <br />
                                            {customerDetail['country']}.
                                            <br />
                                            Phone: {customerDetail['phone']}
                                            <br />
                                            Email: {customerDetail['email']}
                                        </address>
                                    </div>
                                    <div className="col-sm-4 invoice-col">
                                        <b>Invoice: {order['_id']}</b>
                                        <br />
                                        <br />
                                        <b>Order ID:</b> {order['_id']}
                                        <br />
                                        <b>Status:</b> { order['status'] === 'Pending'? <strong style={{color: 'red'}} > {order['status']} </strong>: <strong style={{color: 'green'}} > order['status'] </strong> }
                                        <br />
                                        <b>Account:</b> 968-34567
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 table-responsive">
                                    <h5>Cloth Details</h5>
                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Product Name</th>
                                                    <th>Size</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                   clothDetail.length > 0 && clothDetail.map((ord, index) => {
                                                        return (
                                                            <tr >
                                                                <td>{index + 1}</td>
                                                                <td>{ord['productName']}</td>
                                                                <td>{
                                                                    ord['sizeAndCount'].map(or => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{or.size}</td>
                                                                            </tr>

                                                                        )

                                                                    })

                                                                }
                                                                </td>
                                                                <td>{
                                                                    ord['sizeAndCount'].map(or => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{or.quantity}</td>
                                                                            </tr>

                                                                        )

                                                                    })

                                                                }
                                                                </td>
                                                                <td>{
                                                                    ord['sizeAndCount'].map(or => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{or.subTotal}</td>
                                                                            </tr>

                                                                        )

                                                                    })

                                                                }
                                                                </td>
                                                                
                                                            </tr>
                                                        )
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                        <h5>Jewellery Details</h5>


                                        <table className="table table-striped">
                                            <thead>
                                                <tr>
                                                    <th>No</th>
                                                    <th>Product Name</th>
                                                    <th>Quantity</th>
                                                    <th>Subtotal</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                   jewelleryDetails.length > 0 && jewelleryDetails.map((jewel,index) => {
                                                        return (
                                                            <tr >
                                                                <td>{index + 1}</td>
                                                                <td>{jewel['productName']}</td>
                                                                <td>{jewel['quantity']}</td>
                                                                <td>{jewel['netPrice']}</td>
                                                                     
                                                            </tr>
                                                        )
                                                        })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <p className="lead">Payment Methods:</p>
                                        <img src="../../dist/img/credit/visa.png" alt="Visa" />
                                        <img
                                            src="../../dist/img/credit/mastercard.png"
                                            alt="Mastercard"
                                        />
                                        <img
                                            src="../../dist/img/credit/american-express.png"
                                            alt="American Express"
                                        />
                                        <img src="../../dist/img/credit/paypal2.png" alt="Paypal" />
                                        <p
                                            className="text-muted well well-sm shadow-none"
                                            style={{ marginTop: 10 }}
                                        >
                                            If there any descriptions about the Invoice, We can add in this place. Lets ask from client
                                        </p>
                                    </div>
                                    <div className="col-6">
                                        <p className="lead">Amount Due 2/22/2014</p>
                                        <div className="table-responsive">
                                            <table className="table">
                                                <tbody>
                                                    <tr>
                                                        <th style={{ width: "50%" }}>Net Price:</th>
                                                        <td>${order['totalCost']}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Tax (10%)</th>
                                                        <td>${order['totalCost']/10}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Shipping:</th>
                                                        <td>${order['totalCost']/500}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total:</th>
                                                        <td>${order['totalCost'] + order['totalCost']/10 + order['totalCost']/500}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="row no-print">
                                    <div className="col-12">

                                        <button type="button" className="btn btn-success ">
                                            <i className="far fa-credit-card" /> Approve Order
                                        </button>


                                        <button
                                            type="button"
                                            className="btn btn-primary float-right"
                                            style={{ marginRight: 5 }}
                                        >
                                            <i className="fas fa-download" /> Generate PDF
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>


    );
}

export default ApproveOrder