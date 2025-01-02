import React, { useEffect, useState } from 'react'

import demo from "../../assets/images/Copa_Sense 1.png"
import { AddIcon, ArrowLEFT, ArrowRight, FavoriteIcon, RatingIcon, SubtractIcon } from '../../assets/icons/icons'
import "./product_details.css";
import { Navigation, Pagination } from 'swiper/modules'
import { SwiperSlide , Swiper } from 'swiper/react'
import { productData } from '../../assets/data'
import { Footer, Header, Image } from '../includes/imports';
const ProductDetails = () => {
    const [swiperInstance, setSwiperInstance] = useState(null);
    const [index,setIndex] = useState(0);
    const [colorIndex,setColorIndex] = useState(0);
    const [sizeIndex,setSizeIndex] = useState(0);
    const [image,setImage] = useState("");

useEffect(()=>{

setImage(productData.flashData[index].img)
if (swiperInstance) {
    swiperInstance.slideTo(index);
  }
}, [index, swiperInstance]);



const handleImageClick = () => {
    if (index < productData.flashData.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
      
    }
  };
  
const  handlePrevClick = ()=>{
    if (index > 0) {
        setIndex(prev => prev - 1);
        console.log(index)
    }
    else{
        setIndex(productData.flashData.length-1)
    }
}

  
const  handleNextClick = ()=>{
    if (index < productData.flashData.length-1) {
        setIndex((prev)=> prev + 1);
        console.log(index)
    }
    else{
        setIndex(0)
    }

}

  return (
    <div>
      <Header/>
<div className="custom-container mx-auto row py-5">
    <div className=" product-detail-left  col-12 col-md-7 bg-color-lightgrey d-flex align-items-center justify-content-center position-relative">
        <Image url={image} />
        {/* <img onClick={handleImageClick} className='user-select-none' src={image} alt="" /> */}
<div className='position-absolute d-none d-sm-flex start-0 top-0 d-flex align-items-center my-auto bottom-0 mx-2 z-5'>
<button onClick={handlePrevClick} className="  p-2 rounded-circle lh-1 bg-color-orange text-light border-0"><ArrowLEFT/></button>

</div>

<div className='position-absolute d-none d-sm-flex end-0 top-0 d-flex align-items-center my-auto bottom-0  z-5 mx-2'>
<button onClick={handleNextClick} className="  p-2 rounded-circle lh-1 bg-color-orange text-light border-0"><ArrowRight/></button>

</div>
        <div className="product-images-bottom position-absolute bottom-0 start-0 end-0 mx-auto d-flex">
       
        <Swiper
       spaceBetween={10}
       onSwiper={(swiper) => setSwiperInstance(swiper)} 
                slidesPerView={2}
                   pagination={{
                  el: ".flash_sales-custom-pagination", 
                  bulletClass: "flash_sales_bullet", 
                  bulletActiveClass: "flash_sales_bullet-active",
                  clickable: true,
                }}
                modules={[Navigation,Pagination]}
                breakpoints={{
                
                  576:{
                    slidesPerView:3,
                    spaceBetween:20
                  },
                  992:{
                    slidesPerView:4,
                  },
                }}
               
                className='my-2 my-sm-2 mx-2'
                navigation={{
                  prevEl: ".product-detail-prev",
                  nextEl: ".product-detail-next",
                }}
              
        >
       
           {productData.flashData.map((item,key)=>(
           <SwiperSlide key={key}>
           <div
             onClick={() => setIndex(key)}
             className={`product-details-img-item d-flex align-items-center justify-content-center p-3 rounded-2 ${index === key ? "product-details-img-item-selected" : ""}`}
           >
               <Image url={item.img}/>
             {/* <img className=' user-select-none' src={item.img}  alt="" /> */}
           </div>
         </SwiperSlide>
           ))}
          
        </Swiper>
         
        </div>
    </div>
    <div className="col-12 col-md-5 px-0 py-5 px-md-3 px-lg-5 ">
       <div className='border-bottom border-1 border-dark d-flex flex-column gap-2 pb-3'>
       <h4>Havic HV G-92 Gamepad</h4>
        <div  className='d-flex gap-2 align-items-center'>
            <RatingIcon color="var(--primary-color)"/>
            <RatingIcon color="var(--primary-color)"/>
            <RatingIcon color="var(--primary-color)"/>
            <RatingIcon color="var(--primary-color)"/>
            <RatingIcon color="var(--primary-color)"/>
          <span className='color-lightgrey'>(1450 Reviews)</span>
        </div>

        <span className='fs-4 fw-medium'>$192.00</span>

        <p className='mt-2'>PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.</p>
       </div>

<div className="colors-container d-flex align-items-center gap-2 py-3">
    <span className='fs-4'>Colors:</span>
    
    <div className='d-flex gap-2'>
    {
    ['#ff6565','#6b4ed9','#4ed980'].map((item,key)=>(
<div key={key} onClick={()=>setColorIndex(key)} style={{"--product-color":item}} className={`product-color-btn  p-2 rounded-circle ${colorIndex===key && 'product-color-btn-active'}`}></div>    )
)
}

    

    </div>
</div>

<div className="size-container d-flex align-items-center gap-3 py-2">
<span className='fs-4 me-2'>Sizes:</span>
{
    ['XS','XL','SM'].map((item,key)=>(
        <button onClick={()=>setSizeIndex(key)} key={key}  className={`product-size-btn shadow-sm d-flex align-items-center justify-content-center rounded-1 ${sizeIndex===key && 'product-size-btn-active'}`}>{item}</button>
    ))
}

</div>

<div className="d-flex row justify-content-between gx-3 mt-4">
    <div className="left d-flex col-5">
    <button className='p-2 product-details-btn  rounded-1 rounded-end-0'><AddIcon/></button>
    <input value={0} className='form-control rounded-0 text-center shadow-none' type="number" />
    <button className='p-2 product-details-btn   rounded-1 rounded-start-0 '><SubtractIcon/></button>
    </div>
    <button className="center col-4 bg-color-orange border-0 rounded-1 text-light">
Add to cart
    </button>

   <div className='col-2'>
   <button className='product-details-btn product-details-fav-icon shadow-sm p-2  rounded-1'><FavoriteIcon/></button>
   </div>
</div>

    </div>
</div>
      <Footer/>
    </div>
  )
}

export default ProductDetails
