import React, { useState } from 'react';
import {CustomHeader} from "../includes/imports"
import './products.css';
import { productData } from '../../assets/data';
import { Footer, Header,Product} from '../includes/imports';
const Products = () => {
  const [selectedValue, setSelectedValue] = useState("Women's Collection");

  const handleSelectChange = (value) => {
    setSelectedValue(value);
  };



  return (
    <div className="vh-100 d-flex flex-column justify-content-between">
      <Header />

      <div className="custom-container mx-auto">
      <div className="text-muted mt-5">
          Home / <span className="text-dark fw-medium">Products</span>
        </div>
     <div className=' d-flex justify-content-between align-items-center'>
     <CustomHeader smallHeading="Category" largeHeading={selectedValue} />

<div className=" text-center body d-flex  gap-3">
  
<select name='cat-filter' onChange={(e)=>{handleSelectChange(e.target.value)}} class="form-select shadow-none form-select-md" aria-label=".form-select-lg example">
<option selected disabled >Filter Category</option>
<option  value="Women Collection">Women's Collection</option>
<option value="Men's Collection">Men's Collection</option>
<option value="Jackets">Jackets</option>
</select>
<select  class="form-select shadow-none form-select-md" aria-label=".form-select-lg example">
<option selected disabled >Filter Price</option>
<option  value="low-to-high">Low To High</option>
<option value="high-to-low">Hight To Low</option>
</select>
</div>
     </div>




        <div className="row my-4">

{productData.flashData.map((item,key)=>(
  <div className='col-12 col-sm-4 col-lg-3'>
  <Product key={key} title={item.name} img={item.img} price={item.price} />
  </div>
))}

</div>

        
      </div>

      


      <Footer />
    </div>
  );
};

export default Products;
