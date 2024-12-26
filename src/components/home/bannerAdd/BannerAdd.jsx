import React from 'react'
import "./banner_add.css";
import demo1 from "../../../assets/images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
import CustomButton from '../../customButton/CustomButton';
const BannerAdd = () => {
  return (
    <div className='custom-container mx-auto banner-add-container row position-relative bg-color-black'>
      <div className="left col-12 col-sm-6 col-md-5  d-flex flex-column justify-content-between z-1">
       <div className="text-sec">
       <h6 className="small-heading color-green ">Categories</h6>
        <h1 className="large-heading text-light mt-4">Enhance Your Music Experience</h1>
        <p className='desc mt-3'>Enter Your details below</p>
       </div>
       <CustomButton text="Buy Now!" isGreen={true}/>
      </div>
      <div className="right position-relative col-12 banner-add-img col-sm-6 col-md-7 d-flex z-0 justify-content-end align-items-center position-absolute bottom-0 top-0 my-auto">
        <img className='w-100 object-fit-contain'  src={demo1} alt="" />
      </div>
    </div>
  )
}
export default BannerAdd
