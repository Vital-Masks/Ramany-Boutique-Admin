import { useEffect, useState } from 'react';
import styles from './Jewellery.module.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import JewelleryService from '../../Services/JewelleryService';
import Swal from 'sweetalert2';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { any } from 'prop-types';
import { Field, Form, Formik } from 'formik';
import Select from 'react-select';
import * as Yup from 'yup';

const schema = Yup.object().shape({
  jewelleryName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  jewelleryCode: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  jewelleryType: Yup.string().required('Required'),
  gender: Yup.string().required('Required'),
  occasionTypeId: Yup.array().min(1, 'Required'),
  jewelleryCategoryId: Yup.string().required('Required'),
  quantity: Yup.number().typeError('Value should be a number')
    .positive('Please enter positive number')
    .min(0, 'Too Short')
    .max(100000, 'Too Long')
    .required('Required'),
  price: Yup.number()
    .positive('Please enter positive number')
    .max(10000, 'The price is too much')
    .required('Required'),
  discount: Yup.number()
    .positive('Please enter positive number')
    .max(100, 'Not possible to give this discount')
    .required('Required'),
  description: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  gemStones: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  metalAndFinish: Yup.string()
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
  detailing: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
  customization: Yup.string()
    .min(2, 'Too Short!')
    .max(255, 'Too Long!')
    .required('Required'),
});

