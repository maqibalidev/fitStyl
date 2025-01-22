import React, { useState, memo, useContext, useEffect } from "react";
import { AddIcon, AuthContext, EyeIcon, favoriteContext, FavoriteIcon, Loader, SubtractIcon } from "../includes/imports";
import Swal from "sweetalert2";
import "../product/product.css";
import { useFavorites } from "../../hooks/useAddFav";
import { removeCartItems } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import SpinnerLoader from "../includes/SpinnerLoader";
import { Link } from "react-router-dom";
export const CartItem = memo(({ data, availability_status = 0, cartContext,existFavorites }) => {
  const [quantity, setQuantity] = useState(parseInt(data?.quantity) || 1);
const [loading,setLoading] = useState(false)
 
 const authContext = useContext(AuthContext);
  const { favProducts, addFavProduct, removeFavProduct } =useContext(favoriteContext);
  const { FavoriteToggle } = useFavorites(favProducts,addFavProduct, removeFavProduct); 
  const handleChange = (quantity) => {
    cartContext.updateProduct(data.id, quantity);
  };

 const handleFavClick = ()=>{
if(data ){
  FavoriteToggle(data.product_id, data.name, data.img_url, data.final_price, data.rating)
}
 } 


  const handleDelete = () => {
    setLoading(true)
 removeCartItems({product_id:data.product_id},authContext.data.authToken).then((res)=>{
  cartContext.removeProduct(data.product_id);
  setLoading(false)
 }).catch((err)=>{
  setLoading(false)
  handleApiError(err)
 })

  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
    handleChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      handleChange(quantity - 1);
    }
  };

  // useEffect(()=>{
  //   setLoading(false)
  //  },[cartContext])
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
        <span className="prices color-primary fw-medium d-flex justify-content-between align-items-center">
          ${data?.final_price || 0}
        </span>

        <div className={`quantity-sec d-flex my-2 ${availability_status === 3 && "d-none"}`}>
          <div className="d-flex gap-1">
            <button
              className="bg-color-dark-light-grey border-0 rounded-1 lh-0 p-2 text-dark"
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <AddIcon />
            </button>
            <input
              className="form-control shadow-none text-center"
              value={quantity}
              type="number"
              min={1}
              aria-label="Quantity"
            />
            <button
              className="bg-color-dark-light-grey border-0 rounded-1 lh-0 p-2 text-dark"
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <SubtractIcon />
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

