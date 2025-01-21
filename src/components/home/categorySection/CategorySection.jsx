import React, { useEffect, useMemo, useState } from 'react';
import {CustomHeader,CategoryIcon1, Image} from "../../includes/imports"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "./category_section.css";
import SkeletonComponent from '../../skeleton/Skeleton';
import { getCategories } from '../../../services/userListingsApi';
import { handleApiError } from '../../../helpers/errorHandler';
import { Link } from 'react-router-dom';

const CategoryItem = React.memo(({ title,icon }) => {
  
  return (
    <div className='category-item w-100 p-4 d-flex flex-column align-items-center justify-content-center  rounded-3'>
     <div className='w-75 h-75 align-items-center d-flex justify-content-center'> <Image url={icon}/></div>
      <span className='title fw-medium color-dark text-center'>{title}</span>
      
    </div>
  );
});



const CategorySection = ({data}) => {


  return (
    <div className='custom-container mx-auto pb-2 border border-bottom-1 border-muted border-top-0 border-start-0 border-end-0'>
      <CustomHeader smallHeading="This Month" largeHeading="Browse By Category" navBtnClass="category-sec" showNav={true} />
 {
  data && data.length > 0 ? <Swiper
  spaceBetween={20}
  slidesPerView={2}
  pagination={{
    el: ".custom-pagination",
    bulletClass: "my-bullet",
    bulletActiveClass: "my-bullet-active",
    clickable: true,
  }}
  modules={[Navigation, Pagination]}
  breakpoints={{
    480: { slidesPerView: 3 },
    576: { slidesPerView: 4 },
    992: { slidesPerView: 6 },
  }}
  className='my-4 my-sm-5'
  navigation={{
    prevEl: ".category-sec-prev",
    nextEl: ".category-sec-next",
  }}
>
  {data.map((category, index) => (
    <SwiperSlide key={index}>
      <Link to={`/products?cat=${category.id}`}>
      <CategoryItem title={category.name} icon={category.icon_url} />
      </Link>
    </SwiperSlide>
  ))}
</Swiper>
:
<SkeletonComponent count={6} height={120}/>
 }
      <div className="d-flex d-sm-none custom-pagination justify-content-center my-3"></div>
    </div>
  );
};

export default CategorySection;
