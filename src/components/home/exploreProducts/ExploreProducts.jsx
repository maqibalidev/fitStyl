import React, { useContext} from 'react';
import "./explore_products.css";
import {CustomHeader,CustomButton,Product, favoriteContext, CartContext} from "../../includes/imports"

const ExploreProducts = ({data}) => {
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
    <div className='custom-container mx-auto'>
      <CustomHeader smallHeading="Our Products" largeHeading="Explore Our Products" />
      
      <div className='product-container row gx-0 gx-sm-4 gy-5 mt-0'>
        {data && data.length && data.map((item) => (
          <div key={item.id} className='col-12 col-sm-4 col-lg-3'>
         <Product
                    id={item.id}
                    img={item.images[0]}
                    price={item.final_price}
                    rating={item.rating}
                    title={item.name}
                    isNew={true}
                    exist={
                      !!favProducts.find((product) => product.id === item.id)
                    }
                    onAddToCart={handleAddToCart}
                    onToggleFavorite={handleFavoriteToggle}
             
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
