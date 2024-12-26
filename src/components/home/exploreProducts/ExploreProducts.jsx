import React from 'react';
import "./explore_products.css";
import CustomHeader from '../../customHeader/CustomHeader';
import Product from '../../product/Product';
import CustomButton from '../../customButton/CustomButton';
import { productData } from '../../../assets/data';
const ExploreProducts = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="Our Products" largeHeading="Explore Our Products"/>
      
 <div className='product-container row gx-0 gx-sm-4 gy-5'>
{
  productData.exploreProductsData.map((item,key)=>(

    <div key={key} className='col-12 col-sm-4 col-lg-3'>
                    <Product key={key} img={item.img} offSale={item.sale} price={item.price} isNew={true} title={item.name}/>

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
