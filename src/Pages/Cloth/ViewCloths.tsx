import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ClothService from '../../Services/ClothService';
import Swal from 'sweetalert2';

let ViewCloths = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [clothData, setClothData] = useState([]);

  const fetchCloths = async () => {
    setIsLoading(true);
    try {
      const response = await ClothService.getAllCloths();
      setClothData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCloths();
  }, []);

  const deleteCloth = (clothId) => {
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
        ClothService.deleteCloth(clothId).then((response) => {
          if (response['status'] === 200) {
            Swal.fire({
              title: 'Deleted',
              text: 'Cloth Deleted Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                fetchCloths();
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
              <h3>Cloth List</h3>
            </div>
            <div className="col col-lg-2">
              <Link to="/addCloth">
                <button type="button" className="btn btn-block btn-success">
                  <i className="fa fa-home"></i> Add Cloth
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="card-body">
          <table id="example1" className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Cloth Name</th>
                <th>Cloth Code</th>
                <th>Cloth Type</th>
                <th>Gender</th>
                <th>Cloth Category </th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {clothData.length > 0 &&
                clothData.map((cloth) => {
                  return (
                    <tr key={cloth['_id']}>
                      <td>{cloth['clothName']}</td>
                      <td>{cloth['clothCode']}</td>
                      <td>{cloth['clothType']}</td>
                      <td>{cloth['gender']}</td>
                      <td>
                        {cloth['clothingCategoryId']
                          ? cloth['clothingCategoryId']['categoryName']
                          : null}
                      </td>
                      <td>{cloth['price']}</td>
                      <td>{cloth['discount']}</td>
                      {/* <td>{cloth['mainImage']}</td>
                                            <td>{cloth['subImage']}</td> */}
                      <td>
                        <Link
                          to={{
                            pathname: '/addCloth',
                            search: `?id=${cloth['_id']}`,
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
                          onClick={() => deleteCloth(cloth['_id'])}
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
                !clothData.length && (
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

export default ViewCloths;
