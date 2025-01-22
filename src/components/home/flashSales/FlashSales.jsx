import React, { memo, useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { CustomHeader, CustomButton, Product, AuthContext } from "../../includes/imports";
import SkeletonComponent from "../../skeleton/Skeleton";
import { CartContext, favoriteContext } from "../../includes/imports"; // Ensure context imports
import "swiper/css";
import "swiper/css/pagination";
import { toast } from "react-toastify";
import { useAddCart } from "../../../hooks/useAddCart";
import { useFavorites } from "../../../hooks/useAddFav";
import { CONSTANTS } from "../../../constants/constansts";

const FlashSales = ({ data }) => {
  const { products, addProduct } = useContext(CartContext);
  const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const { AddToCart } = useAddCart(products, addProduct); 
  const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 
  const [loadingState,setLoadingState] = useState(false)

useEffect(()=>{
  setLoadingState(false)
},[products])


  const handleAddToCart = (id) => {
return AddToCart(id);

  };

  const handleFavoriteToggle = (id, title, img, price, rating) => {
    FavoriteToggle(id, title, img, price, rating)
  
  };

  const swiperConfig = {
    spaceBetween: 20,
    slidesPerView: 1,
    pagination: {
      el: ".flash_sales-custom-pagination",
      bulletClass: "flash_sales_bullet",
      bulletActiveClass: "flash_sales_bullet-active",
      clickable: true,
    },
    navigation: {
      prevEl: ".flash-btn-prev",
      nextEl: ".flash-btn-next",
    },
    breakpoints: {
      576: { slidesPerView: 3 },
      992: { slidesPerView: 4 },
    },
    modules: [Navigation, Pagination],
  };

  return (
    <div className="custom-container mx-auto border-bottom border-muted">
      <CustomHeader
        smallHeading="Today's"
        largeHeading="Flash Sales"
        navBtnClass="flash-btn"
        showNav={true}
        isLoaded={data && data.length > 0}
      />
      <div className="product-container mt-4">
        {data && data.length > 0 ? (
          <Swiper {...swiperConfig} className="my-4 my-sm-5">
            {data.map((item) => (
              <SwiperSlide key={item.id}>
                <Product
                  id={item.id}
                  img={item.images[0]}
                  offSale={item.off_sale}
                  price={item.final_price}
                  rating={item.rating}
                  title={item.name}
                  loadingState={loadingState}
                  exist={
                    !!favProducts.find((product) => product.id === item.id)
                  }
                  existInCart = {!!products.find((product)=>product === item.id)}
                  
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleFavoriteToggle}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <SkeletonComponent count={4} showTiles={true} height={150} />
        )}
        {data && data.length > 0 && (
          <div className="d-flex d-sm-none flash_sales-custom-pagination justify-content-center my-3"></div>
        )}
      </div>

      <div className="d-flex justify-content-center my-5">
        <CustomButton text="View All Products" link={`/products/flash_sales`} />
      </div>
    </div>
  );
};

export default memo(FlashSales);
