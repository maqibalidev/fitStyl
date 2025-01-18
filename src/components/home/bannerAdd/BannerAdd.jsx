import React, { useEffect, useState } from 'react'
import "./banner_add.css";
import demo1 from "../../../assets/images/JBL_BOOMBOX_2_HERO_020_x1 (1) 1.png"
import {CustomButton} from '../../includes/imports';
import SkeletonComponent from '../../skeleton/Skeleton';
const BannerAdd = ({data}) => {
  const [isLoadedImage,setIsLoaded] = useState(false);


  return (
    <div className={`custom-container mx-auto banner-add-container row position-relative ${data && data.length > 0 && "bg-color-black"}`}>
{
  data && data.length > 0 ? 
  <>
  <div className="left col-12 col-sm-6 col-md-5  d-flex flex-column justify-content-between z-1">
  <div className="text-sec">
  <h6 className="small-heading color-green ">{data[0].heading}</h6>
   <h1 className="large-heading text-light mt-4">{data[0].title}</h1>
   <p className='desc mt-3'>{data[0].banner_desc}</p>
  </div>
  <CustomButton text="Buy Now!" isGreen={true}/>
 </div>
 <div className="right position-relative col-12 banner-add-img col-sm-6 col-md-7 d-flex z-0 justify-content-end align-items-center position-absolute bottom-0 top-0 my-auto">
   <img className={`w-100 object-fit-contain  ${isLoadedImage ? "d-block" : "d-none"}`}  src={data[0].image_url} alt="" onLoad={()=>setIsLoaded(true)} />
   {!isLoadedImage && <div className='w-100 d-flex justify-content-center z-4 image-loader'/>}
 </div>
  </>
 : 
 <SkeletonComponent isFluid={true} showTiles={false}/>
}
    </div>
  )
}


export default BannerAdd