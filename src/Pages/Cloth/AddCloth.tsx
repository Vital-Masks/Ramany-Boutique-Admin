import React, { useEffect, useState } from 'react';
import styles from './Cloth.module.css'
import { Link } from 'react-router-dom'
import ClothService from '../../Services/ClothService'
import Swal from 'sweetalert2'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { getDroppedOrSelectedFiles } from 'html5-file-selector'



let AddCloth = () => {
    let occasionsTemp: string[] = [];
    let categoriesTemp: string[] = [];
    let subImageTemp: any[] = []

    let sizeAndCount;

    const [occasions, setoccasions] = useState([{}]);
    const [clothingCategories, setClothingCategories] = useState([{}]);

    const [clothName, setclothName] = useState("");
    const [clothCode, setclothCode] = useState("");
    const [gender, setGender] = useState("");
    const [occasionTypeId, setoccasionTypeId] = useState<string[]>([]);
    const [clothingCategoryId, setclothingCategoryId] = useState("");
    const [price, setprice] = useState("");
    const [discount, setdiscount] = useState("");
    const [mainImage, setmainImage] = useState("");
    let   [subImage, setsubImage] = useState([{}]);
    const [xsCount, setxsCount] = useState("");
    const [sCount, setsCount] = useState("");
    const [mCount, setmCount] = useState("");
    const [lCount, setlCount] = useState("");
    const [xlCount, setxlCount] = useState("");
    const [xxlCount, setxxlCount] = useState("");
    const [description, setdescription] = useState("");
    const [fabric, setfabric] = useState("");
    const [features, setfeatures] = useState("");
    const [measurements, setmeasurements] = useState("");
    const [style, setstyle] = useState("");
    const [washInstructions, setwashInstructions] = useState("");
    const [customAltrations, setcustomAltrations] = useState("");
    


    const [alertOpen, setAlertOpen] = useState(false);

    sizeAndCount = [{
        "size": "XS",
        "count": xsCount
    },
    {
        "size": "S",
        "count": sCount
    },
    {
        "size": "M",
        "count": mCount
    },
    {
        "size": "L",
        "count": lCount
    },
    {
        "size": "XL",
        "count": xlCount
    },
    {
        "size": "XXL",
        "count": xxlCount
    }]
    
    const getAllCategories = async () => {
        ClothService.getAllCategories().then((response) => {
            let categoryResponse = response.data
            categoryResponse.length > 0 && categoryResponse.map((dd) => {
                if (dd.categoryType === 'occasionType') {
                    occasionsTemp.push(dd)
                }
                if (dd.categoryType === 'clothingCategory') {
                    categoriesTemp.push(dd)
                }
            })
            setoccasions(occasionsTemp)
            setClothingCategories(categoriesTemp)
        })
    }

    const fileParams = ({ meta }) => {
        return { url: 'https://httpbin.org/post' }
    }
    const onFileChange =  ({ meta, file }, status) => {
        console.log("onFIle change", status, meta, file) 

        if(status === 'done'){
            subImageTemp.push(meta)
            console.log("subImageFinal",subImageTemp)
        }
       setsubImage(subImageTemp)
        


    }
    const onSubmit = async (files, allFiles) => {
        // setsubImage(files)
        subImage.length = 0
        console.log("allfiles2", files)
        if(files){
            return setsubImage(files)
        }
        
        // console.log("subImageFinal",subImage)
        // files.foreach(element => {
        //     subImageTemp.push(element)
        //     // setsubImage(subImageTemp)
            
        // });
        // setsubImage(subImageTemp)

        // allFiles.forEach(f => {
        //     f.remove()
        // })
        
        
    }
    
    const getFilesFromEvent = (e) => {
        // return new Promise(resolve => {
           return getDroppedOrSelectedFiles(e).then(chosenFiles => {
                // resolve(chosenFiles.map(f => f.fileObject))
                return chosenFiles.map(f => f.fileObject)
            // })
        })
    }
    const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
        const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
        return (
            <label className="btn btn-danger mt-4">
                {textMsg}
                <input
                    style={{ display: 'none' }}
                    type="file"
                    accept={accept}
                    onChange={e => {
                        getFilesFromEvent(e).then(chosenFiles => {
                            onFiles(chosenFiles)
                        })
                    }}
                />
            </label>
        )
    }


    const saveCloth = async (e) => {
        e.preventDefault();
        setmainImage("Url")
        let cloth = {
            clothName: clothName,
            clothCode: clothCode,
            gender: gender,
            occasionTypeId: occasionTypeId,
            clothingCategoryId: clothingCategoryId,
            sizeAndCount: sizeAndCount,
            price: price,
            discount: discount,
            description:description,
            fabric:fabric,
            features:features,
            measurements:measurements,
            style:style,
            washInstructions:washInstructions,
            customAltrations:customAltrations,
            mainImage: mainImage,
            subImage: subImage

        }
        console.log("subImage", subImage)
        ClothService.saveCloths(cloth).then(response => {
            if(response['status'] === 200){
                Swal.fire({
                    title: 'Success',
                    text: 'Cloth saved successfully',
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
    let handleCheckboxChange = (event) =>{
        const target = event.target;
        var value = target.value;
        if(target.checked){
            setoccasionTypeId(preValues => [...preValues, value])

        }else{
            occasionTypeId.splice(value, 1);
        }
    }



    useEffect(() => {
        getAllCategories()
    },[]);

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

                            <form className="form-horizontal">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Cloth Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="clothName" placeholder="Cloth Name"
                                                        onChange={(e) => setclothName(e.target.value)}
                                                        value={clothName}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Cloth Code</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="clothCode" placeholder="Cloth Code"
                                                    onChange={(e) => setclothCode(e.target.value)}
                                                    value={clothCode}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Gender</label>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`} >
                                                    <input className="custom-control-input" type="radio" id="menCollections" name="radio1"
                                                   onChange={(e) => setGender("Men")}></input>
                                                    <label className="custom-control-label" htmlFor="menCollections">Men Colections</label>
                                                </div>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`}>
                                                    <input className="custom-control-input" type="radio" id="womenCollections" name="radio1"
                                                    onChange={(e) => setGender("Women")}></input>
                                                    <label className="custom-control-label" htmlFor="womenCollections">Women Colections</label>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Occasion Type</label>
                                                <div className="col-md-6">
                                                    {
                                                        occasions.length > 0 && occasions.map((occasion, index)=> {
                                                            return (
                                                                <div className='row' key={occasion['_id']}>
                                                                    <div className={`custom-control custom-checkbox ${styles.marginCheckRadio}`} >
                                                                        <input className="custom-control-input"  type="checkbox" id={occasion['categoryName']} value={occasion['_id']} onChange={handleCheckboxChange}></input>
                                                                        <label className="custom-control-label" htmlFor={occasion['categoryName']}>{occasion['categoryName']}</label>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Cloth Category</label>
                                                <div className="col-sm-10">
                                                    <select className="custom-select" defaultValue={"default"} onChange={(e) => setclothingCategoryId(e.target.value)}>
                                                        <option value={"default"} disabled>
                                                            Choose an option
                                                        </option>
                                                        {
                                                            clothingCategories.length > 0 && clothingCategories.map((category) => {
                                                                return (
                                                                    <option key={category['_id']} value={category['_id']}>{category['categoryName']}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="form-group row">

                                                <label className="col-sm-2 col-form-label">Size And Count</label>
                                                <div className="col-md-6">
                                                    <div className='row'>
                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">XS</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" placeholder="Count" onChange={(e) => setxsCount(e.target.value)} value={xsCount} name ="xsCount"></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">S</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword2" placeholder="Count" onChange={(e) => setsCount(e.target.value)} name ="sCount" value={sCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">M</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" onChange={(e) => setmCount(e.target.value)} value={mCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">L</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword4" placeholder="Count" onChange={(e) => setlCount(e.target.value)} value={lCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">XL</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword5" placeholder="Count" onChange={(e) => setxlCount(e.target.value)} value={xlCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">XXL</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword6" placeholder="Count" onChange={(e) => setxxlCount(e.target.value)} value={xxlCount}></input>
                                                        </div>
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
                                                <label htmlFor="file">Main Image</label>
                                                {/* <FileUploadComponent multiple= {false}></FileUploadComponent> */}
                                                <input className={` ${styles.marginCheckRadio}`} type="file" id="file" name="file" multiple></input>
                                            </div>
                                            <div className="form-group row">
                                                <label htmlFor="file">Sub Image</label>
                                                <Dropzone
                                                    onSubmit={onSubmit}
                                                    onChangeStatus={onFileChange}
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
                                                        onChange={(e) => setfabric(e.target.value)}
                                                        value={fabric}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Features</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="features" placeholder="Features"
                                                        onChange={(e) => setfeatures(e.target.value)}
                                                        value={features}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Measurements</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="measurements" placeholder="Measurements"
                                                        onChange={(e) => setmeasurements(e.target.value)}
                                                        value={measurements}></input>
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
                                                        onChange={(e) => setwashInstructions(e.target.value)}
                                                        value={washInstructions}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Custom Alterations</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="customAltrations" placeholder="Custom Alterations"
                                                        onChange={(e) => setcustomAltrations(e.target.value)}
                                                        value={customAltrations}></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                                <div className="card-footer">
                                    <button type="submit" className="btn btn-info" onClick={saveCloth} >Submit</button>
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

export default AddCloth;