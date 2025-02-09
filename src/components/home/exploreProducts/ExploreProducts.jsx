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

   const handleAddToCart = (id,img_id,size) => {
    return AddToCart(id,1,img_id,size);
    
      };

  const handleFavoriteToggle = (id, title, img, price, rating,size) => {
    FavoriteToggle(id, title, img, price, rating,size)
  
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
                    size={item.size.split(",")[0]}
                    isNew={true}
                    exist={
                      !!favProducts.find((product) => product.id === item.id)
                    }
                    existInCart = {!!products.find((product)=>product === item.id)}
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
