import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css';
import { Link, useNavigate } from 'react-router-dom';
import JewelleryService from '../../Services/JewelleryService';
import Swal from 'sweetalert2';

let ViewJewellerys = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [jewelleryData, setJewelleryData] = useState([]);

  const fetchJewellery = async () => {
    try {
      setIsLoading(true);
      const response = await JewelleryService.getAllJewellerys();
      setJewelleryData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const fetchJewellerys = async () => {
    fetchJewellery();
  };

  useEffect(() => {
    fetchJewellerys();
  }, []);

  const deleteJewellery = (jewelleryId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        JewelleryService.deleteJewellery(jewelleryId).then((response) => {
          if (response['status'] === 200) {
            Swal.fire({
              title: 'Deleted',
              text: 'Jewellery Deleted Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                // navigate("/viewCloths")
                fetchJewellerys();
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
        });
      }
    });
  };

  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-header ">
          <br></br>
          <div className="row">
            <div className="col ">
              <h3>Jewellery List</h3>
            </div>
            <div className="col col-lg-2">
              <Link to="/addJewellery">
                <button type="button" className="btn btn-block btn-success">
                  <i className="fa fa-home"></i>Add Jewellery
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table id="example1" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Jewellery Name</th>
                <th>Jewellery Code</th>
                <th>Jewellery Type</th>
                <th>Gender</th>
                <th>Jewellery Category </th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {jewelleryData.length > 0 &&
                jewelleryData.map((jewellery: any) => {
                  return (
                    <tr key={jewellery['_id']}>
                      <td>{jewellery['jewelleryName']}</td>
                      <td>{jewellery['jewelleryCode']}</td>
                      <td>{jewellery['jewelleryType']}</td>
                      <td>{jewellery['gender']}</td>
                      <td>{jewellery?.jewelleryingCategoryId?.categoryName}</td>
                      <td>{jewellery['price']}</td>
                      <td>{jewellery['discount']}</td>
                      <td>
                        <Link
                          to={{
                            pathname: '/addJewellery',
                            search: `?id=${jewellery['_id']}`,
                          }}
                        >
                          <button className="btn btn-block bg-gradient-info">
                            View
                          </button>
                        </Link>{' '}
                      </td>
                      <td>
                        <button
                          className="btn btn-block bg-gradient-danger"
                          onClick={() => deleteJewellery(jewellery['_id'])}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

              {isLoading ? (
                <tr>
                  <td className="text-center" colSpan={8}>
                    Loading...
                  </td>
                </tr>
              ) : (
                !jewelleryData.length && (
                  <tr>
                    <td className="text-center" colSpan={8}>
                      No Data!
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewJewellerys;
