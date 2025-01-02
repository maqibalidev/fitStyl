import React, { memo, useContext } from "react";
import "./product.css"; 
import { EyeIcon, FavoriteIcon, RatingIcon,Image,CartContext, favoriteContext, CancelIcon } from "../includes/imports";
import { Link } from "react-router-dom";

export const Product = memo(({ id, offSale, title, price, img, isNew,isFavProduct=false }) => {
  const { products, addProduct } = useContext(CartContext);
  const { favProducts,addFavProduct,removeFavProduct} = useContext(favoriteContext);
  // Check if the product exists in the cart
  const exist = products.find((product) => product.id === id);
  const existFav = favProducts.find((product) => product === id);
  // Calculate the new price
  const newPrice = price - (price * offSale) / 100;

  const handleClick = () => {
    if (!exist) {
      addProduct(id);
    }
  };
const handleFavClick = ()=>{
  if (!existFav) {
    addFavProduct(id);
  }
  else{
    removeFavProduct(id)
  }
}
  return (
    <div className="product-item position-relative w-100">
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
        !isFavProduct ?  <button onClick={handleFavClick} className={`bg-color-light ${existFav && "product-fav-icon-active "} rounded-circle border-0 d-flex align-items-center justify-content-center`}>
        <FavoriteIcon />
      </button>

      :
      <button onClick={()=>removeFavProduct(id)} className={`bg-color-light fav-remove-icon rounded-circle border-0 d-flex align-items-center justify-content-center`}>
      <CancelIcon />
    </button>
       }
        <Link
          to={`/product?id=${id}`}
          className="bg-color-light  rounded-circle border-0 d-flex align-items-center justify-content-center"
        >
          <EyeIcon />
        </Link>
      </span>
      <div className="item-top p-4 rounded-1 overflow-hidden bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
     <Image url={img}/>
        {/* <img className="object-fit-contain w-90" src={img} alt={title} /> */}
        {exist ? (
          <Link
            to="/cart"
            className="text-center text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
          >
            View In Cart
          </Link>
        ) : (
          <button
            onClick={handleClick}
            className="text-light position-absolute product-item-btn bg-color-dark-orange w-100 p-2 border-0"
          >
            Add To Cart
          </button>
        )}
      </div>
      <div className="item-body py-3">
        <span className="title d-block mb-1 fw-medium">{title}</span>
        <span className="prices color-primary fw-medium">
          ${newPrice.toFixed(2)}
          <span className="ms-2 text-decoration-line-through color-lightgrey fw-medium">
            ${price.toFixed(2)}
          </span>
        </span>
        <div className="rating d-flex gap-2 align-items-center mt-1">
          {[...Array(5)].map((_, index) => (
            <RatingIcon
              key={index}
              color={index < 4 ? "var(--primary-color)" : "var(--light-grey-color)"}
            />
          ))}
          <span className="color-lightgrey ms-2">(88)</span>
        </div>
      </div>
    </div>
  );
});


