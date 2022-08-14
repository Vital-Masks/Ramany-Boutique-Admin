import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css'
import { Link } from 'react-router-dom'
import OrdersService from '../../Services/OrdersService'
import Swal from 'sweetalert2'

let ViewOrders = () => {

    const [ordersData, setOrdersData] = useState({
        orders: []
    });
  

    useEffect(() => {
        OrdersService.getAllOrders().then((response) => {
            console.log(response)
            setOrdersData(() => ({
                orders: response.data
            }))

        }).catch((err) => {
            console.log(err)
        })      
        
    }, []);

    const deleteOrder = (orderId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          OrdersService.deleteOrder(orderId).then((response) => {
            if (response["status"] === 200) {
              Swal.fire({
                title: "Deleted",
                text: "Order Deleted Successfully",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result)=>{
                if(result.isConfirmed){ 
                    window.location.reload()
                }
              });
              
            } else {
              Swal.fire({
                title: "Oops!",
                text: "Something Went Wrong",
                icon: "warning",
                confirmButtonText: "OK",
              });
            }
          });
        }
      });
    };

    


    let { orders } = ordersData


    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header ">
                    <br></br>
                    <div className="row">
                        <div className="col ">
                            <h3>Orders List</h3>
                        </div>
                        {/* <div className="col col-lg-2">
                        <Link to='/addJewellery'>
                            <button type="button" className="btn btn-block btn-success"><i className="fa fa-home" ></i>Add Jewellery</button>
                            </Link>
                        </div> */}
                    </div>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Customer Name</th>
                                <th>Total Cost </th>
                                <th>Status</th>
                                {/* <th>Discount</th> */}
                                {/* <th>Main Image</th>
                                <th>Sub Image</th> */}
                            </tr>                           
                        </thead>
                        <tbody>
                            {
                                orders.length > 0 && orders.map(order => {
                                    return (
                                        <tr key={order['_id']}>
                                            <td>{order['_id']}</td>
                                            <td>{order['customerId']['firstName']}</td>
                                            <td>{order['totalCost']}</td>
                                            <td>{order['status']}</td>
                                            {/* <td>{jewellery['jewelleryingCategoryId']['categoryName']}</td>
                                            <td>{jewellery['price']}</td>
                                            <td>{jewellery['discount']}</td> */}
                                            {/* <td>{jewellery['mainImage']}</td>
                                            <td>{jewellery['subImage']}</td> */}
                                            <td><Link to={{pathname:'/approveOrder', search:`?id=${order['_id']}`}} ><button className="btn btn-block bg-gradient-info">View</button></Link> </td>
                                            <td><button className="btn btn-block bg-gradient-danger" onClick={()=>deleteOrder(order['_id'])} >Delete</button></td>
                                        </tr>                                        
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewOrders;