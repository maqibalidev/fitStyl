import React, { useState, memo, useContext, useEffect } from "react";
import { AddIcon, CartContext, EyeIcon, favoriteContext, FavoriteIcon, SubtractIcon } from "../includes/imports";
import "../product/product.css";
import "./cart.css"
import { useFavorites } from "../../hooks/useAddFav";
import SpinnerLoader from "../includes/SpinnerLoader";
import { Link } from "react-router-dom";
export const CartItem = memo(({ data, availability_status = 0,existFavorites }) => {
  const [quantity, setQuantity] = useState(parseInt(data?.quantity) || 1);
const [loading,setLoading] = useState(false)
const {products,updateProduct,removeProduct} = useContext(CartContext);
  const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 
const [updateProductLoading,setUpdateProductLoading] = useState(false);
  const handleChange = (quantity) => {
    setUpdateProductLoading(true);
    setQuantity(quantity)
  updateProduct(data?.product_id, quantity).then(()=>{
    setUpdateProductLoading(false)
  })

  };

 const handleFavClick = ()=>{
if(data ){
  FavoriteToggle(data.product_id, data.name, {img_url:data.img_url}, data.final_price, data.rating)
}
 } 


  const handleDelete = () => {

    
    setLoading(true)
 removeProduct(data.product_id).then(()=>{
  setLoading(false)
 });

  };

  const handleIncrement = () => {
  if(quantity < 11){
    setQuantity((prev) => prev + 1);
    handleChange(quantity + 1);
  }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      handleChange(quantity - 1);
    }
  };

  return (
    <div className="product-item position-relative col-12 col-sm-4 col-lg-3 ">
     
   <div className="position-relative">
 {loading &&   <div  className="cart-item-loader position-absolute top-0 left-0  w-100 h-100 pb-5 d-flex align-items-center justify-content-center">
     <div className="relative w-100 h-100 d-flex align-items-center justify-content-center pb-5">
     <SpinnerLoader/>
     </div>
      </div>}
   {availability_status !== 0 && (
        <span
          className={`sale z-1 top-0 left-0 m-2 
            ${availability_status === 1 && "bg-secondary"}
            ${availability_status === 2 && "bg-color-green"}
            ${availability_status === 3 && "bg-danger"} 
            color-light rounded-1 position-absolute`}
        >
          {availability_status === 1 && "...Pending"}
          {availability_status === 2 && "Available"}
          {availability_status === 3 && "Not Available"}
        </span>
      )}
      <span className="z-1 action-btns end-0 m-2 position-absolute top-0 d-flex flex-column gap-2">
    <button onClick={handleFavClick} className={`bg-color-light ${existFavorites && "product-fav-icon-active "} bg-color-light rounded-circle border-0 mx-1 d-flex align-items-center justify-content-center`}>
           <FavoriteIcon />
         </button>
        <Link to={`/product?id=${data.product_id}`} className="bg-color-light rounded-circle border-0 mx-1 d-flex align-items-center justify-content-center ">
          <EyeIcon />
        </Link>
      </span>
      <div>
      <div className="item-top p-4  rounded-1 overflow-hidden  bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
   
        <img className="object-fit-contain w-90" src={data?.img_url || ""} alt="" />

        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-light position-absolute product-item-btn  bg-danger w-100 p-2 border-0"
        >
          Remove From Cart
        </button>
      </div>
      </div>
      <div className="item-body py-3 ">
  
        <span className="title d-block mb-1 fw-medium">{data?.name || ""}</span>
       <div className="d-flex justify-content-between">
       <span className="prices color-primary fw-medium d-flex justify-content-between align-items-center">
          ${data?.final_price || 0}
        </span>
        <div className="d-flex gap-4 align-items-center px-3">
        <div className="cart-item-color rounded-circle" style={{"--cart-item-color":data?.color}}></div>
          <span>{data?.size || ""}</span>

        </div>
       </div>

        <div className={`quantity-sec d-flex my-2 ${availability_status === 3 && "d-none"}`}>
          <div className="d-flex gap-1">
            <button
              className=" product-details-btn   rounded-1"
              onClick={handleDecrement}
              aria-label="Increase quantity"
              disabled={updateProductLoading}
            >
              <SubtractIcon />
            </button>
            <input
              className="form-control shadow-none  text-center"
              value={quantity}
              readOnly
              type="number"
              min={1}
              max={data?.max_items || 10}
              aria-label="Quantity"
            />
            <button
              className=" product-details-btn   rounded-1 "
              onClick={handleIncrement}
              aria-label="Decrease quantity"
              disabled={updateProductLoading}
            >
              <AddIcon />
            </button>
          </div>
          <span className="prices color-primary fw-medium d-flex justify-content-between align-items-center gap-2">
            <span className="fw-medium text-dark ps-2 ">Subtotal:</span>$
            {quantity * data?.final_price || 0}
          </span>
        </div>
       
      </div>


   </div>
    </div>
  );
});

