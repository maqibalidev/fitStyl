import React, { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import {CustomHeader,CustomButton,Product} from "../../includes/imports"
import { productData } from "../../../assets/data";
import "swiper/css";
import "swiper/css/pagination";
import SkeletonComponent from "../../skeleton/Skeleton";

const FlashSales = () => {
  const [isLoaded,setIsLoaded] = useState(true);
  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el:".flash_sales-custom-pagination",
      bulletClass: "flash_sales_bullet",
      bulletActiveClass: "flash_sales_bullet-active",
      clickable: true,
    },
    navigation: {
      prevEl: ".flash-btn-prev",
      nextEl: ".flash-btn-next",
    },
    breakpoints: {
      576: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
    modules: [Navigation, Pagination],
  };



  return (
    <div className="custom-container mx-auto border-bottom border-muted">
      <CustomHeader
        smallHeading="Today's"
        largeHeading="Flash Sales"
        navBtnClass="flash-btn"
        showNav={true}
        isLoaded={isLoaded}
      />
      <div className="product-container mt-4">
        {isLoaded ? (
          <Swiper {...swiperConfig} className="my-4 my-sm-5">
          {productData.flashData.map((item) => (
            <SwiperSlide key={item.id}>
              <Product
                id={item.id}
                img={item.img}
                offSale={item.sale}
                price={item.price}
                isNew={true}
                title={item.name}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        ):
        <SkeletonComponent count={4} showTiles={true} height={150}/>
        }
        <div className="d-flex d-sm-none flash_sales-custom-pagination justify-content-center my-3"></div>
      </div>

      <div className="d-flex justify-content-center my-5">
        <CustomButton text="View All Products" link="/products"/>
      </div>
    </div>
  );
};

export default memo(FlashSales);
