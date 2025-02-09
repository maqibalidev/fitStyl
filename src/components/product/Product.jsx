import React, { memo, useContext, useEffect, useState } from "react";
import "./product.css";
import {
  EyeIcon,
  FavoriteIcon,
  RatingIcon,
  Image,
  CancelIcon,
  CartIcon,
  CartContext,
} from "../includes/imports";
import { Link, useNavigate } from "react-router-dom";
import SpinnerLoader from "../includes/SpinnerLoader";
import { toast } from "react-toastify";

export const Product = memo(
  ({
    id,
    offSale,
    title,
    price,
    img,
    rating,
    isNew,
    exist=false,
    isFavProduct = false,
    existInCart= false,
    onAddToCart,
    size=null,
    onToggleFavorite,

  }) => {
    const navigate = useNavigate();
    const originalPrice = price / (1 - offSale / 100);
    const ratingStar = Math.ceil(rating / 20);
    const remainingRatingStar = 5 - ratingStar;
const [loading,setLoading] = useState(false);
const {products,isLoading} = useContext(CartContext);
const [existCart ,setExistCart] = useState(false);

useEffect(()=>{
  setLoading(false)
},[existCart])


useEffect(() => {
  const exists = products.some((item) => item === id);
  console.log(products)
  setExistCart(exists); 
  console.log("Product exists in cart:", exists);
}, [products, id]); // Dependency array includes `products` and `id`



const handleCartIconClick = async (e) => {
  e.stopPropagation();

  if (existCart) {
    navigate("/cart");
  } else {
    try {
      setLoading(true);
      await onAddToCart(id,img.id,size); 
     
    } catch (error) {
      setLoading(false); // Hide the spinner regardless of success or failure
      console.error("Failed to add to cart:", error);
    }
  }
};




const handleProductClick = (e)=>{
  e.stopPropagation();
  navigate(`/product?id=${id}`)
}

const handleFavoriteClick = (e)=>{
  e.stopPropagation();
  onToggleFavorite(id,title,img,price,rating,size)
}


    return (
      <div onClick={(e)=>handleProductClick(e)}  className="product-item position-relative w-100">
           <div className="position-relative">
        {offSale > 0 && (
          <span className="sale z-1 top-0 left-0 m-2 bg-color-orange color-light rounded-1 position-absolute">
            -{offSale}%
          </span>
        )}
        {isNew && !offSale && (
          <span className="sale color-light bg-color-green z-1 newLabel top-0 left-0 m-2 rounded-1 position-absolute">
            New
          </span>
        )}
       <span className="z-1 action-btns end-0 m-2 position-absolute top-0 d-flex flex-column gap-2">
       {
        !isFavProduct ?  <button onClick={(e)=>handleFavoriteClick(e)} className={`bg-color-light ${exist && "product-fav-icon-active "} product-fav-icon rounded-circle border-0 d-flex align-items-center justify-content-center`}>
        <FavoriteIcon />
      </button>

      :
      <button onClick={(e)=>handleFavoriteClick(e)} className={`bg-color-light  fav-remove-icon rounded-circle border-0 d-flex align-items-center justify-content-center`}>
      <CancelIcon />
    </button>
       }
        <button
        disabled={loading}
        onClick={(e)=>handleCartIconClick(e)}
          className={`bg-color-light  rounded-circle border-0 d-flex align-items-center justify-content-center ${existCart && "product-fav-icon-active "}`}
        >
         {
          loading ? <div className="cart-spinner"> </div> :  <CartIcon />
         }
         
        </button>
      </span>
        <div className="item-top p-2 rounded-1 overflow-hidden bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
          <Image url={img?.img_url || img} />
          {/* {existInCart ?
          <button
          onClick={()=>navigate("/cart")}
          className="text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
        >
          View In Cart
        </button>:
        <button
        onClick={handleAddToCart}
        className="text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
      >
        Add To Cart
      </button>} */}
        </div>
        <div className="item-body py-3">
          <span className="title d-block mb-1 fw-medium">{title}</span>
          <span className="prices color-primary fw-medium">
          Rs.{price.toFixed(2)}
            {offSale && (
              <span className="ms-2 text-decoration-line-through color-lightgrey fw-medium">
                Rs.{originalPrice.toFixed(2)}
              </span>
            )}
          </span>
          <div className="rating d-flex gap-2 align-items-center mt-1">
            {[...Array(ratingStar)].map((_, index) => (
              <RatingIcon key={index} color={"var(--primary-color)"} />
            ))}
            {ratingStar < 5 &&
              [...Array(remainingRatingStar)].map((_, index) => (
                <RatingIcon key={index} color={"var(--light-grey-color)"} />
              ))}
            <span className="color-lightgrey ms-2">({rating})</span>
          </div>
        </div>
      </div>
      </div>
    );
  }
);
