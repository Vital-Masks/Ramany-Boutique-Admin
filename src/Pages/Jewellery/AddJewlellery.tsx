import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css';
import { Link } from 'react-router-dom';
import JewelleryService from '../../Services/JewelleryService';
import Swal from 'sweetalert2';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { FormValidator } from '@syncfusion/ej2-inputs';
import { any, string } from 'prop-types';

let formObject;

let AddJewellery = () => {
  let occasionsTemp: string[] = [];
  let categoriesTemp: string[] = [];

  const [occasions, setoccasions] = useState([{}]);
  const [jewelleryingCategories, setJewelleryingCategories] = useState([{}]);

  const [jewelleryName, setjewelleryName] = useState('');
  const [jewelleryCode, setjewelleryCode] = useState('');
  const [jewelleryType, setJewelleryType] = useState('');
  const [gender, setGender] = useState('');
  const [occasionTypeId, setoccasionTypeId] = useState<string[]>([]);
  const [jewelleryingCategoryId, setjewelleryingCategoryId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setprice] = useState('');
  const [discount, setdiscount] = useState('');
  const [mainImage, setMainImage] = useState<any>({
    file: null,
    base64URL: any,
  });
  const [subImage, setSubImage] = useState<any[]>([]);
  const [description, setdescription] = useState('');
  const [inclusions, setinclusions] = useState('');
  const [gemStones, setgemStones] = useState('');
  const [metalAndFinish, setmetalAndFinish] = useState('');
  const [style, setstyle] = useState('');
  const [detailing, setdetailing] = useState('');
  const [customization, setcustomization] = useState('');

  const getAllCategories = async () => {
    JewelleryService.getAllCategories().then((response) => {
      let categoryResponse = response.data;
      categoryResponse.length > 0 &&
        categoryResponse.map((dd) => {
          if (dd.categoryType === 'occasionType') {
            occasionsTemp.push(dd);
          }
          if (dd.categoryType === 'jewelleryCategory') {
            categoriesTemp.push(dd);
          }
        });
      setoccasions(occasionsTemp);
      setJewelleryingCategories(categoriesTemp);
    });
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let fileInfo;
      let baseURL: any;
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
        // console.log("Called", reader);
        baseURL = reader.result;
        // console.log(baseURL);
        resolve(baseURL);
      };
      //   console.log(fileInfo);
    });
  };

  const onMainImageChange = ({ meta, file }, status) => {
    if (status === 'done') {
      console.log('fileParams', file, meta);

      // setMainImage([...mainImage, file]);
      // body.append('mainImage', file)
      getBase64(file)
        .then((result) => {
          file['base64'] = result;
          // console.log("File Is", typeof(result) );
          setMainImage({
            base64URL: result,
            file: meta,
          });
        })
        .catch((err) => {
          console.log(err);
        });
      // setMainImage(file);
    }

    if (status === 'removed') {
      // setMainImage(mainImage.filter((x) => x.file.id !== meta.id));
      setMainImage([]);
    }
  };

  const onSubImageChange = ({ meta, file }, status) => {
    if (status === 'done') {
      // setSubImage([...subImage, file]);
      // setSubImage(file);
      getBase64(file)
        .then((result) => {
          file['base64'] = result;
          // console.log("File Is", typeof(result) );
          setSubImage([
            ...subImage,
            {
              base64URL: result,
              file: meta,
            },
          ]);
        })
        .catch((err) => {
          console.log(err);
        });
      // body.append('mainImage', file)
    }

    if (status === 'removed') {
      setSubImage(subImage.filter((x) => x.file.id !== meta.id));
    }
  };

  const getFilesFromEvent = (e) => {
    // return new Promise(resolve => {
    return getDroppedOrSelectedFiles(e).then((chosenFiles) => {
      // resolve(chosenFiles.map(f => f.fileObject))
      return chosenFiles.map((f) => f.fileObject);
      // })
    });
  };

  const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
    const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files';
    return (
      <label className="btn btn-danger mt-4">
        {textMsg}
        <input
          style={{ display: 'none' }}
          type="file"
          accept={accept}
          onChange={(e) => {
            getFilesFromEvent(e).then((chosenFiles) => {
              onFiles(chosenFiles);
            });
          }}
        />
      </label>
    );
  };

  const saveJewellery = async (e) => {
    e.preventDefault();

    let jewellery = {
      jewelleryName: jewelleryName,
      jewelleryCode: jewelleryCode,
      jewelleryType: jewelleryType,
      gender: gender,
      occasionTypeId: occasionTypeId,
      jewelleryingCategoryId: jewelleryingCategoryId,
      quantity: quantity,
      price: price,
      discount: discount,
      description: description,
      inclusions: inclusions,
      gemStones: gemStones,
      metalAndFinish: metalAndFinish,
      style: style,
      detailing: detailing,
      customization: customization,
      mainImage: mainImage,
      subImage: subImage,
    };
    formObject.validate();
    if (formObject.validate()) {
      if (
        jewellery.mainImage.file === null ||
        !jewellery.occasionTypeId ||
        !jewellery.jewelleryingCategoryId
      ) {
        Swal.fire({
          title: 'Warning',
          text: 'Mandatory data missing',
          icon: 'warning',
          confirmButtonText: 'OK',
        });
      } else {
        JewelleryService.saveJewellerys(jewellery)
          .then((response) => {
            if (response['status'] === 200) {
              Swal.fire({
                title: 'Success',
                text: 'Jewellery saved successfully',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              formObject.element.reset();
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
      }
    }
  };

  let handleCheckboxChange = (event) => {
    const target = event.target;
    var value = target.value;
    if (target.checked) {
      setoccasionTypeId((preValues) => [...preValues, value]);
    } else {
      occasionTypeId.splice(value, 1);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  useEffect(() => {
    const options = {
      // validation rules
      rules: {
        jewelleryName: {
          required: [true, '* Please enter the Jewellery Name'],
        },
        jewelleryCode: {
          required: [true, '* Please enter your Jewellery Code'],
        },
        jewelleryType: {
          required: [true, '* Please select atleast one Jewellery Type'],
        },
        gender: {
          required: [true, '* Please select atleast one gender'],
        },
        // occasionTypeId: {
        //     required: [true, '* Please select atleast one Occasion'],
        // },
        categoryName: {
          required: [true, '* Please select atleast one Jewellery category'],
        },
        quantity: {
          required: [true, '* Please enter Quantity'],
          number: [true, 'Please enter valid quantity'],
        },
        price: {
          required: [true, '* Please enter Price'],
          number: [true, 'Please enter valid price'],
        },
        discount: {
          number: [true, 'Please enter valid discount'],
        },
      },
    };
    formObject = new FormValidator('#form1', options);
  }, []);

  return (
    <div>
      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            <br></br>
            <div className="col-sm-6">
              <h1>Add Jewellerying</h1>
            </div>

            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Fill the jewellery details</h3>
              </div>

              <form id="form1" className="form-horizontal">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Jewellery Name
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="jewelleryName"
                            id="jewelleryName"
                            placeholder="Jewellery Name"
                            onChange={(e) => {
                              setjewelleryName(e.target.value);
                            }}
                            value={jewelleryName}
                            data-msg-containerid="errroForjewelleryName"
                          ></input>
                          <div
                            style={{ color: 'red' }}
                            id="errroForjewelleryName"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Jewellery Code
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="jewelleryCode"
                            id="jewelleryCode"
                            placeholder="Jewellery Code"
                            onChange={(e) => setjewelleryCode(e.target.value)}
                            value={jewelleryCode}
                            data-msg-containerid="errroForjewelleryCode"
                          ></input>
                          <div
                            style={{ color: 'red' }}
                            id="errroForjewelleryCode"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Jewellery Type
                        </label>
                        <div
                          className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                        >
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="sellingJewelleries"
                            name="jewelleryType"
                            onChange={(e) => setJewelleryType('Sell')}
                            data-msg-containerid="errroForjewelleryType"
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor="sellingJewelleries"
                          >
                            Sell
                          </label>
                        </div>
                        <div
                          className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                        >
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="rentalJewelleries"
                            name="jewelleryType"
                            onChange={(e) => setJewelleryType('Rental')}
                            data-msg-containerid="errroForjewelleryType"
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor="rentalJewelleries"
                          >
                            Rental
                          </label>
                        </div>
                        <div
                          style={{
                            marginLeft: 30,
                            marginTop: 10,
                            color: 'red',
                          }}
                          id="errroForjewelleryType"
                        />
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Gender
                        </label>
                        <div
                          className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                        >
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="menCollections"
                            name="gender"
                            onChange={(e) => setGender('Men')}
                            data-msg-containerid="errroForgender"
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor="menCollections"
                          >
                            Men Colections
                          </label>
                        </div>
                        <div
                          className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                        >
                          <input
                            className="custom-control-input"
                            type="radio"
                            id="womenCollections"
                            name="gender"
                            onChange={(e) => setGender('Women')}
                            data-msg-containerid="errroForgender"
                          ></input>
                          <label
                            className="custom-control-label"
                            htmlFor="womenCollections"
                          >
                            Women Colections
                          </label>
                        </div>
                        <div
                          style={{
                            marginLeft: 30,
                            marginTop: 10,
                            color: 'red',
                          }}
                          id="errroForgender"
                        />
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Occasion Type
                        </label>
                        <div className="col-md-6">
                          {occasions.length > 0 &&
                            occasions.map((occasion, index) => {
                              return (
                                <div className="row" key={occasion['_id']}>
                                  <div
                                    className={`custom-control custom-checkbox ${styles.marginCheckRadio}`}
                                  >
                                    <input
                                      className="custom-control-input"
                                      type="checkbox"
                                      name="occasionTypeId"
                                      id={occasion['categoryName']}
                                      value={occasion['_id']}
                                      onChange={handleCheckboxChange}
                                      data-msg-containerid="errroForoccasionTypeId"
                                    ></input>
                                    <label
                                      className="custom-control-label"
                                      htmlFor={occasion['categoryName']}
                                    >
                                      {occasion['categoryName']}
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                          {/* <div id="errroForoccasionTypeId" /> */}
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Jewellery Category
                        </label>
                        <div className="col-sm-10">
                          <select
                            className="custom-select"
                            defaultValue={'default'}
                            name="categoryName"
                            onChange={(e) =>
                              setjewelleryingCategoryId(e.target.value)
                            }
                          >
                            <option value={'default'} disabled>
                              Choose an option
                            </option>
                            {jewelleryingCategories.length > 0 &&
                              jewelleryingCategories.map((category) => {
                                return (
                                  <option
                                    key={category['_id']}
                                    value={category['_id']}
                                  >
                                    {category['categoryName']}
                                  </option>
                                );
                              })}
                          </select>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Quantity
                        </label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="quantity"
                              id="quantity"
                              data-msg-containerid="errroForQuantity"
                              placeholder="Quantity"
                              onChange={(e) => setQuantity(e.target.value)}
                              value={quantity}
                            ></input>
                          </div>
                          <div style={{ color: 'red' }} id="errroForQuantity" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Price</label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="price"
                              id="price"
                              data-msg-containerid="errroForprice"
                              onChange={(e) => setprice(e.target.value)}
                              value={price}
                            ></input>
                            <div className="input-group-append">
                              <span className="input-group-text"></span>
                            </div>
                          </div>
                          <div style={{ color: 'red' }} id="errroForprice" />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Discount
                        </label>
                        <div className="col-sm-10">
                          <div className="input-group">
                            <input
                              type="text"
                              className="form-control"
                              name="discount"
                              data-msg-containerid="errroFordiscount"
                              id="discount"
                              onChange={(e) => setdiscount(e.target.value)}
                              value={discount}
                            ></input>
                          </div>
                          <div style={{ color: 'red' }} id="errroFordiscount" />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group row">
                        <label htmlFor="file">Main Image</label>
                        <Dropzone
                          onChangeStatus={onMainImageChange}
                          InputComponent={selectFileInput}
                          // getUploadParams={fileParams}
                          getFilesFromEvent={getFilesFromEvent}
                          accept="image/*,audio/*,video/*"
                          maxFiles={1}
                          inputContent="Drop A File"
                          styles={{
                            dropzone: { width: 600, height: 100 },
                            dropzoneActive: { borderColor: 'green' },
                          }}
                        />
                      </div>
                      <div className="form-group row">
                        <label htmlFor="file">Sub Image</label>
                        <Dropzone
                          onChangeStatus={onSubImageChange}
                          InputComponent={selectFileInput}
                          // getUploadParams={fileParams}
                          getFilesFromEvent={getFilesFromEvent}
                          accept="image/*,audio/*,video/*"
                          maxFiles={5}
                          inputContent="Drop A File"
                          styles={{
                            dropzone: { width: 600, height: 400 },
                            dropzoneActive: { borderColor: 'green' },
                          }}
                        />
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Description
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="description"
                            id="description"
                            placeholder="Description"
                            onChange={(e) => setdescription(e.target.value)}
                            value={description}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Fabric
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="inclusions"
                            id="inclusions"
                            placeholder="Fabric"
                            onChange={(e) => setinclusions(e.target.value)}
                            value={inclusions}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Features
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="gemStones"
                            id="gemStones"
                            placeholder="Features"
                            onChange={(e) => setgemStones(e.target.value)}
                            value={gemStones}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Measurements
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="metalAndFinish"
                            id="metalAndFinish"
                            placeholder="Measurements"
                            onChange={(e) => setmetalAndFinish(e.target.value)}
                            value={metalAndFinish}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Style</label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="style"
                            id="style"
                            placeholder="Style"
                            onChange={(e) => setstyle(e.target.value)}
                            value={style}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Wash Instructions
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="detailing"
                            id="detailing"
                            placeholder="Wash Instructions"
                            onChange={(e) => setdetailing(e.target.value)}
                            value={detailing}
                          ></input>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-sm-2 col-form-label">
                          Custom Alterations
                        </label>
                        <div className="col-sm-10">
                          <input
                            type="text"
                            className="form-control"
                            name="customization"
                            id="customization"
                            placeholder="Custom Alterations"
                            onChange={(e) => setcustomization(e.target.value)}
                            value={customization}
                          ></input>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={saveJewellery}
                  >
                    Submit
                  </button>
                  <button type="submit" className="btn btn-default float-right">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddJewellery;
