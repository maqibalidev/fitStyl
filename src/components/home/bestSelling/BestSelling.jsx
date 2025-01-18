import React, { useContext, useEffect, useState } from "react";
import { productData } from "../../../assets/data";
import { CartContext, CustomHeader, favoriteContext, Product } from "../../includes/imports";
import { handleApiError } from "../../../helpers/errorHandler";
import { getFlashProducts } from "../../../services/userListingsApi";
const BestSelling = ({data}) => {

    const { products, addProduct } = useContext(CartContext);
    const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const handleAddToCart = (id) => {
    const exist = products.find((product) => product.id === id);
    if (!exist) {
      addProduct(id);
    }
  };

  const handleFavoriteToggle = (id, title, img, price, rating) => {
    const existFav = favProducts.find((product) => product.id === id);
    if (!existFav) {
      addFavProduct(id, title, img, price, rating);
    } else {
      removeFavProduct(id);
    }
  };

  return (
    <div className="custom-container mx-auto">
      <CustomHeader
        smallHeading="This Month"
        largeHeading="Best Selling Products"
        showBtn={true}
      />
      <div className="product-container row gx-0 gx-sm-4 gy-2 gy-sm-5 mt-4 mt-sm-5">
        {data && data.length >0 && data.map((item, index) => (
          <div className="col-12 col-sm-4 col-lg-3" key={index}>
            <Product
              id={item.id}
              img={item.images[0]}
              price={item.final_price}
              rating={item.rating}
              title={item.name}
              exist={
                !!favProducts.find((product) => product.id === item.id)
              }
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
