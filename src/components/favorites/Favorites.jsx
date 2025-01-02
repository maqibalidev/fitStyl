import React, { useContext, useEffect, useState } from 'react'
import { favoriteContext, Footer, Header, Product } from '../includes/imports'
import { productData } from '../../assets/data';
import { Link } from 'react-router-dom';

const Favorites = () => {
      const { favProducts,clearFavorites} = useContext(favoriteContext);
const [products,setProducts] = useState([]);
        useEffect(() => {
          if (favProducts && productData.flashData) {
            const matchedProducts = productData.flashData
              .map((item) => {
                const cartProduct = favProducts.find(
                  (cartProduct) => cartProduct === item.id
                );
                if (cartProduct) {
                  return item
                }
                return null;
              })
              .filter((product) => product !== null); 
      
            setProducts(matchedProducts);
      
          }
        }, [favProducts]);
  return (
    <div className='d-flex flex-column justify-content-between vh-100'>
      <Header/>
<div className='custom-container mx-auto py-0 py-sm-5 row gx-0 gx-sm-4 gy-5 mt-0'>
 {
    favProducts && favProducts.length > 0 &&   <div>
    <button onClick={()=>clearFavorites()} className='px-3 py-2 bg-color-orange border-0 w-auto float-end rounded-1 text-light'>Clear Favorites</button>
    </div>
 }
{favProducts && favProducts.length ? products.map((item,index)=>(
    <div key={item.id} className='col-12 col-sm-4 col-lg-3'>
    <Product id={item.id} title={item.title} price={item.price} img={item.img} isFavProduct={true} />
    </div>
)):
<>
<h2 className='text-center'>
    Favorites is empty
</h2>
<div className="d-flex justify-content-center my-5">
          <Link
            to="/"
            className="btn btn-transparent border rounded-2 col-12 col-sm-5 p-3 border-1 border-dark my-2"
          >
            Return To Shop
          </Link>
        </div>
</>


}
</div>
      <Footer/>
    </div>
  )
}

export default Favorites
