import React, { useMemo } from 'react';
import "./explore_products.css";
import {CustomHeader,CustomButton,Product} from "../../includes/imports"
import { productData } from '../../../assets/data';

const ExploreProducts = () => {

  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="Our Products" largeHeading="Explore Our Products" />
      
      <div className='product-container row gx-0 gx-sm-4 gy-5 mt-0'>
        {productData.exploreProductsData.map((item) => (
          <div key={item.id} className='col-12 col-sm-4 col-lg-3'>
            <Product
              img={item.img}
              offSale={item.sale}
              price={item.price}
              isNew={item.isNew} 
              title={item.name}
            />
          </div>
        ))}
      </div>
              
      <div className='d-flex justify-content-center mt-5'>
        <CustomButton text="View All Products" />
      </div>
    </div>
  );
};

export default ExploreProducts;
