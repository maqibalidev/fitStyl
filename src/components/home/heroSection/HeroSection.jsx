import React, { useState } from 'react'
import "./hero_section.css"
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowIcon } from '../../includes/imports';
import SkeletonComponent from '../../skeleton/Skeleton';
import Skeleton from 'react-loading-skeleton';
const HeroSection = ({data,categories}) => {

  const [isLoadedImage,setIsLoaded] = useState(false);
  return (
    <div className='custom-container mx-auto row position-relative'>
      <div className="col-3 hero-sec-left ps-0">
     <div className='hero-sec-left-inner border h-100 border-top-0  border-start-0  border-bottom-0 border-muted d-none d-md-block'>
     <h5 className='hero-sec-left-heading color-primary fw-medium'>Categories</h5>
        <ul className='list-unstyled d-flex flex-column gap-2 mt-2 hero-sec-left-list-items'>
           {
            categories && categories.length > 0 ?

           <>
             <li><Link to={`/products?cat=all`}>All</Link></li>
         {
              categories.map((item,index)=>(
                <li key={index}><Link to={`/products?cat=${item.id}`}>{item.name}</Link></li>
               ))
         }
           </>
           : <Skeleton count={6} className='w-75'/>
            }
        </ul>

     </div>
      </div>
      <div className="hero-sec-right col-12 col-md-9">
     {data && data.length > 0 ? <Swiper
        modules={[Pagination,Autoplay]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}
        loop
        autoplay= {
          {delay: 2000,pauseOnMouseEnter:true}
        }

      >
       {
        data.map((item,index)=>(
          <SwiperSlide key={index}>
          <div
          className='hero-slider-item d-flex position-relative '
          style={{ backgroundColor: `${item?.bgColor ?  item.bgColor :"rgb(0, 0, 0)"}`,
        
        }}

          >
           <div className="col-12 col-sm-6 item-left  d-flex flex-column justify-content-center gap-3 z-1" >
            <h6 className="small-heading  fw-lighter" 
            style={{ color: `${item?.textColor ?  item.textColor :"rgb(255, 253, 253)"}`}}
            >{item?.heading || ""}</h6>
            <h1 className="large-heading"
            style={{ color: `${item?.textColor ?  item.textColor :"rgb(255, 253, 253)"}`}}
            >{item.title}</h1>
            <Link className='slider-btn  position-relative'
            style={{ color: `${item?.textColor ?  item.textColor :"rgb(255, 253, 253)"}`}}
            to={`/product?id=${item.product_id}`} >Shop Now <ArrowIcon/></Link>
           </div>
           <div className="col-12 col-sm-6 top-0 hero-sec-slider-img  z-0 h-100 position-absolute  d-flex item-right justify-content-end justify-content-sm-center align-items-center">
           <img className={`slider-right-img ${isLoadedImage ? "d-block" : "d-none"}`} src={item.image_url} alt="" onLoad={()=>setIsLoaded(true)}/>
           {!isLoadedImage && <div className='image-loader'/>}
           </div>
          </div>
        </SwiperSlide>
        ))
       }
 
      </Swiper>
    :
    <SkeletonComponent count={1} isFluid={true}/>  
    }
      </div>
    </div>
  )
}

export default HeroSection
