import React, { useEffect, useState } from "react";
import styles from "./Cloth.module.css";
import { Link } from "react-router-dom";
import ClothService from "../../Services/ClothService";
import Swal from "sweetalert2";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import { getDroppedOrSelectedFiles } from "html5-file-selector";
import { FormValidator } from "@syncfusion/ej2-inputs";
import { json } from "stream/consumers";
import { any, string } from "prop-types";

let formObject;
const AddCloth = () => {
	const [occasions, setOccasions] = useState<any[]>([]);
	const [clothingCategories, setClothingCategories] = useState<any[]>([]);

	const [clothName, setClothName] = useState("");
	const [clothCode, setClothCode] = useState("");
	const [gender, setGender] = useState("");
	const [occasionTypeId, setOccasionTypeId] = useState<string[]>([]);
	const [clothingCategoryId, setClothingCategoryId] = useState("");
	const [price, setPrice] = useState("");
	const [discount, setDiscount] = useState("");
	const [mainImage, setMainImage] = useState<any>({
		file: null,
		base64URL: any,
	});
	const [subImage, setSubImage] = useState<any[]>([]);
	const [xsCount, setxsCount] = useState("");
	const [sCount, setsCount] = useState("");
	const [mCount, setmCount] = useState("");
	const [lCount, setlCount] = useState("");
	const [xlCount, setxlCount] = useState("");
	const [xxlCount, setxxlCount] = useState("");
	const [description, setDescription] = useState("");
	const [fabric, setFabric] = useState("");
	const [features, setFeatures] = useState("");
	const [measurements, setMeasurements] = useState("");
	const [style, setStyle] = useState("");
	const [washInstructions, setWashInstructions] = useState("");
	const [customAlterations, setCustomAlterations] = useState("");

	let sizeAndCount = [
		{
			size: "XS",
			count: xsCount,
		},
		{
			size: "S",
			count: sCount,
		},
		{
			size: "M",
			count: mCount,
		},
		{
			size: "L",
			count: lCount,
		},
		{
			size: "XL",
			count: xlCount,
		},
		{
			size: "XXL",
			count: xxlCount,
		},
	];

	const getAllCategories = async () => {
		let occasionsTemp: any[] = [];
		let categoriesTemp: any[] = [];

		ClothService.getAllCategories().then((response) => {
			let categoryResponse = response.data;
			categoryResponse.length > 0 &&
				categoryResponse.map((dd) => {
					if (dd.categoryType === "occasionType") {
						occasionsTemp.push(dd);
					}
					if (dd.categoryType === "clothingCategory") {
						categoriesTemp.push(dd);
					}
				});
			setOccasions(occasionsTemp);
			setClothingCategories(categoriesTemp);
		});
	};

	// const fileParams = ({ file,meta }) => {
	//     // console.log("fileParams", file, meta )
	//     const body = new FormData()
	//     body.append('fileField', file)
	// 	return { url: "https://httpbin.org/post" , body};
	// };
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
		if (status === "done") {
			console.log("fileParams", file, meta);

			// setMainImage([...mainImage, file]);
			// body.append('mainImage', file)
			getBase64(file)
				.then((result) => {
					file["base64"] = result;
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

		if (status === "removed") {
			// setMainImage(mainImage.filter((x) => x.file.id !== meta.id));
			setMainImage([]);
		}
	};

	const onSubImageChange = ({ meta, file }, status) => {
		if (status === "done") {
			// setSubImage([...subImage, file]);
			// setSubImage(file);
			getBase64(file)
				.then((result) => {
					file["base64"] = result;
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

	//    const mainImageHandler = (event) =>{
	//     const formData = new FormData();
	//     //FILE INFO NAME WILL BE "my-image-file"
	//     if( event.target.files[0]!=null){
	//         // formData.append('my-image-file', event.target.files[0], event.target.files[0].name);
	//         setMainImage([...mainImage,event.target.files[0]])
	//     }

	//         // setMainImage(event.target.files[0])
	//     }

	const saveCloth = async (e) => {
		e.preventDefault();

		// setmainImage("Url");
		let cloth = {
			clothName: clothName,
			clothCode: clothCode,
			gender: gender,
			occasionTypeId: occasionTypeId,
			clothingCategoryId: clothingCategoryId,
			sizeAndCount: sizeAndCount,
			price: price,
			discount: discount,
			description: description,
			fabric: fabric,
			features: features,
			measurements: measurements,
			style: style,
			washInstructions: washInstructions,
			customAltrations: customAlterations,
			mainImage: mainImage,
			subImage: subImage,
		};

		formObject.validate();
		if (formObject.validate()) {
			if (cloth.mainImage.file === null ||!cloth.occasionTypeId ||!cloth.clothingCategoryId
			) {
				Swal.fire({
					title: "Warning",
					text: "Mandatory data missing",
					icon: "warning",
					confirmButtonText: "OK",
				});
			} else {
				ClothService.saveCloths(cloth)
					.then((response) => {
						if (response["status"] === 200) {
							Swal.fire({
								title: "Success",
								text: "Cloth saved successfully",
								icon: "success",
								confirmButtonText: "OK",
							});
						}
					})
					.catch((err) => {
						Swal.fire({
							title: "Oops!",
							text: "Something Went Wrong",
							icon: "warning",
							confirmButtonText: "OK",
						});
					});
			}
		}
	};

	let handleCheckboxChange = (event) => {
		const target = event.target;
		var value = target.value;
		if (target.checked) {
			setOccasionTypeId((preValues) => [...preValues, value]);
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
				clothName: {
					required: [true, "* Please enter the Cloth Name"],
				},
				clothCode: {
					required: [true, "* Please enter your Cloth Code"],
				},
				gender: {
					required: [true, "* Please select atleast one gender"],
				},
				// occasionTypeId: {
				//     required: [true, '* Please select atleast one Occasion'],
				// },
				categoryName: {
					required: [true, "* Please select atleast one Cloth category"],
				},
				xsCount: {
					number: [true, "Please enter valid count"],
				},
				sCount: {
					number: [true, "Please enter valid count"],
				},
				mCount: {
					number: [true, "Please enter valid count"],
				},
				lCount: {
					number: [true, "Please enter valid count"],
				},
				xlCount: {
					number: [true, "Please enter valid count"],
				},
				xxlCount: {
					number: [true, "Please enter valid count"],
				},
				price: {
					number: [true, "Please enter valid price"],
				},
				discount: {
					number: [true, "Please enter valid discount"],
				},
			},
		};
		formObject = new FormValidator("#form1", options);
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

							<form id="form1" className="form-horizontal">
								<div className="card-body">
									<div className="row">
										<div className="col-md-6">
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">
													Cloth Name
												</label>
												<div className="col-sm-10">
													<input
														type="text"
														className="form-control"
														name="clothName"
														id="clothName"
														placeholder="Cloth Name"
														onChange={(e) => setClothName(e.target.value)}
														value={clothName}
														data-msg-containerid="errroForclothName"
													></input>
													 <div id="errroForclothName" />
												</div>
											</div>
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">
													Cloth Code
												</label>
												<div className="col-sm-10">
													<input
														type="text"
														className="form-control"
														name="clothCode"
														id="clothCode"
														placeholder="Cloth Code"
														onChange={(e) => setClothCode(e.target.value)}
														value={clothCode}
														// data-msg-containerid="errroForclothCode"
													></input>
													{/* <div id="errroForclothCode" /> */}
												</div>
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
														onChange={(e) => setGender("Men")}
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
														onChange={(e) => setGender("Women")}
														data-msg-containerid="errroForgender"
													></input>
													<label
														className="custom-control-label"
														htmlFor="womenCollections"
													>
														Women Colections
													</label>
												</div>
												<div style={{marginLeft: 30, marginTop: 10}} id="errroForgender" />
											</div>
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">
													Occasion Type
												</label>
												<div className="col-md-6">
													{occasions.length > 0 &&
														occasions.map((occasion, index) => {
															return (
																<div className="row" key={occasion["_id"]}>
																	<div
																		className={`custom-control custom-checkbox ${styles.marginCheckRadio}`}
																	>
																		<input
																			className="custom-control-input"
																			type="checkbox"
																			id={occasion["categoryName"]}
																			value={occasion["_id"]}
																			onChange={handleCheckboxChange}
																		></input>
																		<label
																			className="custom-control-label"
																			htmlFor={occasion["categoryName"]}
																		>
																			{occasion["categoryName"]}
																		</label>
																	</div>
																</div>
															);
														})}
												</div>
											</div>
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">
													Cloth Category
												</label>
												<div className="col-sm-10">
													<select
														className="custom-select"
														defaultValue={"default"}
														name= "categoryName"
														onChange={(e) =>
															setClothingCategoryId(e.target.value)
														}
													>
														<option value={"default"} disabled>
															Choose an option
														</option>
														{clothingCategories.length > 0 &&
															clothingCategories.map((category) => {
																return (
																	<option
																		key={category["_id"]}
																		value={category["_id"]}
																	>
																		{category["categoryName"]}
																	</option>
																);
															})}
													</select>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">
													Size And Count
												</label>
												<div className="col-md-6">
													<div className="row">
														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																XS
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																placeholder="Count"
																onChange={(e) => setxsCount(e.target.value)}
																value={xsCount}
																name="xsCount"
																data-msg-containerid="errroForxsCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroForxsCount"/>
														</div>

														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																S
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																id="inputPassword2"
																placeholder="Count"
																onChange={(e) => setsCount(e.target.value)}
																name="sCount"
																value={sCount}
																data-msg-containerid="errroForsCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroForsCount"/>
														</div>

														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																M
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																id="inputPassword3"
																name="mCount"
																placeholder="Count"
																onChange={(e) => setmCount(e.target.value)}
																value={mCount}
																data-msg-containerid="errroFormCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroFormCount"/>
														</div>

														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																L
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																id="inputPassword4"
																name="lCount"
																placeholder="Count"
																onChange={(e) => setlCount(e.target.value)}
																value={lCount}
																data-msg-containerid="errroForlCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroForlCount"/>
														</div>

														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																XL
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																id="inputPassword5"
																name="xlCount"
																placeholder="Count"
																onChange={(e) => setxlCount(e.target.value)}
																value={xlCount}
																data-msg-containerid="errroForxlCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroForxlCount"/>
														</div>

														<div className="col-sm-10 row">
															<label className="col-sm-4 col-form-label">
																XXL
															</label>
															<input
																type="text"
																className="col-sm-6 form-control form-control-sm"
																id="inputPassword6"
																name="xxlCount"
																placeholder="Count"
																onChange={(e) => setxxlCount(e.target.value)}
																value={xxlCount}
																data-msg-containerid="errroForxxlCount"
															></input>
															<div style={{marginLeft: '155px', color: 'red'}} id="errroForxxlCount"/>
														</div>
													</div>
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
															onChange={(e) => setPrice(e.target.value)}
															value={price}
															data-msg-containerid="errroForprice"
														></input>
														<div className="input-group-append">
															<span className="input-group-text"></span>
														</div>
													</div>
													<div id="errroForprice" />
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
															id="discount"
															onChange={(e) => setDiscount(e.target.value)}
															value={discount}
															data-msg-containerid="errroFordiscount"
														></input>
													</div>
													<div id="errroFordiscount" />
												</div>
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group row">
												<label htmlFor="file">Main Image</label>
												{/* <FileUploadComponent multiple= {false}></FileUploadComponent> */}
												{/* <input
													className={` ${styles.marginCheckRadio}`}
													type="file"
													id="file"
													name="file"
                                                    accept="image/*,audio/*,video/*"
                                                    onChange={mainImageHandler}
												></input> */}
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
														dropzoneActive: { borderColor: "green" },
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
														id="description"
														placeholder="Description"
														onChange={(e) => setDescription(e.target.value)}
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
														id="fabric"
														placeholder="Fabric"
														onChange={(e) => setFabric(e.target.value)}
														value={fabric}
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
														id="features"
														placeholder="Features"
														onChange={(e) => setFeatures(e.target.value)}
														value={features}
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
														id="measurements"
														placeholder="Measurements"
														onChange={(e) => setMeasurements(e.target.value)}
														value={measurements}
													></input>
												</div>
											</div>
											<div className="form-group row">
												<label className="col-sm-2 col-form-label">Style</label>
												<div className="col-sm-10">
													<input
														type="text"
														className="form-control"
														id="style"
														placeholder="Style"
														onChange={(e) => setStyle(e.target.value)}
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
														id="washInstructions"
														placeholder="Wash Instructions"
														onChange={(e) =>
															setWashInstructions(e.target.value)
														}
														value={washInstructions}
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
														id="customAltrations"
														placeholder="Custom Alterations"
														onChange={(e) =>
															setCustomAlterations(e.target.value)
														}
														value={customAlterations}
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
										onClick={saveCloth}
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

export default AddCloth;
