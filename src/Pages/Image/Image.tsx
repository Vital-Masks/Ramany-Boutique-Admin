import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import ImageService from '../../Services/imageService';
import styles from './Image.module.css';
import 'react-dropzone-uploader/dist/styles.css';
import Dropzone from 'react-dropzone-uploader';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';
import { Link, useLocation, useNavigate } from 'react-router-dom';




let Categories = () => {
    const navigate = useNavigate();
    const [bannerImg, setBannerImg] = useState<any[]>([]);
    const [aboutUsImg, setAboutUsImg] = useState<any>({
        file: null,
        base64URL: null,
    });
    const [jewelleryCategoryImg, setJewelleryCategoryImg]= useState<any>({
        file: null,
        base64URL: null,
    });
    const [occasionTypeImg, setOccasionTypeImg]= useState<any>({
        file: null,
        base64URL: null,
    });
    const [whoWeAreImg, setWhoWeAreImg]= useState<any>({
        file: null,
        base64URL: null,
    });
    



    const getAllImages = async () => {
        ImageService.getImageById().then((response) => {
            let images = response.data
            setBannerImg(images.bannerImg);
            setAboutUsImg(images.aboutUsImg);
            setJewelleryCategoryImg(images.jewelleryCategoryImg);
            setOccasionTypeImg(images.occasionTypeImg);
            setWhoWeAreImg(images.whoWeAreImg)  
            console.log("images", images)
        })
    }
    const getBase64 = (file) => {
        return new Promise((resolve) => {
            let fileInfo;
            let baseURL: any;
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
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

      const onAboutUsImgChange = ({ meta, file }, status) => {
        if (status === 'done') {
          console.log('fileParams', file, meta);
          getBase64(file)
            .then((result) => {
              file['base64'] = result;
              setAboutUsImg({
                base64URL: result,
                file: meta,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }   
        if (status === 'removed') {
          setAboutUsImg([]);
        }
      };

      const removeAboutUsImg = (id) => {
        setAboutUsImg({
          file: null,
          base64URL: null,
        });
      };

      let handleAboutUsImgDisplay = () => {
        console.log("dddd",aboutUsImg)
        if (aboutUsImg.base64URL) {
          return (
            <div
              style={{
                border: '2px solid #d9d9d9',
                marginLeft: 10,
                marginTop: 8,
                padding: 10,
                borderRadius: 4,
                height: `150px`,
              }}
            >
              <img
                src={aboutUsImg.base64URL}
                width="100px"
                height="120px"
                alt="placeholder grey 100px"
              />
              <button onClick={() => removeAboutUsImg(aboutUsImg.file.id)}>X</button>
            </div>
          );
        } else {
          return (
            <div className={`form-group row`} style={{ marginLeft: '10px' }}>
              <Dropzone
                onChangeStatus={onAboutUsImgChange}
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

      const onJewelleryCategoryImgChange = ({ meta, file }, status) => {
        if (status === 'done') {
          console.log('fileParams', file, meta);
          getBase64(file)
            .then((result) => {
              file['base64'] = result;
              setJewelleryCategoryImg({
                base64URL: result,
                file: meta,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }   
        if (status === 'removed') {
            setJewelleryCategoryImg([]);
        }
      };
      
      const removeJewelleryCategoryImg = (id) => {
        setJewelleryCategoryImg({
          file: null,
          base64URL: null,
        });
      };

      let handlejewelleryCategoryImgDisplay = () => {
        console.log("dddd",jewelleryCategoryImg)
        if (jewelleryCategoryImg.base64URL) {
          return (
            <div
              style={{
                border: '2px solid #d9d9d9',
                marginLeft: 10,
                marginTop: 8,
                padding: 10,
                borderRadius: 4,
                height: `150px`,
              }}
            >
              <img
                src={jewelleryCategoryImg.base64URL}
                width="100px"
                height="120px"
                alt="placeholder grey 100px"
              />
              <button onClick={() => removeJewelleryCategoryImg(jewelleryCategoryImg.file.id)}>X</button>
            </div>
          );
        } else {
          return (
            <div className={`form-group row`} style={{ marginLeft: '10px' }}>
              <Dropzone
                onChangeStatus={onJewelleryCategoryImgChange}
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

      const onOccasionTypeImgChange = ({ meta, file }, status) => {
        if (status === 'done') {
          console.log('fileParams', file, meta);
          getBase64(file)
            .then((result) => {
              file['base64'] = result;
              setOccasionTypeImg({
                base64URL: result,
                file: meta,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }   
        if (status === 'removed') {
            setOccasionTypeImg([]);
        }
      };
      
      const removeOccasionTypeImg = (id) => {
        setOccasionTypeImg({
          file: null,
          base64URL: null,
        });
      };

      let handleOccasionTypeImgDisplay = () => {
        console.log("dddd",occasionTypeImg)
        if (occasionTypeImg.base64URL) {
          return (
            <div
              style={{
                border: '2px solid #d9d9d9',
                marginLeft: 10,
                marginTop: 8,
                padding: 10,
                borderRadius: 4,
                height: `150px`,
              }}
            >
              <img
                src={occasionTypeImg.base64URL}
                width="100px"
                height="120px"
                alt="placeholder grey 100px"
              />
              <button onClick={() => removeOccasionTypeImg(occasionTypeImg.file.id)}>X</button>
            </div>
          );
        } else {
          return (
            <div className={`form-group row`} style={{ marginLeft: '10px' }}>
              <Dropzone
                onChangeStatus={onOccasionTypeImgChange}
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

      const onWhoWeAreImgChange = ({ meta, file }, status) => {
        if (status === 'done') {
          console.log('fileParams', file, meta);
          getBase64(file)
            .then((result) => {
              file['base64'] = result;
              setWhoWeAreImg({
                base64URL: result,
                file: meta,
              });
            })
            .catch((err) => {
              console.log(err);
            });
        }   
        if (status === 'removed') {
            setWhoWeAreImg([]);
        }
      };
      
      const removeWhoWeAreImg = (id) => {
        setWhoWeAreImg({
          file: null,
          base64URL: null,
        });
      };

      let handleWhoWeAreImgDisplay = () => {
        console.log("dddd",whoWeAreImg)
        if (whoWeAreImg.base64URL) {
          return (
            <div
              style={{
                border: '2px solid #d9d9d9',
                marginLeft: 10,
                marginTop: 8,
                padding: 10,
                borderRadius: 4,
                height: `150px`,
              }}
            >
              <img
                src={whoWeAreImg.base64URL}
                width="100px"
                height="120px"
                alt="placeholder grey 100px"
              />
              <button onClick={() => removeWhoWeAreImg(whoWeAreImg.file.id)}>X</button>
            </div>
          );
        } else {
          return (
            <div className={`form-group row`} style={{ marginLeft: '10px' }}>
              <Dropzone
                onChangeStatus={onWhoWeAreImgChange}
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

      const onBannerImgChange = ({ meta, file }, status) => {
        if (status === 'done') {
          getBase64(file)
            .then((result) => {
              file['base64'] = result;
              setBannerImg([
                ...bannerImg,
                {
                  base64URL: result,
                  file: meta,
                },
              ]);
            })
            .catch((err) => {
              console.log(err);
            });
        }
    
        if (status === 'removed') {
            setBannerImg(bannerImg.filter((x) => x.file.id !== meta.id));
        }
      };

      const removeBannerImg = (id) => {
        setBannerImg(bannerImg.filter((x) => x.file.id !== id));
      };

      let handleBannerImgDisplay = () => {
        let bannerImgLength = bannerImg.length;
        if (bannerImg) {
          return bannerImg.map((img, index) => {
            return (
              <div
                key={img.file.id}
                style={{
                  border: '2px solid #d9d9d9',
                  marginLeft: 10,
                  marginTop: 8,
                  padding: 10,
                  borderRadius: 4,
                  height: `150px`,
                }}
              >
                <img
                  key={img.file.id}
                  src={img.base64URL}
                  width="100px"
                  height="120px"
                  alt="placeholder grey 100px"
                />
                <button onClick={() => removeBannerImg(img.file.id)}>X</button>
              </div>
            );
          });
        }
        if (bannerImgLength < 6) {
          return (
            <Dropzone
              onChangeStatus={onBannerImgChange}
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
    
      let updateImages =()=>{
        let images = {
            bannerImg:bannerImg,
            aboutUsImg:aboutUsImg,
            jewelleryCategoryImg:jewelleryCategoryImg,
            occasionTypeImg:occasionTypeImg,
            whoWeAreImg:whoWeAreImg
        }
        if( aboutUsImg['base64URL'] == null  || jewelleryCategoryImg['base64URL'] == null  || occasionTypeImg['base64URL'] == null  || whoWeAreImg['base64URL'] == null ){
            Swal.fire({
                title: 'Warning',
                text: 'All Image Are Required',
                icon: 'warning',
                confirmButtonText: 'OK',
              })
        }else{
        ImageService.updateImageById("63cb9bdbe52bc4c5035dfe4a",images).then(response=>{
            if (response['status'] === 200) {
                Swal.fire({
                  title: 'Success',
                  text: 'Jewellery updated successfully',
                  icon: 'success',
                  confirmButtonText: 'OK',
                }).then((result) => {
                  if (result.isConfirmed) {
                    navigate("/viewCloths")
                  }
                });
              }
        })
    }
      }



    useEffect(() => {
        getAllImages();
    }, [])

    return (
        <div>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <br></br>


                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Manage Images</h3>
                            </div>
                            <div className="card-body">
                                <br></br>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        htmlFor="file"
                                    >
                                        About Us Image
                                    </label>
                                    <div className="col-sm-9">
                                        {/* {jewelleryId && ( */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >{handleAboutUsImgDisplay()}</div>
                                        {/* )} */}

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        htmlFor="file"
                                    >
                                        Jewellery Category Image
                                    </label>
                                    <div className="col-sm-9">
                                        {/* {jewelleryId && ( */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >{handlejewelleryCategoryImgDisplay()}</div>
                                        {/* )} */}

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        htmlFor="file"
                                    >
                                        Jewellery Category Image
                                    </label>
                                    <div className="col-sm-9">
                                        {/* {jewelleryId && ( */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >{handleOccasionTypeImgDisplay()}</div>
                                        {/* )} */}

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        htmlFor="file"
                                    >
                                        Jewellery Category Image
                                    </label>
                                    <div className="col-sm-9">
                                        {/* {jewelleryId && ( */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >{handleWhoWeAreImgDisplay()}</div>
                                        {/* )} */}

                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label
                                        className="col-sm-3 col-form-label"
                                        htmlFor="file"
                                    >
                                        Jewellery Category Image
                                    </label>
                                    <div className="col-sm-9">
                                        {/* {jewelleryId && ( */}
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexWrap: 'wrap',
                                                gap: '10px',
                                            }}
                                        >{handleBannerImgDisplay()}</div>


                                    </div>
                                </div>
                                <div 
                                    >
                                    {bannerImg.length < 6 && (
                                        <Dropzone
                                            onChangeStatus={onBannerImgChange}
                                            InputComponent={selectFileInput}
                                            // getUploadParams={fileParams}
                                            getFilesFromEvent={getFilesFromEvent}
                                            accept="image/*,audio/*,video/*"
                                            maxFiles={3}
                                            inputContent="Drop A File"
                                            styles={{
                                                dropzone: { width: 600, height: 300 },
                                                dropzoneActive: { borderColor: 'green' },
                                            }} />
                                    )}
                                </div>
                            </div>
                            <div className="card-footer">
                  <button
                    type="submit"
                    className="btn btn-info"
                    onClick={updateImages}
                  >
                    Update
                  </button>
                  <Link to="/viewCloths" className="nav-link">
                    <button type="submit" className="btn btn-default float-right">
                      Cancel
                    </button>
                  </Link>
                </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}


export default Categories