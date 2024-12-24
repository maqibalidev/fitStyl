import React from 'react'
import "./banner_add.css";
import demo1 from "../../../assets/images/demo1.png"
import CustomButton from '../../customButton/CustomButton';
const BannerAdd = () => {
  return (
    <div className='custom-container mx-auto banner-add-container row'>
      <div className="left col-5 d-flex flex-column justify-content-between">
       <div className="text-sec">
       <h6 className="small-heading color-green ">Categories</h6>
        <h1 className="large-heading text-light mt-4">Enhance Your Music Experience</h1>
        <p className='desc mt-3'>Enter Your details below</p>
       </div>
       <CustomButton text="Buy Now!" isGreen={true}/>
      </div>
      <div className="right col-7 d-flex justify-content-center align-items-center">
        <img src={demo1} alt="" />
      </div>
    </div>
  )
}
export default BannerAdd
