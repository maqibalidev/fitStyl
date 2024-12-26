import React from "react";
import "./product.css";
import { EyeIcon, FavoriteIcon, RatingIcon } from "../../assets/icons/icons";
const Product = ({ offSale, title, price, img, isNew }) => {
  const newPrice = price - (price * (offSale / 100));

  return (
    <div className="product-item position-relative w-100">
      {offSale > 0 && <span className="sale z-1 top-0 left-0 m-2 bg-color-orange color-light rounded-1 position-absolute">-{offSale}%</span>}
      {isNew && !offSale && <span className="sale color-light bg-color-green z-1 newLabel  top-0 color-light left-0 m-2 rounded-1 position-absolute">New</span>}
      <span className="z-1 action-btns end-0 m-2 position-absolute top-0 d-flex flex-column gap-2">
        <button className="bg-color-light rounded-circle border-0 d-flex align-items-center justify-content-center ">
          <FavoriteIcon />
        </button>
        <button className="bg-color-light rounded-circle border-0 d-flex align-items-center justify-content-center ">
          <EyeIcon />
        </button>
      </span>
      <div className="item-top p-4 rounded-1 overflow-hidden  bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
        <img className="object-fit-contain w-90" src={img} alt="" />
        <button className="text-light position-absolute product-item-btn  bg-color-dark-orange w-100 p-2 border-0">
          Add To Cart
        </button>
      </div>
      <div className="item-body py-3">
        <span className="title d-block mb-1 fw-medium">{title}</span>
        <span className="prices color-primary fw-medium">
          ${newPrice}
          <span className="ms-2 text-decoration-line-through color-lightgrey fw-medium">
            ${price}
          </span>
        </span>
        <div className="rating d-flex gap-2 align-items-center mt-1 d-">
          <RatingIcon color={"var(--primary-color)"} />
          <RatingIcon color={"var(--primary-color)"} />
          <RatingIcon color={"var(--primary-color)"} />
          <RatingIcon color={"var(--primary-color)"} />
          <RatingIcon color={"var(--light-grey-color)"} />
          <span className="color-lightgrey ms-2">(88)</span>
        </div>
      </div>
    </div>
  );
};

export default Product;
