import React, { useContext, useEffect, useState } from "react";
import { productData } from "../../../assets/data";
import { AuthContext, CartContext, CustomHeader, favoriteContext, Product } from "../../includes/imports";
import { handleApiError } from "../../../helpers/errorHandler";
import { getFlashProducts } from "../../../services/userListingsApi";
import { toast } from "react-toastify";
import { useFavorites } from "../../../hooks/useAddFav";
import { useAddCart } from "../../../hooks/useAddCart";
const BestSelling = ({data}) => {

    const { products, addProduct } = useContext(CartContext);
    const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const [loadingState,setLoadingState] = useState(false)

useEffect(()=>{
  setLoadingState(false)
},[products])


 const { AddToCart } = useAddCart(products, addProduct); 
  const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 


  const handleAddToCart = (id,img_id,size) => {
    return AddToCart(id,1,img_id,size);  
      };

      const handleFavoriteToggle = (id, title, img, price, rating,size) => {
        FavoriteToggle(id, title, img, price, rating,size)
      
      };

  

  return (
    <div className="custom-container mx-auto">
      <CustomHeader
        smallHeading="This Month"
        largeHeading="Best Selling Products"
        showBtn={true}
        link="/products/best_selling"
      />
      <div className="product-container row gx-0 gx-sm-4 gy-2 gy-sm-5 mt-4 mt-sm-5">
        {data && data.length >0 && data.map((item, index) => (
          <div className="col-12 col-sm-4 col-lg-3" key={index}>
            <Product
              id={item.id}
              img={item.images[0]}
              price={item.final_price}
              rating={item.rating}
              loadingState={loadingState}
              size={item.size.split(",")[0]}
              offSale={item.off_sale}
              title={item.name}
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
    </div>
  );
};
export default BestSelling;
