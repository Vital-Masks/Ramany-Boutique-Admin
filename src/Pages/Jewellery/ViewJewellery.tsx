import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css';
import { Link, useNavigate } from 'react-router-dom';
import JewelleryService from '../../Services/JewelleryService';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

let ViewJewellerys = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [jewelleryData, setJewelleryData] = useState([]);
  const [total, setTotal] = useState(0);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  const fetchJewellery = async () => {
    try {
      setIsLoading(true);
      const response = await JewelleryService.getAllJewellerys();
      console.log(response.data);
      setJewelleryData(response.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 9) % jewelleryData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + 10;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(jewelleryData.slice(itemOffset, endOffset));
    setCurrentItems(jewelleryData.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(jewelleryData.length / 10));
  }, [jewelleryData, itemOffset]);

  useEffect(() => {
    fetchJewellery();
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
                fetchJewellery();
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

  function Items({ products }: any) {
    return products.map((jewellery: any) => {
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
              <button className="btn btn-block bg-gradient-info">View</button>
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
    });
  }

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

        <div className={`${styles.table} card-body`}>
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
              <Items products={currentItems} />
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

          <ReactPaginate
            breakLabel="..."
            nextLabel=" >>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="<<"
            className={styles.paginate}
            pageClassName={styles.break}
            previousClassName={styles.previous}
            nextClassName={styles.next}
            activeClassName={styles.active}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewJewellerys;
