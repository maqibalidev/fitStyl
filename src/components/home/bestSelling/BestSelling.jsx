import React from 'react'
import CustomHeader from '../../customHeader/CustomHeader'
import Product from '../../product/Product'
import { productData } from '../../../assets/data'
const BestSelling = () => {
  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="This Month" largeHeading="Best Selling Products" showBtn={true}/>
      <div className="product-container row gx-0 gx-sm-4 gy-2 gy-sm-5 mt-4 mt-sm-5 ">
        {productData.bestSellingData.map((item,key)=>(
       <div className='col-12 col-sm-4 col-lg-3 ' key={key}><Product key={key} img={item.img} offSale={item.sale} price={item.price} title={item.name}/>
</div>
        ))}
        </div>
    </div>
   
  )
}

export default BestSelling
