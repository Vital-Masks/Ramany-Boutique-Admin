import React, { useEffect, useState } from 'react';
import styles from './Product.module.css'
import { Link } from 'react-router-dom'
import ProductService from '../../Services/ProductService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


let AddProduct = () => {
    let occasionsTemp: string[] = [];
    let categoriesTemp: string[] = [];
    let sizeAndCountTemp
    let xsCount
    let sCount
    let mCount
    let lCount
    let xlCount
    let xxlCount

    sizeAndCountTemp = [{
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
    


    // const element = <FontAwesomeIcon icon={faCoffee} />
    const [occasions, setoccasions] = useState([{}]);
    const [clothingCategories, setClothingCategories] = useState([{}]);

    const [productName, setproductName] = useState("");
    const [productCode, setproductCode] = useState("");
    const [gender, setGender] = useState("");
    const [productType, setproductType] = useState("");
    const [occasionTypeId, setoccasionTypeId] = useState("");
    const [clothingCategoryId, setclothingCategoryId] = useState("");
    const [sizeAndCount, setsizeAndCount] = useState([{}]);
    const [price, setprice] = useState("");
    const [discount, setdiscount] = useState("");
    const [mainImage, setmainImage] = useState("");
    const [subImage, setsubImage] = useState("");



    const getAllCategories = async () => {
        ProductService.getAllCategories().then((response) => {
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

    // const dsa =async () => {  uploadMultipleFiles(e) {
    //     this.fileObj.push(e.target.files)
    //     for (let i = 0; i < this.fileObj[0].length; i++) {
    //         this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
    //     }
    //     this.setState({ file: this.fileArray })
    // }
    // }

    const saveCloth = async () => {
        setsizeAndCount(sizeAndCountTemp)
        setmainImage("Url")
        setsubImage("url")
        setproductType("cloth")
        let cloth = {
            productName: productName,
            productCode: productCode,
            gender: gender,
            productType: productType,
            occasionTypeId: occasionTypeId,
            clothingCategoryId: clothingCategoryId,
            sizeAndCount: sizeAndCount,
            price: price,
            discount: discount,
            mainImage: mainImage,
            subImage: subImage

        }
        console.log("cloth",cloth)
        // ProductService.saveProducts(cloth)

    }



    useEffect(() => {
        getAllCategories()
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
                                <h3 className="card-title">Fill the product details</h3>
                            </div>

                            <form className="form-horizontal">

                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Product Name</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="productName" placeholder="Product Name"
                                                        onChange={(e) => setproductName(e.target.value)}
                                                        value={productName}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Product Code</label>
                                                <div className="col-sm-10">
                                                    <input type="text" className="form-control" id="productCode" placeholder="Product Code"
                                                    onChange={(e) => setproductCode(e.target.value)}
                                                    value={productCode}></input>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Gender</label>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`} >
                                                    <input className="custom-control-input" type="radio" id="menCollections" name="radio1"
                                                   ></input>
                                                    <label className="custom-control-label" htmlFor="menCollections">Men Colections</label>
                                                </div>
                                                <div className={`custom-control custom-radio ${styles.marginCheckRadio}`}>
                                                    <input className="custom-control-input" type="radio" id="womenCollections" name="radio1"
                                                    ></input>
                                                    <label className="custom-control-label" htmlFor="womenCollections">Women Colections</label>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Occasion Type</label>
                                                <div className="col-md-6">
                                                    {
                                                        occasions.length > 0 && occasions.map(occasion => {
                                                            return (
                                                                <div className='row'>
                                                                    <div className={`custom-control custom-checkbox ${styles.marginCheckRadio}`} key={occasion['_id']}>
                                                                        <input className="custom-control-input" type="checkbox" id={occasion['categoryName']} value={occasion['categoryName']}></input>
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
                                                    <select className="custom-select" >
                                                        {
                                                            clothingCategories.length > 0 && clothingCategories.map(category => {
                                                                return (
                                                                    <option key={category['_id']}>{category['categoryName']}</option>
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
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={xsCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">S</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={sCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">M</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={mCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">L</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={lCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">XL</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={xlCount}></input>
                                                        </div>

                                                        <div className="col-sm-10 row">
                                                            <label className="col-sm-4 col-form-label">XXL</label>
                                                            <input type="text" className="col-sm-6 form-control form-control-sm" id="inputPassword3" placeholder="Count" value={xxlCount}></input>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className="form-group row">
                                                <label className="col-sm-2 col-form-label">Price</label>
                                                <div className="col-sm-10">
                                                    <div className="input-group">
                                                        <input type="text" className="form-control"onChange={(e) => setprice(e.target.value)}
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
                                                        <input type="text" className="form-control"onChange={(e) => setdiscount(e.target.value)}
                                                        value={discount}></input>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div >
                                            <label htmlFor="file">Main Image</label>
                                            <input className={` ${styles.marginCheckRadio}`} type="file" id="file" name="file" multiple></input>
                                            
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

export default AddProduct;