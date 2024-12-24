import React from 'react';
import "./explore_products.css";
import CustomHeader from '../../customHeader/CustomHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import Product from '../../product/Product';
import demo1 from "../../../assets/images/demo1.png"
import { Navigation } from 'swiper/modules';
import CustomButton from '../../customButton/CustomButton';
const ExploreProducts = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="Our Products" largeHeading="Explore Our Products"/>
      
 <div className='product-container row gx-4 gy-5'>
{
  [...Array(8)].map((item,key)=>(

    <div className='col-3'><Product key={key} img={demo1} isNew={true}/>
</div>
  ))
}
 </div>
             
              
<div className='d-flex justify-content-center mt-5'>
<CustomButton text="View All Products"/>   
  </div>     
      
    </div>
  )
}

export default ExploreProducts
