import React from "react";
import "./flash_sales.css";
import demo1 from "../../../assets/images/demo1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Product from "../../product/Product";
import CustomHeader from "../../customHeader/CustomHeader";
import CustomButton from "../../customButton/CustomButton";
import { productData } from "../../../assets/data";
import "swiper/css";
import "swiper/css/pagination";
import "./flash_sales.css"
const FlashSales = () => {
  return (
    <div className="custom-container mx-auto  border border-bottom-1 border-muted border-top-0 border-start-0 border-end-0">
      <CustomHeader smallHeading="Today's" largeHeading="Flash Sales" navBtnClass="flash-btn" showNav={true}/>
      <div className="product-container mt-4">
        <Swiper
       spaceBetween={20}
                slidesPerView={1}
                   pagination={{
                  el: ".flash_sales-custom-pagination", // Custom pagination element
                  bulletClass: "flash_sales_bullet", // Custom class for bullet dots
                  bulletActiveClass: "flash_sales_bullet-active", // Custom class for active bullet
                  clickable: true, // Make bullets clickable
                }}
                modules={[Navigation,Pagination]}
                breakpoints={{
                
                  576:{
                    slidesPerView:3,
                  },
                  992:{
                    slidesPerView:4,
                  },
                }}
               
                className='my-4 my-sm-5 '
                navigation={{
                  prevEl: ".flash-btn-prev",
                  nextEl: ".flash-btn-next",
                }}
              
        >
          {productData.flashData.map((item, key) => (
            <SwiperSlide key={key}>
              <Product key={key} img={item.img} offSale={item.sale} price={item.price} isNew={true} title={item.name}/>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="d-flex d-sm-none flash_sales-custom-pagination justify-content-center my-3"></div>
      </div>
      
     <div className="d-flex justify-content-center my-5">
      
     <CustomButton text="View All Products"/>

     </div>
    </div>
  );
};

export default FlashSales;
