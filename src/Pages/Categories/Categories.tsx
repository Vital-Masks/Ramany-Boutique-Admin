import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css';
import { Link, useNavigate } from 'react-router-dom';
import CategoryService from '../../Services/CategoryService';
import Swal from 'sweetalert2';
import ClothService from '../../Services/ClothService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';

let Categories = () => {
  const navigate = useNavigate();
  let occasionsTemp: string[] = [];
  let jewelleryTemp: string[] = [];
  let clothTemp: string[] = [];
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [categoryType, setcategoryType] = useState('default');
  const [categoryName, setcategoryName] = useState('');

  const [occasions, setoccasions] = useState([{}]);
  const [jewelleryCategories, setJewelleryCategories] = useState([{}]);
  const [clothCategories, setClothCategories] = useState([{}]);

  const getAllCategories = async () => {
    setIsLoading(true);
    CategoryService.getAllCategories().then((response) => {
      let categoryResponse = response.data;
      categoryResponse.length > 0 &&
        categoryResponse.map((dd) => {
          if (dd.categoryType === 'occasionType') {
            occasionsTemp.push(dd);
          }
          if (dd.categoryType === 'jewelleryCategory') {
            jewelleryTemp.push(dd);
          }
          if (dd.categoryType === 'clothingCategory') {
            clothTemp.push(dd);
          }
        });
      setoccasions(occasionsTemp);
      setJewelleryCategories(jewelleryTemp);
      setClothCategories(clothTemp);
      setIsLoading(false);
    });
  };

  const saveCategory = async (e) => {
    e.preventDefault();
    let categoryObj = {
      categoryType: categoryType,
      categoryName: categoryName,
    };

    if (!categoryType || !categoryName) {
      Swal.fire({
        title: 'Warning!',
        text: 'Category type or Category name missing',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    } else {
      CategoryService.saveCategory(categoryObj)
        .then((response) => {
          if (response['status'] === 200) {
            Swal.fire({
              title: 'Success',
              text: 'Category saved successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                getAllCategories();
              }
            });
            setcategoryType('default');
            setcategoryName('');
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Oops!',
            text: 'Category type or Category name missing',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        });
    }
  };
  const showUpdateAlert = (categoryId, categoryName, categoryType) => {
    Swal.fire({
      title: 'Update Category',
      input: 'text',
      inputValue: categoryName,
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Update',
      showLoaderOnConfirm: true,
      inputValidator: (value) => {
        if (!value) return 'Field cannot be null';
        if (value.length > 15) return 'Characters must be less than 15';
        else return null;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        updateCategory(categoryId, result.value, categoryType);
        console.log('res', result);
      }
    });
  };
  const updateCategory = (categoryId, categoryName, categoryType) => {
    let updatedObj = {
      _id: categoryId,
      categoryName: categoryName,
      categoryType: categoryType,
    };

    CategoryService.updateCategoryById(categoryId, updatedObj)
      .then((response) => {
        if (response['status'] === 200) {
          Swal.fire({
            title: 'Success',
            text: 'Category updated successfully',
            icon: 'success',
            confirmButtonText: 'OK',
          }).then((result) => {
            if (result.isConfirmed) {
              getAllCategories();
            }
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: 'Oops!',
          text: 'Something Went Wrong',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      });
  };

  const deleteCategory = (categoryId) => {
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
        CategoryService.deleteCategory(categoryId).then((response) => {
          if (response['status'] === 200) {
            Swal.fire({
              title: 'Deleted',
              text: 'Category Deleted Successfully',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then((result) => {
              if (result.isConfirmed) {
                getAllCategories();
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

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <br></br>
            <div className="col-sm-6">
              <h1>Categories</h1>
            </div>

            <div className="card ">
              <div className="card-header ">
                <div className="row">
                  <div className="col-5">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Choose Category
                      </label>
                      <div className="col-sm-8">
                        <select
                          className="custom-select"
                          value={categoryType}
                          onChange={(e) => {
                            setcategoryType(e.target.value);
                          }}
                        >
                          <option value={'default'} disabled>
                            Choose an option
                          </option>
                          <option key="occasionType" value="occasionType">
                            Occasion Type
                          </option>
                          <option
                            key="clothingCategory"
                            value="clothingCategory"
                          >
                            Clothing Category
                          </option>
                          <option
                            key="jewelleryCategory"
                            value="jewelleryCategory"
                          >
                            Jewellery Category
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="form-group row">
                      <label className="col-sm-4 col-form-label">
                        Category Name
                      </label>
                      <div className="col-sm-8">
                        <input
                          type="text"
                          className="form-control"
                          id="categoryName"
                          placeholder="Category Name"
                          value={categoryName}
                          onChange={(e) => {
                            setcategoryName(e.target.value);
                            categoryName.length > 15
                              ? setError('Too long')
                              : setError('');
                          }}
                        ></input>
                        <small style={{ color: 'red' }}>{error}</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-2">
                    <button
                      type="button"
                      className="btn btn-block btn-success"
                      onClick={saveCategory}
                      disabled={categoryName.length > 15}
                    >
                      <i className="fab fa-creative-commons-nd"></i>Add Category
                    </button>
                  </div>
                </div>
              </div>
              <br></br>
              <div className="row">
                <div className="col-md-6">
                  <div className={`card card-body ${styles.marginCard}`}>
                    {/* <div className="card-header "> */}
                    <h3>Occasion Type</h3>
                    {/* </div> */}
                    {isLoading ? (
                      // <tr>
                      <div className="text-center">Loading...</div>
                    ) : // </tr>
                    occasions.length ? (
                      occasions.map((occasion, index) => {
                        return (
                          <div className="row">
                            <div className="col-md-6">
                              {/* <div className="form-group row"> */}
                              {/* <div className="col-sm-10"> */}
                              <input
                                type="text"
                                className="form-control"
                                id={occasion['categoryName']}
                                onChange={(e) => e.target.value}
                                value={occasion['categoryName']}
                              ></input>
                              {/* </div> */}
                              {/* </div> */}
                            </div>
                            <div className="col-sm-3">
                              <div style={{ marginRight: 4 }}>
                                <button
                                  type="button"
                                  className="btn btn-block btn-success"
                                  onClick={() =>
                                    showUpdateAlert(
                                      occasion['_id'],
                                      occasion['categoryName'],
                                      occasion['categoryType']
                                    )
                                  }
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                  Update
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group row">
                                <button
                                  type="button"
                                  className=" btn btn-block btn-danger"
                                  onClick={() =>
                                    deleteCategory(occasion['_id'])
                                  }
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center">No Data!</div>
                    )}
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div className={`card card-body ${styles.marginCard}`}>
    
                    <h3>Clothing Category</h3>
       
                    {isLoading ? (
        
                      <div className="text-center">Loading...</div>
                    ) : 
                    clothCategories.length ? (
                      clothCategories.map((cloth, index) => {
                        return (
                          <div className="row">
                            <div className="col-md-6">
                      
                              <input
                                type="text"
                                className="form-control"
                                id={cloth['categoryName']}
                                onChange={(e) => e.target.value}
                                value={cloth['categoryName']}
                              ></input>
                            </div>
                            <div className="col-sm-3">
                              <div style={{ marginRight: 4 }}>
                                <button
                                  type="button"
                                  className="btn btn-block btn-success"
                                  onClick={() =>
                                    showUpdateAlert(
                                      cloth['_id'],
                                      cloth['categoryName'],
                                      cloth['categoryType']
                                    )
                                  }
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                  Update
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group row">
                                <button
                                  type="button"
                                  className=" btn btn-block btn-danger"
                                  onClick={() => deleteCategory(cloth['_id'])}
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center">No Data!</div>
                    )}
                  </div>
                </div> */}

                <div className="col-md-6">
                  <div className={`card card-body ${styles.marginCard}`}>
                    {/* <div className="card-header "> */}
                    <h3>Jewellery Category</h3>
                    {/* </div> */}
                    {isLoading ? (
                      // <tr>
                      <div className="text-center">Loading...</div>
                    ) : // </tr>
                    jewelleryCategories.length ? (
                      jewelleryCategories.map((jewellery, index) => {
                        return (
                          <div className="row">
                            <div className="col-md-6">
                              {/* <div className="form-group row"> */}
                              {/* <div className="col-sm-10"> */}
                              <input
                                type="text"
                                className="form-control"
                                id={jewellery['categoryName']}
                                onChange={(e) => e.target.value}
                                value={jewellery['categoryName']}
                              ></input>
                              {/* </div> */}
                              {/* </div> */}
                            </div>
                            <div className="col-sm-3">
                              <div style={{ marginRight: 4 }}>
                                <button
                                  type="button"
                                  className="btn btn-block btn-success"
                                  onClick={() =>
                                    showUpdateAlert(
                                      jewellery['_id'],
                                      jewellery['categoryName'],
                                      jewellery['categoryType']
                                    )
                                  }
                                >
                                  <i className="fa-regular fa-pen-to-square"></i>
                                  Update
                                </button>
                              </div>
                            </div>
                            <div className="col-sm-3">
                              <div className="form-group row">
                                <button
                                  type="button"
                                  className=" btn btn-block btn-danger"
                                  onClick={() =>
                                    deleteCategory(jewellery['_id'])
                                  }
                                >
                                  <i className="fa-regular fa-trash-can"></i>
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center">No Data!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
