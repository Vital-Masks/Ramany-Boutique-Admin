import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css'
import { Link, useLocation } from 'react-router-dom'
import JewelleryService from '../../Services/JewelleryService'
import Swal from 'sweetalert2'
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { FormValidator } from '@syncfusion/ej2-inputs';



let UpdateJewellery = () => {
    let occasionsTemp: string[] = [];
    let categoriesTemp: string[] = [];
    let sizeAndCount;

    const search = useLocation().search;
    const jewelleryId = new URLSearchParams(search).get('id')

    const [occasions, setoccasions] = useState([{}]);
    const [jewelleryingCategories, setJewelleryingCategories] = useState([{}]);

    const [jewelleryName, setjewelleryName] = useState("");
    const [jewelleryCode, setjewelleryCode] = useState("");
    const [jewelleryType, setJewelleryType] = useState("");
    const [gender, setGender] = useState("");
    const [occasionTypeId, setoccasionTypeId] = useState<string[]>([]);
    const [jewelleryingCategoryId, setjewelleryingCategoryId] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setprice] = useState("");
    const [discount, setdiscount] = useState("");
    const [mainImage, setMainImage] = useState<any>({
        file: null,
        base64URL: null
    })
    const [subImage, setSubImage] = useState<any[]>([]);
    
    const [description, setdescription] = useState("");
    const [inclusions, setinclusions] = useState("");
    const [gemStones, setgemStones] = useState("");
    const [metalAndFinish, setmetalAndFinish] = useState("");
    const [style, setstyle] = useState("");
    const [detailing, setdetailing] = useState("");
    const [customization, setcustomization] = useState("");

    const [checkedItems, setCheckedItems] = React.useState(false);


    const getAllCategories = async () => {
        JewelleryService.getAllCategories().then((response) => {
            let categoryResponse = response.data
            categoryResponse.length > 0 && categoryResponse.map((dd) => {
                if (dd.categoryType === 'occasionType') {
                    occasionsTemp.push(dd)
                }
                if (dd.categoryType === 'jewelleryingCategory') {
                    categoriesTemp.push(dd)
                }
            })
            setoccasions(occasionsTemp)
            setJewelleryingCategories(categoriesTemp)
        })
    }

    const getJewelleryById = () => {
        JewelleryService.getJewelleryById(jewelleryId).then(response => {
            let obj = response.data
            console.log("res", response)
            setjewelleryName(obj.jewelleryName)
            setjewelleryCode(obj.jewelleryCode)
            setJewelleryType(obj.jewelleryType)
            setGender(obj.gender)
            setoccasionTypeId(obj.occasionTypeId)
            setjewelleryingCategoryId(obj.jewelleryingCategoryId)
            setprice(obj.price)
            setdiscount(obj.discount)
            setdescription(obj.description)
            setinclusions(obj.inclusions)
            setgemStones(obj.gemStones)
            setmetalAndFinish(obj.metalAndFinish)
            setstyle(obj.style)
            setdetailing(obj.detailing)
            setcustomization(obj.customization)
            setMainImage(obj.mainImage)
            setSubImage(obj.subImage)
            setQuantity(obj.quantity)

        })

    }

    const fileParams = ({ meta }) => {
		return { url: "https://httpbin.org/post" };
	};

    const getBase64 = file => {
        return new Promise(resolve => {
          let fileInfo;
          let baseURL: any
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
        if (status === "done") {
            console.log("fileParams", file, meta)

            // setMainImage([...mainImage, file]);
            // body.append('mainImage', file)
            getBase64(file)
                .then(result => {
                    file["base64"] = result;
                    // console.log("File Is", typeof(result) );
                    setMainImage({
                        base64URL: result ,
                        file: meta
                    });
                })
                .catch(err => {
                    console.log(err);
                });
            // setMainImage(file);
        }

        if (status === "removed") {
            // setMainImage(mainImage.filter((x) => x.file.id !== meta.id));
            setMainImage([])
        }
    };

    const onSubImageChange = ({ meta, file }, status) => {
		if (status === "done") {
            getBase64(file)
                .then(result => {
                    file["base64"] = result;
                    setSubImage([...subImage,{
                        base64URL: result ,
                        file: meta
                    }]);
                })
                .catch(err => {
                    console.log(err);
                });
		}

		if (status === "removed") {
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
		const textMsg = files.length > 0 ? "Upload Again" : "Select Files";
		return (   
			<label className="btn btn-danger mt-4">
				{textMsg}
				<input
					style={{ display: "none" }}
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
            _id: jewelleryId,
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
            detailing: detailing,
            style: style,
            customization: customization,
            mainImage: mainImage,
            subImage: subImage

        }
        console.log("size", sizeAndCount)
        console.log("jewellery", jewellery)
        JewelleryService.updateJewelleryById(jewelleryId, jewellery).then(response => {
            if (response['status'] === 200) {
                Swal.fire({
                    title: 'Success',
                    text: 'Jewellery updated successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            }
        })
            .catch(err => {
                Swal.fire({
                    title: 'Oops!',
                    text: 'Something Went Wrong',
                    icon: 'warning',
                    confirmButtonText: 'OK'
                })
            })



    }
    var target
    var value
    let handleCheckboxChange = (event) => {


        target = event.target;
        value = target.value;

        if (target.checked) {
            setoccasionTypeId(preValues => [...preValues, value])
            setCheckedItems(!checkedItems)

        } else {
            occasionTypeId.splice(value, 1);
        }
    }

    const removeMainImage = (id) => {
        setMainImage({
            file: null,
            base64URL: null
        })
      };

      const removeSubImage = (id) => {
        setSubImage(subImage.filter((x) => x.file.id !== id));
      };

      let handleMainImageDisplay = () => {
        if (mainImage.base64URL) {
            return (
                <div style={{ border: '2px solid #d9d9d9' , marginLeft : 10 , marginTop: 8 ,padding: 10, borderRadius: 4, height: `150px` }}>
                    <img
                        src={mainImage.base64URL}
                        width="100px"
                        height="120px"
                        alt="placeholder grey 100px"
                    />
                    <button onClick={() => removeMainImage(mainImage.file.id)}>X</button>
                </div>
            )
        }
        else{
            return(
            <div className={`form-group row` } style={{marginLeft : '10px' }}>
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
                    dropzoneActive: { borderColor: "green" },
                }}
            />
            </div>)
        }
    }

    let handleSubImageDisplay = () => {
        let subImageLength = subImage.length 
        if (subImage) {
            return subImage.map((img, index) => {
                return (
                    <div key={img.file.id} style={{ border: '2px solid #d9d9d9', marginLeft: 10, marginTop: 8, padding: 10, borderRadius: 4, height: `150px` }}>
                            <img
                                key={img.file.id}
                                src={img.base64URL}
                                width="100px"
                                height="120px"
                                alt="placeholder grey 100px"
                            />
                            <button onClick={() => removeSubImage(img.file.id)}>X</button>
                    </div>

                )
            })
            
        }
        if(subImageLength < 4){
            return(<Dropzone
                onChangeStatus={onSubImageChange}
                InputComponent={selectFileInput}
                // getUploadParams={fileParams}
                getFilesFromEvent={getFilesFromEvent}
                accept="image/*,audio/*,video/*"
                maxFiles={3}
                inputContent="Drop A File"
                styles={{
                    dropzone: { width: 600, height: 100 },
                    dropzoneActive: { borderColor: "green" },
                }}
            />)
        }
    }


    // let chechdiff = ()=>{
    //     if(occasionTypeId.some(el => el['_id'] === value)){
    //         return setChecked(!checked)

    //     }
    //     // return false
    // }
    // defaultChecked = {checked} checked={occasionTypeId.some(el => el['_id'] === occasion['_id'])}

    useEffect(() => {
        getAllCategories()
        getJewelleryById()
    }, []);

    return (
        <div>
            <div className="content-wrapper">
                <section className="content">
                    <div className="container-fluid">
                        <br></br>
                        <div className="col-sm-6">
                            <h1>Update Jewellerying</h1>
                        </div>


                        <div className="card card-primary">
                            <div className="card-header">
                                <h3 className="card-title">Fill the jewellery details</h3>
                            </div>

                            <form className="form-horizontal">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Jewellery Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="jewelleryName" placeholder="Jewellery Name"
                                                        onChange={(e) => setjewelleryName(e.target.value)}
                                                        value={jewelleryName}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Jewellery Code</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="jewelleryCode" placeholder="Jewellery Code"
                                                        onChange={(e) => setjewelleryCode(e.target.value)}
                                                        value={jewelleryCode}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Jewellery Type</label>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`} >
                                                    <input className="custom-control-input" type="radio" id="sellingJewelleries" name="jewelleryType"
                                                        onChange={(e) => setJewelleryType("Sell")} 
                                                        value={jewelleryType} checked={jewelleryType === "Sell"} data-msg-containerid="errroForjewelleryType"></input>
                                                    <label className="custom-control-label" htmlFor="sellingJewelleries">Sell</label>
                                                    
                                                </div>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`}>
                                                    <input className="custom-control-input" type="radio" id="rentalJewelleries" name="jewelleryType"
                                                        onChange={(e) => setJewelleryType("Rental")} 
                                                        value={jewelleryType} checked={jewelleryType === "Rental"} data-msg-containerid="errroForjewelleryType"></input>
                                                    <label className="custom-control-label" htmlFor="rentalJewelleries">Rental</label>
                                                   
                                                </div>
                                               <div style={{marginLeft: 30, marginTop: 10, color:'red'}} id="errroForjewelleryType" />
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Gender</label>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`} >
                                                    <input className="custom-control-input" type="radio" id="menCollections" name="radio1"
                                                        onChange={(e) => setGender("Men")} value={gender}
                                                        checked={gender === "Men"}></input>
                                                    <label className="custom-control-label" htmlFor="menCollections">Men Colections</label>
                                                </div>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`}>
                                                    <input className="custom-control-input" type="radio" id="womenCollections" name="radio1"
                                                        onChange={(e) => setGender("Women")} value={gender}
                                                        checked={gender === "Women"}></input>
                                                    <label className="custom-control-label" htmlFor="womenCollections">Women Colections</label>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Occasion Type</label>
                                                <div className="col-md-6">
                                                    {
                                                        occasions.length > 0 && occasions.map((occasion, index) => {
                                                            return (
                                                                <div className='row' key={occasion['_id']}>
                                                                    <div className={`custom-control custom-checkbox ${styles.marginCheckRadio}`} >
                                                                        <input className="custom-control-input" type="checkbox" id={occasion['categoryName']} value={occasion['_id']} onChange={handleCheckboxChange}></input>
                                                                        <label className="custom-control-label" htmlFor={occasion['categoryName']}>{occasion['categoryName']}</label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Jewellery Category</label>
                                                <div className="col-sm-10">
                                                    <select className="custom-select" defaultValue={"default"} onChange={(e) => setjewelleryingCategoryId(e.target.value)}>
                                                        <option value={"default"} disabled>
                                                            {jewelleryingCategoryId['categoryName']}
                                                        </option>
                                                        {
                                                            jewelleryingCategories.length > 0 && jewelleryingCategories.map((category) => {
                                                                return (
                                                                    <option key={category['_id']} value={category['_id']}>{category['categoryName']}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">

                                            <label className="col-sm-2 col-form-label">Quantity</label>
                                                <div className="col-sm-10">
                                                    <div className="input-group">
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" placeholder="Quantity" onChange={(e) => setQuantity(e.target.value)} value={quantity} name="quantity"></input>
                                                        </div>

                                                       
                                                </div>

                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Price</label>
                                                <div className="col-sm-10">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" id="price" onChange={(e) => setprice(e.target.value)}
                                                            value={price}></input>
                                                        <div className="input-group-append">
                                                            <span className="input-group-text"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Discount</label>
                                                <div className="col-sm-10">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control" id="discount" onChange={(e) => setdiscount(e.target.value)}
                                                            value={discount}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">Main Image</label>
                                                {
                                                    handleMainImageDisplay()
                                                }
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Sub Image</label>
                                                {
                                                    handleSubImageDisplay()
                                                }
                                                
                                            </div>
                                            <div className={`form-group row` } style={{marginLeft : '75px' }} >
                                            {
                                                    subImage.length < 3 && 
                                                    <Dropzone
                                                    onChangeStatus={onSubImageChange}
                                                    InputComponent={selectFileInput}
                                                    // getUploadParams={fileParams}
                                                    getFilesFromEvent={getFilesFromEvent}
                                                    accept="image/*,audio/*,video/*"
                                                    maxFiles={3}
                                                    inputContent="Drop A File"
                                                    styles={{
                                                        dropzone: { width: 600, height: 300 },
                                                        dropzoneActive: { borderColor: "green" },
                                                    }}
                                                />
                                                }

                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Description</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="description" placeholder="Description"
                                                        onChange={(e) => setdescription(e.target.value)}
                                                        value={description}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Fabric</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="fabric" placeholder="Fabric"
                                                        onChange={(e) => setinclusions(e.target.value)}
                                                        value={inclusions}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Features</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="features" placeholder="Features"
                                                        onChange={(e) => setgemStones(e.target.value)}
                                                        value={gemStones}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Measurements</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="measurements" placeholder="Measurements"
                                                        onChange={(e) => setmetalAndFinish(e.target.value)}
                                                        value={metalAndFinish}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Style</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="style" placeholder="Style"
                                                        onChange={(e) => setstyle(e.target.value)}
                                                        value={style}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Wash Instructions</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="washInstructions" placeholder="Wash Instructions"
                                                        onChange={(e) => setdetailing(e.target.value)}
                                                        value={detailing}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Custom Alterations</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="customAltrations" placeholder="Custom Alterations"
                                                        onChange={(e) => setcustomization(e.target.value)}
                                                        value={customization}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={saveJewellery} >Update</button>
                                    <button type="submit" className="btn btn-default float-right">Cancel</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </section>
            </div >

        </div >
    );
}

export default UpdateJewellery;