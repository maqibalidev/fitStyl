import React from 'react'
import CustomHeader from '../../customHeader/CustomHeader'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { CartIcon, CategoryIcon1 } from '../../../assets/icons/icons'
import "./category_section.css"
const CategorySection = () => {
  return (
    <div className='custom-container mx-auto pb-2 border border-bottom-1 border-muted border-top-0 border-start-0 border-end-0'>
      <CustomHeader smallHeading="This Month" largeHeading="Browse By Category" navBtnClass="category-sec" showNav={true}/>


      <Swiper
          spaceBetween={20}
          slidesPerView={6}
          modules={[Navigation]}
          className='my-5 '
          navigation={{
            prevEl: ".category-sec-prev",
            nextEl: ".category-sec-next",
          }}
        >
          {[...Array(10)].map((item, key) => (
            <SwiperSlide>
              <div className='category-item p-4 d-flex flex-column align-items-center justify-content-center gap-3 rounded-3'>
                <CategoryIcon1/>
                <span className='title'>Phones</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
    </div>
  )
}

export default CategorySection
