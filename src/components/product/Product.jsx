import React from "react";
import "./product.css";
import { EyeIcon, FavoriteIcon, RatingIcon } from "../../assets/icons/icons";
const Product = ({ offSale, title, price, img, isNew }) => {
  return (
    <div className="product-item position-relative">
      {offSale && <span className="sale z-1">-40%</span>}
      {isNew && !offSale && <span className="sale z-1 newLabel">New</span>}
      <span className="z-1 action-btns position-absolute top-0 d-flex flex-column gap-2">
        <button className=" rounded-circle border-0 d-flex align-items-center justify-content-center ">
          <FavoriteIcon />
        </button>
        <button className=" rounded-circle border-0 d-flex align-items-center justify-content-center ">
          <EyeIcon />
        </button>
      </span>
      <div className="item-top rounded-1 overflow-hidden  bg-color-lightgrey d-flex justify-content-center align-items-center position-relative">
        <img src={img} alt="" />
        <button className="position-absolute product-item-btn  w-100 p-2 border-0">
          Add To Cart
        </button>
      </div>
      <div className="item-body py-3">
        <span className="title d-block mb-1">HAVIT HV-G92 Gamepad</span>
        <span className="prices color-primary ">
          $120
          <span className="ms-2 text-decoration-line-through color-lightgrey">
            $160
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
