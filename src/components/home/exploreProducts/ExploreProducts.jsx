import React, { useContext, useEffect, useState} from 'react';
import "./explore_products.css";
import {CustomHeader,CustomButton,Product, favoriteContext, CartContext} from "../../includes/imports"
import { useAddCart } from '../../../hooks/useAddCart';
import { useFavorites } from '../../../hooks/useAddFav';

const ExploreProducts = ({data}) => {
    const { products, addProduct } = useContext(CartContext);
    const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const [loadingState,setLoadingState] = useState(false)

useEffect(()=>{
  setLoadingState(false)
},[products])


  const { AddToCart} = useAddCart(products, addProduct); 
  
   const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 
   const handleAddToCart = (id) => {
     AddToCart(id);
   };
 
   const handleFavoriteToggle = (id, title, img, price, rating) => {
     FavoriteToggle(id, title, img, price, rating)
   };

  return (
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="Our Products" largeHeading="Explore Our Products"  />
      
      <div className='product-container row gx-0 gx-sm-4 gy-5 mt-0'>
        {data && data.length > 0 && data.map((item) => (
          <div key={item.id} className='col-12 col-sm-4 col-lg-3'>
         <Product
                    id={item.id}
                    img={item.images[0]}
                    price={item.final_price}
                    rating={item.rating}
                    offSale={item.off_sale}
                    title={item.name}
                    loadingState={loadingState}
                    isNew={true}
                    exist={
                      !!favProducts.find((product) => product.id === item.id)
                    }
                    existInCart = {!!products.find((product)=>product.id === item.id)}
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleFavoriteToggle}
             
                  />
          </div>
        ))}
      </div>
              
      <div className='d-flex justify-content-center mt-5'>
        <CustomButton text="View All Products"  link="/products?cat=all" />
      </div>
    </div>
  );
};

export default ExploreProducts;
