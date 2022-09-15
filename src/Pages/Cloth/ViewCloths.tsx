import React, { useEffect, useState } from 'react';
import styles from './Cloth.module.css'
import { Link } from 'react-router-dom'
import ClothService from '../../Services/ClothService'
import Swal from 'sweetalert2'

let ViewCloths = () => {

    const [clothData, setClothData] = useState({
        cloths: []
    });
  

    useEffect(() => {
        ClothService.getAllCloths().then((response) => {
            console.log(response)
            setClothData(() => ({
                cloths: response.data
            }))

        }).catch((err) => {
            console.log(err)
        })      
        
    }, []);

    const deleteCloth = (clothId) => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          ClothService.deleteCloth(clothId).then((response) => {
            if (response["status"] === 200) {
              Swal.fire({
                title: "Deleted",
                text: "Cloth Deleted Successfully",
                icon: "success",
                confirmButtonText: "OK",
              }).then((result)=>{
                if(result.isConfirmed){ 
                    window.location.reload()
                }
              });
              
            } else {
              Swal.fire({
                title: "Oops!",
                text: "Something Went Wrong",
                icon: "warning",
                confirmButtonText: "OK",
              });
            }
          });
        }
      });
    };

    


    let { cloths } = clothData


    return (
        <div className="content-wrapper">
            <div className="card">
                <div className="card-header ">
                    <br></br>
                    <div className="row">
                        <div className="col ">
                            <h3>Cloth List</h3>
                        </div>
                        <div className="col col-lg-2">
                        <Link to='/addCloth'>
                            <button type="button" className="btn btn-block btn-success"><i className="fa fa-home" ></i>Add Cloth</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="card-body">
                    <table id="example1" className="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Cloth Name</th>
                                <th>Cloth Code</th>
                                <th>Cloth Type</th>
                                <th>Gender</th>
                                <th>Cloth Category </th>
                                <th>Price</th>
                                <th>Discount</th>
                                {/* <th>Main Image</th>
                                <th>Sub Image</th> */}
                            </tr>                           
                        </thead>
                        <tbody>
                            {
                                cloths.length > 0 && cloths.map(cloth => {
                                    return (
                                        <tr key={cloth['_id']}>
                                            <td>{cloth['clothName']}</td>
                                            <td>{cloth['clothCode']}</td>
                                            <td>{cloth['clothType']}</td>
                                            <td>{cloth['gender']}</td>
                                            <td>{cloth['clothingCategoryId']? cloth['clothingCategoryId']['categoryName'] : null}</td>
                                            <td>{cloth['price']}</td>
                                            <td>{cloth['discount']}</td>
                                            {/* <td>{cloth['mainImage']}</td>
                                            <td>{cloth['subImage']}</td> */}
                                            <td><Link to={{pathname:'/updateCloth', search:`?id=${cloth['_id']}`}} ><button className="btn btn-block bg-gradient-info">View</button></Link> </td>
                                            <td><button className="btn btn-block bg-gradient-danger" onClick={()=>deleteCloth(cloth['_id'])} >Delete</button></td>
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

export default ViewCloths;