import React from 'react'
import "./hero_section.css"
import { Link } from 'react-router-dom'
import demoImg1 from '../../../assets/images/demo1.png' 
import { Swiper, SwiperSlide } from "swiper/react";

import { Pagination } from 'swiper/modules';
import { ArrowIcon } from '../../../assets/icons/icons';
const HeroSection = () => {
  return (
    <div className='custom-container mx-auto row'>
      <div className="col-3 hero-sec-left ps-0">
     <div className='hero-sec-left-inner border h-100 border-top-0  border-start-0  border-bottom-0 border-muted d-none d-md-block'>
     <h5 className='hero-sec-left-heading color-primary fw-medium'>Categories</h5>
        <ul className='list-unstyled d-flex flex-column gap-2 mt-2 hero-sec-left-list-items'>
            <li><Link to="#"> Men's Fashion </Link></li>
            <li><Link to="#"> Women's Fashion</Link></li>
            <li><Link to="#">Electronics</Link></li>
        </ul>
        <h5 className='hero-sec-left-heading color-primary fw-medium'>Services</h5>
        <ul className='list-unstyled d-flex flex-column gap-2 mt-2 hero-sec-left-list-items'>
            <li><Link to="#"> Abc</Link></li>
            <li><Link to="#"> EFG</Link></li>
        </ul>
     </div>
      </div>
      <div className="hero-sec-right col-12 col-md-9">
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={10}
        slidesPerView={1}

      >
        <SwiperSlide>
          <div
          className='hero-slider-item d-flex position-relative'
          >
           <div className="col-12 col-sm-6 item-left  d-flex flex-column justify-content-center gap-3 z-1">
            <h6 className="small-heading text-light fw-lighter">iPhone 14 Series</h6>
            <h1 className="large-heading text-light ">Up to 10% off Voucher</h1>
            <Link className='slider-btn text-light position-relative'>Shop Now <ArrowIcon/></Link>
           </div>
           <div className="col-12 col-sm-6 top-0 hero-sec-slider-img  z-0 h-100 position-absolute  d-flex item-right justify-content-end justify-content-sm-center align-items-center">
           <img className='slider-right-img' src={demoImg1} alt="" />
           </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              height: "200px",
              backgroundColor: "#9fc3ff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            Slide 2
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div
            style={{
              height: "200px",
              backgroundColor: "#9fffcb",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "20px",
            }}
          >
            Slide 3
          </div>
        </SwiperSlide>
      </Swiper>
      </div>
    </div>
  )
}

export default HeroSection
