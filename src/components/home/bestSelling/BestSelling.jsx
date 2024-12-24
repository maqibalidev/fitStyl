import React from 'react'
import CustomHeader from '../../customHeader/CustomHeader'
import Product from '../../product/Product'
import demo1 from "../../../assets/images/demo1.png"
const BestSelling = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="This Month" largeHeading="Best Selling Products" showBtn={true}/>
      <div className="product-container d-flex gap-4 mt-5">
        <Product img={demo1}/>
        <Product img={demo1}/>
        <Product img={demo1}/>
        <Product img={demo1}/>
        </div>
    </div>
   
  )
}

export default BestSelling
