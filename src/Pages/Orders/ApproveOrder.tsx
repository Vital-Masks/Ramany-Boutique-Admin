import { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrdersService from '../../Services/OrdersService';
import Swal from 'sweetalert2';
import 'react-dropzone-uploader/dist/styles.css';
import ReactToPrint from 'react-to-print';

let ApproveOrder = (props) => {
  const search = useLocation().search;
  const navigate = useNavigate();
  const componentRef = useRef(null);
  const orderId = new URLSearchParams(search).get('id');

  const [orderDetail, setOrderDetail] = useState({
    order: {},
  });

  const [customerDetail, setCustomerDetail] = useState({});
  const [clothDetail, setClothDetail] = useState<string[]>([]);
  const [jewelleryDetails, setJewelleryDetails] = useState<string[]>([]);
  const [buttonStatus, setButtonStatus] = useState('');

  const getOrderById = () => {
    OrdersService.getOrderById(orderId).then((response) => {
      let obj = response.data;
      console.log('res', obj);
      setOrderDetail(() => ({
        order: response.data,
      }));
      setCustomerDetail(obj.customerId);
      setClothDetail(obj.clothDetails);
      setJewelleryDetails(obj.jewelleryDetails);

      if (obj.orderType === 'Rent') {
        if (obj.status === 'Pending' || obj.status === 'pending') {
          setButtonStatus('Change To In Progress');
        }
        if (obj.status === 'InProgress') {
          setButtonStatus('Deliver The Order');
        }
        if (obj.status === 'Delivered') {
          setButtonStatus('Return Item');
        }
        if (obj.status === 'Returned') {
          setButtonStatus('Order Returned Successfully.');
        }
      }
      if (obj.orderType === 'Sale') {
        if (obj.status === 'Pending' || obj.status === 'pending') {
          setButtonStatus('Change To In Progress');
        }
        if (obj.status === 'InProgress') {
          setButtonStatus('Deliver The Order');
        }
        if (obj.status === 'Delivered') {
          setButtonStatus('Close The Order');
        }
        if (obj.status === 'Closed') {
          setButtonStatus('Order Closed Successfully.');
        }
      }
    });
  };

  const changeOrderStatus = () => {
    if (
      orderId &&
      order['status'] === 'Pending' &&
      buttonStatus === 'Change To In Progress'
    ) {
      Swal.fire({
        // title: "Are you sure ypu want to" + buttonStatus + "?",
        title: 'Are You Sure You Want To Change The Status ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
      }).then((result) => {
        if (result.isConfirmed) {
          OrdersService.changeOrderStatus(orderId, 'InProgress').then(
            (response) => {
              if (response['status'] === 200) {
                Swal.fire({
                  title: 'Success',
                  text: 'The Order Is In Progress',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    getOrderById();
                  }
                });
              } else {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Something Went Wrong',
                  icon: 'warning',
                  confirmButtonText: 'OK',
                });
              }
            }
          );
        }
      });
    }

    if (
      orderId &&
      order['status'] === 'InProgress' &&
      buttonStatus === 'Deliver The Order'
    ) {
      Swal.fire({
        title: 'Are You Sure You Want To ' + buttonStatus + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
      }).then((result) => {
        if (result.isConfirmed) {
          OrdersService.changeOrderStatus(orderId, 'Delivered').then(
            (response) => {
              if (response['status'] === 200) {
                Swal.fire({
                  title: 'Success',
                  text: 'The Order Has Been Delivered Successfully',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    getOrderById();
                  }
                });
              } else {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Something Went Wrong',
                  icon: 'warning',
                  confirmButtonText: 'OK',
                });
              }
            }
          );
        }
      });
    }
    if (
      orderId &&
      order['status'] === 'Delivered' &&
      order['orderType'] === 'Rent' &&
      buttonStatus === 'Return Item'
    ) {
      Swal.fire({
        title: 'Are You Sure You Want To' + buttonStatus + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
      }).then((result) => {
        if (result.isConfirmed) {
          OrdersService.changeOrderStatus(orderId, 'Returned').then(
            (response) => {
              if (response['status'] === 200) {
                Swal.fire({
                  title: 'Success',
                  text: 'The Order Has Been Returned Successfully',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    getOrderById();
                  }
                });
              } else {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Something Went Wrong',
                  icon: 'warning',
                  confirmButtonText: 'OK',
                });
              }
            }
          );
        }
      });
    }
    if (
      orderId &&
      order['status'] === 'Delivered' &&
      order['orderType'] === 'Sale' &&
      buttonStatus === 'Close The Order'
    ) {
      Swal.fire({
        title: 'Are You Sure You Want To ' + buttonStatus + '?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, change it!',
      }).then((result) => {
        if (result.isConfirmed) {
          OrdersService.changeOrderStatus(orderId, 'Closed').then(
            (response) => {
              if (response['status'] === 200) {
                Swal.fire({
                  title: 'Success',
                  text: 'The Order Has Been Closed Successfully',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    getOrderById();
                  }
                });
              } else {
                Swal.fire({
                  title: 'Oops!',
                  text: 'Something Went Wrong',
                  icon: 'warning',
                  confirmButtonText: 'OK',
                });
              }
            }
          );
        }
      });
    }
  };

  let { order } = orderDetail;

  useEffect(() => {
    getOrderById();
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
                This page has been enhanced for printing. Click the print button
                at the bottom of the invoice in order to print the invoice.
              </div>
              <div className="invoice p-3 mb-3" ref={componentRef}>
                <div className="row">
                  <div className="col-12">
                    <h4>
                      <i className="fas fa-globe" /> Ramany Boutique
                      <small className="float-right">
                        Date: {new Date(order['created_at']).toLocaleString()}
                      </small>
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
                      <strong style={{ textTransform: 'capitalize' }}>
                        {customerDetail['firstName']}
                      </strong>
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
                    <b>Order Type:</b> {order['orderType']}
                    <br />
                    <b>Status:</b>{' '}
                    {order['status'] === 'Pending' || 'pending' ? (
                      <strong style={{ color: 'red' }}>
                        {' '}
                        {order['status']}{' '}
                      </strong>
                    ) : order['status'] === 'InProgress' ? (
                      <strong style={{ color: 'blue' }}>
                        {' '}
                        {order['status']}{' '}
                      </strong>
                    ) : (
                      <strong style={{ color: 'green' }}>
                        {' '}
                        {order['status']}{' '}
                      </strong>
                    )}
                    <br />
                    <b>Account:</b> 968-34567
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 table-responsive">
                    {/* <h5>Cloth Details</h5>
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
                        {clothDetail.length > 0 &&
                          clothDetail.map((ord, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{ord["productName"]}</td>
                                <td>
                                  {ord["sizeAndCount"].map((or) => {
                                    return (
                                      <tr>
                                        <td>{or.size}</td>
                                      </tr>
                                    );
                                  })}
                                </td>
                                <td>
                                  {ord["sizeAndCount"].map((or) => {
                                    return (
                                      <tr>
                                        <td>{or.quantity}</td>
                                      </tr>
                                    );
                                  })}
                                </td>
                                <td>
                                  {ord["sizeAndCount"].map((or) => {
                                    return (
                                      <tr>
                                        <td>{or.subTotal}</td>
                                      </tr>
                                    );
                                  })}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table> */}
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
                        {jewelleryDetails.length > 0 &&
                          jewelleryDetails.map((jewel, index) => {
                            return (
                              <tr>
                                <td>{index + 1}</td>
                                <td>{jewel['productName']}</td>
                                <td>{jewel['quantity']}</td>
                                <td>{jewel['netPrice']}</td>
                              </tr>
                            );
                          })}
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
                      If there any descriptions about the Invoice, We can add in
                      this place. Lets ask from client
                    </p>
                  </div>
                  <div className="col-6">
                    <p className="lead">Amount Due 2/22/2014</p>
                    <div className="table-responsive">
                      <table className="table">
                        <tbody>
                          <tr>
                            <th style={{ width: '50%' }}>Net Price:</th>
                            <td>${order['totalCost']}</td>
                          </tr>
                          <tr>
                            <th>Tax (10%)</th>
                            <td>${order['totalCost'] / 10}</td>
                          </tr>
                          <tr>
                            <th>Shipping:</th>
                            <td>${order['totalCost'] / 500}</td>
                          </tr>
                          <tr>
                            <th>Total:</th>
                            <td>
                              $
                              {order['totalCost'] +
                                order['totalCost'] / 10 +
                                order['totalCost'] / 500}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="row no-print">
                  <div className="col-12">
                    {order['status'] !== 'Returned' &&
                    order['status'] !== 'Closed' ? (
                      <button
                        type="button"
                        onClick={changeOrderStatus}
                        className="btn btn-success"
                      >
                        <i className="far fa-credit-card" /> {buttonStatus}
                      </button>
                    ) : (
                      <button disabled type="button" className="btn btn-danger">
                        {buttonStatus}
                      </button>
                    )}
                    <ReactToPrint
                      content={() => componentRef.current}
                      trigger={() => (
                        <button
                          type="button"
                          className="btn btn-primary float-right"
                          style={{ marginRight: 5 }}
                        >
                          <i className="fas fa-download" /> Generate PDF
                        </button>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApproveOrder;
