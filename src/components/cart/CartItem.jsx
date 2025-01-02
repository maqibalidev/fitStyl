import React, { useState, memo } from "react";
import { AddIcon, EyeIcon, FavoriteIcon, SubtractIcon } from "../includes/imports";
import Swal from "sweetalert2";
import "../product/product.css";
export const CartItem = memo(({ data, availability_status = 0, cartContext,favContext }) => {
  const [quantity, setQuantity] = useState(data?.quantity || 1);

  const existFav = favContext.favProducts.find((product) => product === data.id);
  const handleChange = (quantity) => {
    cartContext.updateProduct(data.id, quantity);
  };
  const handleFavClick = ()=>{
    if (!existFav) {
      favContext.addFavProduct(data.id);
    }
    else{
      favContext.removeFavProduct(data.id)
    }
  }
  const handleDelete = () => {
    if (availability_status > 0 && availability_status !== 3 && availability_status !== 2) {
      Swal.fire({
        title: "Are You Sure You want to Remove?",
        icon: "warning",
        text: "Removing this product will revert the availability checking process!",
        showCancelButton: true,
        confirmButtonText: "Yes, Remove it!",
        cancelButtonText: "Cancel",
        draggable: true,
        customClass: {
          confirmButton: "my-confirm-button",
          cancelButton: "my-cancel-button",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          cartContext.removeProduct(data.id);
        }
      });
    } else {
      cartContext.removeProduct(data.id);
    }
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

  const handleAvailabilityClick = () => {
    if (availability_status === 0) {
      Swal.fire({
        title: "Thank you for your interest!",
        icon: "success",
        text: "We'll notify you via email about the availability, availability status will be updated here.",
        draggable: true,
        customClass: {
          confirmButton: "my-confirm-button",
        },
      });
    }
  };

  return (
    <div className="product-item position-relative col-12 col-sm-4 col-lg-3">
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
    <button onClick={handleFavClick} className={`bg-color-light ${existFav && "product-fav-icon-active "} bg-color-light rounded-circle border-0 mx-3 d-flex align-items-center justify-content-center`}>
           <FavoriteIcon />
         </button>
        <button className="bg-color-light rounded-circle border-0 mx-3 d-flex align-items-center justify-content-center ">
          <EyeIcon />
        </button>
      </span>
      <div className="item-top p-4 rounded-1 overflow-hidden  bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
        <img className="object-fit-contain w-90" src={data?.img || ""} alt="" />

        <button
          onClick={handleDelete}
          className="text-light position-absolute product-item-btn  bg-danger w-100 p-2 border-0"
        >
          Remove From Cart
        </button>
      </div>
      <div className="item-body py-3">
        <span className="title d-block mb-1 fw-medium">{data?.name || ""}</span>
        <span className="prices color-primary fw-medium d-flex justify-content-between align-items-center">
          ${data?.price || 0}
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
            {quantity * data?.price || 0}
          </span>
        </div>
        {availability_status === 0 && (
          <button
            onClick={handleAvailabilityClick}
            className="btn btn-success rounded-1 bg-color-green border-0 w-100 mt-3"
          >
            Check Availability
          </button>
        )}
      </div>
    </div>
  );
});

