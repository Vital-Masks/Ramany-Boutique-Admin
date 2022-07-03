import React, { useEffect, useState } from 'react';
import styles from './Product.module.css'
import { Link } from 'react-router-dom'
import ProductService from '../../Services/ProductService'

let ViewProducts = () => {

    const [productData, setProductData] = useState({
        products: []
    });
  

    useEffect(() => {
        ProductService.getAllProducts().then((response) => {
            console.log(response)
            setProductData(() => ({
                products: response.data
            }))

        }).catch((err) => {
            console.log(err)
        })      
        
    }, []);

    


    let { products } = productData


    // const tableRows = 
    // products.length > 0 && products.map(product => {
    //     console.log("info",product)
    //     return (
    //         <tr key={product._id}>
    //              <td>{product.productName}</td>
    //              <td>{product.productCode}</td>
    //              <td>{product.count}</td>
    //         </tr>
    //     );
    // });

    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header ">
                    <br></br>
                    <div className="row">
                        <div className="col ">
                            <h3>Product List</h3>
                        </div>
                        <div className="col col-lg-2">
                        <Link to='/addProduct'>
                            <button type="button" className="btn btn-block btn-success"><i className="fa fa-home" ></i>Add Product</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Product Code</th>
                                <th>Gender</th>
                                <th>Product Type</th>
                                <th>Occasion </th>
                                <th>Cloth Category </th>
                                <th>Price</th>
                                <th>Discount</th>
                                <th>Main Image</th>
                                <th>Sub Image</th>
                            </tr>                           
                        </thead>
                        <tbody>
                            {
                                products.length > 0 && products.map(product => {
                                    return (
                                        <tr key={product['_id']}>
                                            <td>{product['productName']}</td>
                                            <td>{product['productCode']}</td>
                                            <td>{product['gender']}</td>
                                            <td>{product['productType']}</td>
                                            <td>{product['occasionTypeId']['categoryName']}</td>
                                            <td>{product['clothingCategoryId']['categoryName']}</td>
                                            <td>{product['price']}</td>
                                            <td>{product['discount']}</td>
                                            <td>{product['mainImage']}</td>
                                            <td>{product['subImage']}</td>
                                            <td><Link to='/addProduct'><button className="btn btn-block bg-gradient-info">view</button></Link> </td>
                                            <td><button className="btn btn-block bg-gradient-danger">Delete</button></td>
                                        </tr>                                        
                                    );
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewProducts;