import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './Cloth.module.css';
import ClothService from '../../Services/ClothService';
import Swal from 'sweetalert2';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { any } from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  clothName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  clothCode: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  clothType: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  occasionTypeId: Yup.array().min(1, 'Required'),
  clothingCategoryId: Yup.string().required('Required'),
  discount: Yup.number()
    .positive('Please enter positive number')
    .min(0, 'Too short')
    .max(100, 'Not possible to give this discount')
    .required('Required'),
  price: Yup.number()
    .positive('Please enter positive number')
    .min(0, 'Too short')
    .max(10000, 'The price is too much')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  fabric: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  features: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  measurements: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  style: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  washInstructions: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  customAltrations: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
});

const AddCloth = () => {
  const [occasions, setOccasions] = useState<any[]>([]);
  const [clothingCategories, setClothingCategories] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<any>({
    file: null,
    base64URL: any,
  });
  const [subImage, setSubImage] = useState<any[]>([]);
  const [sizeAndCount, setSizeAndCount] = useState<any[]>([]);

  const [initialValues, setInitialValues] = useState({});

  const navigate = useNavigate();
  const search = useLocation().search;
  const clothId = new URLSearchParams(search).get('id');

  const handleSizeCountChange = (value) => {
    const findSize = sizeAndCount.find((x) => x.size === value.size);
    if (findSize) {
      findSize['count'] = value.count;
    } else {
      setSizeAndCount([...sizeAndCount, value]);
    }
  };

  const getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL: any;
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  const onMainImageChange = ({ meta, file }, status) => {
    if (status === 'done') {
      // console.log('fileParams', file, meta);
      getBase64(file)
        .then((result) => {
          file['base64'] = result;

          setMainImage({
            base64URL: result,
            file: meta,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (status === 'removed') {
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

  const getAllCategories = async () => {
    let occasionsTemp: any[] = [];
    let categoriesTemp: any[] = [];

    ClothService.getAllCategories().then((response) => {
      let categoryResponse = response.data;
      categoryResponse.length > 0 &&
        categoryResponse.map((dd) => {
          if (dd.categoryType === 'occasionType') {
            occasionsTemp.push(dd);
          }
          if (dd.categoryType === 'clothingCategory') {
            categoriesTemp.push({ value: dd._id, label: dd.categoryName });
          }
        });
      setOccasions(occasionsTemp);
      setClothingCategories(categoriesTemp);
    });
  };

  const getFilesFromEvent = (e) => {
    // return new Promise(resolve => {
    return getDroppedOrSelectedFiles(e).then((chosenFiles) => {
      // resolve(chosenFiles.map(f => f.fileObject))
      return chosenFiles.map((f) => f.fileObject);
      // })
    });
  };

  const removeMainImage = (id) => {
    setMainImage({
      file: null,
      base64URL: null,
    });
  };

  const removeSubImage = (id) => {
    setSubImage(subImage.filter((x) => x.file.id !== id));
  };

  let handleMainImageDisplay = () => {
    if (mainImage.base64URL) {
      return (
        <div
          className={styles.mainImage}
          style={{
            border: '2px solid #d9d9d9',
            marginTop: 8,
            marginBottom: '10px',
            padding: 10,
            borderRadius: 4,
            height: `150px`,
            width: '130px',
          }}
        >
          <img
            src={mainImage.base64URL}
            width="100px"
            height="120px"
            alt="placeholder grey 100px"
          />
          <button
            className={styles.xBtn}
            onClick={() => removeMainImage(mainImage.file.id)}
          >
            X
          </button>
        </div>
      );
    } else {
      return (
        <div className={`form-group row`} style={{ marginLeft: '10px' }}>
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
      );
    }
  };

  let handleSubImageDisplay = () => {
    let subImageLength = subImage.length;
    if (subImage) {
      return subImage.map((img, index) => {
        return (
          <div
            className={styles.mainImage}
            key={img.file.id}
            style={{
              border: '2px solid #d9d9d9',
              marginTop: 8,
              marginBottom: '10px',
              padding: 10,
              borderRadius: 4,
              height: `150px`,
              width: '130px',
            }}
          >
            <img
              key={img.file.id}
              src={img.base64URL}
              width="100px"
              height="120px"
              alt="placeholder grey 100px"
            />
            <button
              className={styles.xBtn}
              onClick={() => removeSubImage(img.file.id)}
            >
              X
            </button>
          </div>
        );
      });
    }
    if (subImageLength < 4) {
      return (
        <Dropzone
          onChangeStatus={onSubImageChange}
          InputComponent={selectFileInput}
          // getUploadParams={fileParams}
          getFilesFromEvent={getFilesFromEvent}
          accept="image/*,audio/*,video/*"
          maxFiles={3}
          inputContent="Drop A File"
          styles={{
            dropzone: { width: 600, height: 100 },
            dropzoneActive: { borderColor: 'green' },
          }}
        />
      );
    }
  };

  const fetchCloth = async (id) => {
    const { data } = await ClothService.getClothById(id);

    setInitialValues({
      clothName: data.clothName,
      clothCode: data.clothCode,
      clothType: data.clothType,
      gender: data.gender,
      occasionTypeId: data.occasionTypeId.map((x) => x._id),
      clothingCategoryId: data.clothingCategoryId._id,
      price: data.price,
      discount: data.discount,
      description: data.description,
      fabric: data.fabric,
      features: data.features,
      measurements: data.measurements,
      style: data.style,
      washInstructions: data.washInstructions,
      customAltrations: data.customAltrations,
    });
    setSizeAndCount(data.sizeAndCount);
    setMainImage(data.mainImage);
    setSubImage(data.subImage);
  };

  useEffect(() => {
    if (clothId) {
      fetchCloth(clothId);
    } else {
      setInitialValues({
        clothName: '',
        clothCode: '',
        clothType: '',
        gender: '',
        occasionTypeId: [],
        clothingCategoryId: '',
        price: '',
        discount: '',
        description: '',
        fabric: '',
        features: '',
        measurements: '',
        style: '',
        washInstructions: '',
        customAltrations: '',
      });
    }
  }, [clothId]);

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

  const handleSubmit = async (values) => {
    try {
    const obj = {
      ...values,
      sizeAndCount,
      mainImage,
      subImage,
    };

    
      await ClothService.saveCloths(obj);
      Swal.fire({
        title: 'Success',
        text: 'Cloth saved successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/viewCloths');
        }
      });
    } catch (error) {
      Swal.fire({
        title: 'Oops!',
        text: 'Something Went Wrong',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
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
              <h1>Add Clothing</h1>
            </div>

            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Fill the cloth details</h3>
              </div>

              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={schema}
                onSubmit={(values, actions) => {
                  handleSubmit(values).then(() => {
                    actions.setSubmitting(false);
                    actions.resetForm();
                  });
                }}
              >
                {({
                  handleSubmit,
                  errors,
                  values,
                  touched,
                  isSubmitting,
                  isValidating,
                  setFieldValue,
                }) => (
                  <Form onSubmit={handleSubmit} className="form-horizontal">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Cloth Name
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="clothName"
                                placeholder="Cloth name"
                                className="form-control"
                                value={values['clothName']}
                              />
                              {errors['clothName'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['clothName']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Cloth Code
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="clothCode"
                                type="text"
                                name="clothCode"
                                placeholder="Cloth code"
                                className="form-control"
                              />
                              {errors['clothCode'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['clothCode']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Cloth type
                            </label>
                            <div>
                              <div className=" row">
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="sellingCloths"
                                    type="radio"
                                    name="clothType"
                                    className="custom-control-input"
                                    value="Sale"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="sellingCloths"
                                  >
                                    Sale
                                  </label>
                                </div>
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="rentalCloths"
                                    type="radio"
                                    name="clothType"
                                    className="custom-control-input"
                                    value="Rent"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="rentalCloths"
                                  >
                                    Rent
                                  </label>
                                </div>
                              </div>
                              {errors['clothType'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['clothType']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Gender
                            </label>
                            <div>
                              <div className=" row">
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="womenCollections"
                                    type="radio"
                                    name="gender"
                                    className="custom-control-input"
                                    value="Women"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="womenCollections"
                                  >
                                    Women Collections
                                  </label>
                                </div>
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="menCollections"
                                    type="radio"
                                    name="gender"
                                    className="custom-control-input"
                                    value="Men"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="menCollections"
                                  >
                                    Men Colections
                                  </label>
                                </div>
                              </div>
                              {errors['gender'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['gender']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Occasion Type
                            </label>
                            <div className="col-md-6">
                              {occasions.length > 0 &&
                                occasions.map((occasion, index) => {
                                  return (
                                    <div className="row" key={index}>
                                      <div
                                        className={`custom-control custom-checkbox ${styles.marginCheckRadio}`}
                                      >
                                        <Field
                                          id={occasion['categoryName']}
                                          type="checkbox"
                                          name="occasionTypeId"
                                          className="custom-control-input"
                                          value={occasion['_id']}
                                        />

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

                              {errors['occasionTypeId'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['occasionTypeId']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Cloth Category
                            </label>
                            <div className="col-sm-9">
                              <Field
                                name={'clothingCategoryId'}
                                component={SelectField}
                                options={clothingCategories}
                              />
                              {errors['gender'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['gender']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Size And Count
                            </label>
                            <div className="col-md-6">
                              <div className="row">
                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    XS
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'XS',
                                        count: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      sizeAndCount?.find((x) => x.size === 'XS')
                                        ?.count
                                    }
                                    name="xsCount"
                                    data-msg-containerid="errroForxsCount"
                                  ></input>
                                </div>

                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    S
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    id="inputPassword2"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'S',
                                        count: e.target.value,
                                      })
                                    }
                                    name="sCount"
                                    defaultValue={
                                      sizeAndCount?.find((x) => x.size === 'S')
                                        ?.count
                                    }
                                    data-msg-containerid="errroForsCount"
                                  ></input>
                                  <div
                                    style={{
                                      marginLeft: '155px',
                                      color: 'red',
                                    }}
                                    id="errroForsCount"
                                  />
                                </div>

                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    M
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    id="inputPassword3"
                                    name="mCount"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'M',
                                        count: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      sizeAndCount?.find((x) => x.size === 'M')
                                        ?.count
                                    }
                                    data-msg-containerid="errroFormCount"
                                  ></input>
                                  <div
                                    style={{
                                      marginLeft: '155px',
                                      color: 'red',
                                    }}
                                    id="errroFormCount"
                                  />
                                </div>

                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    L
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    id="inputPassword4"
                                    name="lCount"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'L',
                                        count: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      sizeAndCount?.find((x) => x.size === 'L')
                                        ?.count
                                    }
                                    data-msg-containerid="errroForlCount"
                                  ></input>
                                  <div
                                    style={{
                                      marginLeft: '155px',
                                      color: 'red',
                                    }}
                                    id="errroForlCount"
                                  />
                                </div>

                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    XL
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    id="inputPassword5"
                                    name="xlCount"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'XL',
                                        count: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      sizeAndCount?.find((x) => x.size === 'XL')
                                        ?.count
                                    }
                                    data-msg-containerid="errroForxlCount"
                                  ></input>
                                  <div
                                    style={{
                                      marginLeft: '155px',
                                      color: 'red',
                                    }}
                                    id="errroForxlCount"
                                  />
                                </div>

                                <div className="col-sm-9 row">
                                  <label className="col-sm-4 col-form-label">
                                    XXL
                                  </label>
                                  <input
                                    type="text"
                                    className="col-sm-6 form-control form-control-sm"
                                    id="inputPassword6"
                                    name="xxlCount"
                                    placeholder="Count"
                                    onChange={(e) =>
                                      handleSizeCountChange({
                                        size: 'XXL',
                                        count: e.target.value,
                                      })
                                    }
                                    defaultValue={
                                      sizeAndCount?.find(
                                        (x) => x.size === 'XXL'
                                      )?.count
                                    }
                                    data-msg-containerid="errroForxxlCount"
                                  ></input>
                                  <div
                                    style={{
                                      marginLeft: '155px',
                                      color: 'red',
                                    }}
                                    id="errroForxxlCount"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Price
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="price"
                                type="text"
                                name="price"
                                className="form-control"
                              />
                              {errors['price'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['price']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Discount
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="discount"
                                type="text"
                                name="discount"
                                className="form-control"
                              />
                              {errors['discount'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['discount']}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="file"
                            >
                              Main Image
                            </label>

                            <div className="col-sm-9">
                              {clothId && <div>{handleMainImageDisplay()}</div>}

                              <Dropzone
                                onChangeStatus={onMainImageChange}
                                InputComponent={selectFileInput}
                                getFilesFromEvent={getFilesFromEvent}
                                accept="image/*"
                                maxFiles={1}
                                inputContent="Drop A File"
                                styles={{
                                  dropzone: {
                                    overflow: 'hidden',
                                    border: 'dashed 2px #dedede',
                                  },
                                }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label
                              className="col-sm-3 col-form-label"
                              htmlFor="file"
                            >
                              Sub Image
                            </label>
                            <div className="col-sm-9">
                              {clothId && (
                                <div
                                  style={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    gap: '10px',
                                  }}
                                >
                                  {handleSubImageDisplay()}
                                </div>
                              )}
                              <Dropzone
                                onChangeStatus={onSubImageChange}
                                InputComponent={selectFileInput}
                                getFilesFromEvent={getFilesFromEvent}
                                accept="image/*"
                                maxFiles={5}
                                inputContent="Drop A File"
                                styles={{
                                  dropzone: {
                                    height: 200,
                                    overflow: 'auto',
                                    border: 'dashed 2px #dedede',
                                  },
                                }}
                              />
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Description
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="description"
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="form-control"
                              />
                              {errors['description'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['description']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Fabric
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="fabric"
                                type="text"
                                name="fabric"
                                placeholder="Fabric"
                                className="form-control"
                              />
                              {errors['fabric'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['fabric']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Features
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="features"
                                type="text"
                                name="features"
                                placeholder="Features"
                                className="form-control"
                              />
                              {errors['features'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['features']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Measurements
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="measurements"
                                type="text"
                                name="measurements"
                                placeholder="Measurements"
                                className="form-control"
                              />
                              {errors['measurements'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['measurements']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Style
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="style"
                                type="text"
                                name="style"
                                placeholder="Style"
                                className="form-control"
                              />
                              {errors['style'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['style']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Wash Instructions
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="washInstructions"
                                type="text"
                                name="washInstructions"
                                placeholder="Wash Instructions"
                                className="form-control"
                              />
                              {errors['washInstructions'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['washInstructions']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Custom Alterations
                            </label>
                            <div className="col-sm-9">
                              <Field
                                id="customAltrations"
                                type="text"
                                name="customAltrations"
                                placeholder="Custom Altrations"
                                className="form-control"
                              />
                              {errors['customAltrations'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['customAltrations']}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <button type="submit" className="btn btn-info">
                        Submit
                      </button>
                      <Link to="/viewCloths">
                        <button
                          type="submit"
                          className="btn btn-default float-right"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCloth;

export const SelectField = ({ options, field, form }) => (
  <Select
    options={options}
    name={field.name}
    value={
      options ? options.find((option) => option.value === field.value) : ''
    }
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />
);
