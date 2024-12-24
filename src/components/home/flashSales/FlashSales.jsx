import React from "react";
import "./flash_sales.css";
import demo1 from "../../../assets/images/demo1.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import Product from "../../product/Product";
import CustomHeader from "../../customHeader/CustomHeader";
import CustomButton from "../../customButton/CustomButton";
const FlashSales = () => {
  return (
    <div className="custom-container mx-auto border border-bottom-1 border-muted border-top-0 border-start-0 border-end-0">
      <CustomHeader smallHeading="Today's" largeHeading="Flash Sales" navBtnClass="flash-btn" showNav={true}/>
      <div className="product-container mt-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={4}
          modules={[Navigation]}
          navigation={{
            prevEl: ".flash-btn-prev",
            nextEl: ".flash-btn-next",
          }}
        >
          {[...Array(10)].map((item, key) => (
            <SwiperSlide>
              <Product key={key} img={demo1} offSale="-40%" isNew={true}/>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
     <div className="d-flex justify-content-center my-5">
     <CustomButton text="View All Products"/>
     </div>
    </div>
  );
};

export default FlashSales;