let AddJewellery = () => {
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const [occasions, setOccasions] = useState<any[]>([]);
  const [jewelleryCategories, setJewelleryCategories] = useState<any[]>([]);
  const [mainImage, setMainImage] = useState<any>({
    file: null,
    base64URL: any,
  });
  const [subImage, setSubImage] = useState<any[]>([]);

  const search = useLocation().search;
  const jewelleryId = new URLSearchParams(search).get('id');

  const getAllCategories = async () => {
    let occasionsTemp: string[] = [];
    let categoriesTemp: any[] = [];

    JewelleryService.getAllCategories().then((response) => {
      let categoryResponse = response.data;
      categoryResponse.length > 0 &&
        categoryResponse.map((dd) => {
          if (dd.categoryType === 'occasionType') {
            occasionsTemp.push(dd);
          }
          if (dd.categoryType === 'jewelleryCategory') {
            categoriesTemp.push({ value: dd._id, label: dd.categoryName });
          }
        });
      setOccasions(occasionsTemp);
      setJewelleryCategories(categoriesTemp);
    });
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

  const getJewelleryById = async (id) => {
    const { data } = await JewelleryService.getJewelleryById(id);

    setInitialValues({
      jewelleryName: data.jewelleryName,
      jewelleryCode: data.jewelleryCode,
      jewelleryType: data.jewelleryType,
      gender: data.gender,
      occasionTypeId: data.occasionTypeId.map((x) => x._id),
      jewelleryCategoryId: data.jewelleryingCategoryId._id,
      quantity: data.quantity,
      price: data.price,
      discount: data.discount,
      description: data.description,
      gemStones: data.gemStones,
      metalAndFinish: data.metalAndFinish,
      measurements: data.measurements,
      style: data.style,
      detailing: data.detailing,
      customization: data.customization,
    });
    setMainImage(data.mainImage);
    setSubImage(data.subImage);
  };

  const handleSubmit = async (values, actions) => {
    try {
      const obj = {
        ...values,
        jewelleryingCategoryId: values.jewelleryCategoryId,
        mainImage,
        subImage,
      };
      if(obj.mainImage.file === null ){
        Swal.fire({
          title: 'Warning',
          text: 'Main image not selected. Please check',
          icon: 'warning',
          confirmButtonText: 'OK',
        })
      }
      else{

      if (jewelleryId) {
        await JewelleryService.updateJewelleryById(jewelleryId, obj);
      } else {
        await JewelleryService.saveJewellerys(obj);
      }

      Swal.fire({
        title: 'Success',
        text: 'Jewellery saved successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/viewJewelleries');
          actions.resetForm();
        }
      });
    }
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
    if (jewelleryId) {
      getJewelleryById(jewelleryId);
    } else {
      setInitialValues({
        jewelleryName: '',
        jewelleryCode: '',
        jewelleryType: '',
        gender: '',
        occasionTypeId: [],
        jewelleryCategoryId: '',
        quantity: '',
        price: '',
        discount: '',
        description: '',
        gemStones: '',
        metalAndFinish: '',
        measurements: '',
        style: '',
        detailing: '',
        customization: '',
      });
    }
  }, [jewelleryId]);

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
              <h1>Add Jewellerying</h1>
            </div>

            <div className="card card-primary">
              <div className="card-header">
                <h3 className="card-title">Fill the jewellery details</h3>
              </div>

              <Formik
                initialValues={initialValues}
                enableReinitialize
                validationSchema={schema}
                onSubmit={(values, actions) => {
                  handleSubmit(values, actions).then(() => {
                    actions.setSubmitting(false);                 
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
                              Jewellery Name
                            </label>

                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="jewelleryName"
                                placeholder="Jewellery name"
                                className="form-control"
                                value={values['jewelleryName']}
                              />
                              {errors['jewelleryName'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['jewelleryName']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Jewellery Code
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="jewelleryCode"
                                placeholder="Jewellery code"
                                className="form-control"
                                value={values['jewelleryCode']}
                              />
                              {errors && (
                                <p className={styles.error} id="email-error">
                                  {errors['jewelleryCode']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Jewellery type
                            </label>
                            <div>
                              <div className="row">
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="sellingJewelleries"
                                    type="radio"
                                    name="jewelleryType"
                                    className="custom-control-input"
                                    value="Sale"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="sellingJewelleries"
                                  >
                                    Sale
                                  </label>
                                </div>
                                <div
                                  className={`custom-control custom-radio ${styles.marginCheckRadio}`}
                                >
                                  <Field
                                    id="rentalJewelleries"
                                    type="radio"
                                    name="jewelleryType"
                                    className="custom-control-input"
                                    value="Rent"
                                  />

                                  <label
                                    className="custom-control-label"
                                    htmlFor="rentalJewelleries"
                                  >
                                    Rent
                                  </label>
                                </div>
                              </div>
                              {errors['jewelleryType'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['jewelleryType']}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Gender
                            </label>
                            <div>
                              <div className="row">
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
                              Jewellery Category
                            </label>

                            <div className="col-sm-9">
                              <Field
                                name={'jewelleryCategoryId'}
                                component={SelectField}
                                options={jewelleryCategories}
                              />
                              {errors['jewelleryCategoryId'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['jewelleryCategoryId']}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Quantity
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="quantity"
                                placeholder="Quantity"
                                className="form-control"
                                value={values['quantity']}
                              />
                              {errors['quantity'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['quantity']}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Price
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="price"
                                placeholder="Price"
                                className="form-control"
                                value={values['price']}
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
                                type="text"
                                name="discount"
                                placeholder="Discount"
                                className="form-control"
                                value={values['discount']}
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
                              {jewelleryId && (
                                <div>{handleMainImageDisplay()}</div>
                              )}
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
                              {jewelleryId && (
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
                                type="text"
                                name="description"
                                placeholder="Description"
                                className="form-control"
                                value={values['description']}
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
                              Gem Stones
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="gemStones"
                                placeholder="Gem Stones"
                                className="form-control"
                                value={values['gemStones']}
                              />
                              {errors['gemStones'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['gemStones']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Metal And Finish
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="metalAndFinish"
                                placeholder="Metal And Finish"
                                className="form-control"
                                value={values['metalAndFinish']}
                              />
                              {errors['metalAndFinish'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['metalAndFinish']}
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
                                type="text"
                                name="measurements"
                                placeholder="Measurement"
                                className="form-control"
                                value={values['measurements']}
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
                                type="text"
                                name="style"
                                placeholder="Style"
                                className="form-control"
                                value={values['style']}
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
                              Detailing
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="detailing"
                                placeholder="Detailing"
                                className="form-control"
                                value={values['detailing']}
                              />
                              {errors['detailing'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['detailing']}
                                </p>
                              )}
                            </div>
                          </div>

                          <div className="form-group row">
                            <label className="col-sm-3 col-form-label">
                              Customization
                            </label>
                            <div className="col-sm-9">
                              <Field
                                type="text"
                                name="customization"
                                placeholder="Customization"
                                className="form-control"
                                value={values['customization']}
                              />
                              {errors['customization'] && (
                                <p className={styles.error} id="email-error">
                                  {errors['customization']}
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
                      <Link to="/viewJewelleries">
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

export default AddJewellery;

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
