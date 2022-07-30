import React, { useEffect, useState } from 'react';
import styles from './Jewellery.module.css'
import { Link, useLocation } from 'react-router-dom'
import JewelleryService from '../../Services/JewelleryService'
import Swal from 'sweetalert2'



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
    const [gender, setGender] = useState("");
    const [occasionTypeId, setoccasionTypeId] = useState<string[]>([]);
    const [jewelleryingCategoryId, setjewelleryingCategoryId] = useState("");
    const [price, setprice] = useState("");
    const [discount, setdiscount] = useState("");
    const [mainImage, setmainImage] = useState("");
    const [subImage, setsubImage] = useState("");
    const [xsCount, setxsCount] = useState("");
    const [sCount, setsCount] = useState("");
    const [mCount, setmCount] = useState("");
    const [lCount, setlCount] = useState("");
    const [xlCount, setxlCount] = useState("");
    const [xxlCount, setxxlCount] = useState("");
    const [description, setdescription] = useState("");
    const [inclusions, setinclusions] = useState("");
    const [gemStones, setgemStones] = useState("");
    const [metalAndFinish, setmetalAndFinish] = useState("");
    const [style, setstyle] = useState("");
    const [detailing, setdetailing] = useState("");
    const [customization, setcustomization] = useState("");
    
    const [checkedItems, setCheckedItems] = React.useState(false);


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

    const getJewelleryById = () =>{
        JewelleryService.getJewelleryById(jewelleryId).then(response =>{
            let obj = response.data
            console.log("res",response)
            setjewelleryName(obj.jewelleryName)
            setjewelleryCode(obj.jewelleryCode)
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
            obj.sizeAndCount.map(sizeObj => {
                switch (sizeObj.size) {
                    case 'XS':
                        setxsCount(sizeObj.count)
                        break;
                    case 'S':
                        setxsCount(sizeObj.count)
                        break;
                    case 'M':
                        setxsCount(sizeObj.count)
                        break;
                    case 'L':
                        setxsCount(sizeObj.count)
                        break;
                    case 'XL':
                        setxsCount(sizeObj.count)
                        break;
                    case 'XXL':
                        setxsCount(sizeObj.count)
                        break;
                    default:
                        break;
                }

            })
            
        })
        
    }


    const saveJewellery = async (e) => {
        e.preventDefault();
        setmainImage("Url")
        setsubImage("url")
        let jewellery = {
            _id: jewelleryId,
            jewelleryName: jewelleryName,
            jewelleryCode: jewelleryCode,
            gender: gender,
            occasionTypeId: occasionTypeId,
            jewelleryingCategoryId: jewelleryingCategoryId,
            sizeAndCount: sizeAndCount,
            price: price,
            discount: discount,
            description:description,
            inclusions:inclusions,
            gemStones:gemStones,
            metalAndFinish:metalAndFinish,
            detailing:detailing,
            style:style,
            customization:customization,
            mainImage: mainImage,
            subImage: subImage

        }
        console.log("size", sizeAndCount)
        console.log("jewellery", jewellery)
        JewelleryService.updateJewelleryById(jewelleryId,jewellery).then(response => {
            if(response['status'] === 200){
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
    let handleCheckboxChange = (event) =>{
        
        
        target = event.target;
        value = target.value;
        
        if(target.checked){
            setoccasionTypeId(preValues => [...preValues, value])
            setCheckedItems(!checkedItems)

        }else{
            occasionTypeId.splice(value, 1);
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
    },[]);

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
                                                        occasions.length > 0 && occasions.map((occasion, index)=> {
                                                            return (
                                                                <div className='row' key={occasion['_id']}>
                                                                    <div className={`custom-control custom-checkbox ${styles.marginCheckRadio}`} >
                                                                        <input className="custom-control-input"  type="checkbox" id={occasion['categoryName']}  value={occasion['_id']} onChange={handleCheckboxChange}></input>
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
                                                <input className={` ${styles.marginCheckRadio}`} type="file" id="file" name="file" multiple></input>
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