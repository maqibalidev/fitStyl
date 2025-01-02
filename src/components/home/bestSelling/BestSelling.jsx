import React from 'react';
import { productData } from '../../../assets/data';
import {CustomHeader,Product} from "../../includes/imports"
const BestSelling = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="This Month" largeHeading="Best Selling Products" showBtn={true} />
      <div className="product-container row gx-0 gx-sm-4 gy-2 gy-sm-5 mt-4 mt-sm-5">
        {productData.bestSellingData.map((item, index) => (
          <div className='col-12 col-sm-4 col-lg-3' key={index}>
            <Product 
              img={item.img} 
              offSale={item.sale} 
              price={item.price} 
              title={item.name} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};
export default BestSelling