import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { productData } from "../../assets/data";
import "./cart.css";
import {
  CartContext,
  CartItem,
  favoriteContext,
  Footer,
  Header,
} from "../includes/imports";

const Cart = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [products, setProducts] = useState([]);
  const cartContext = useContext(CartContext);
  const favContext = useContext(favoriteContext);
  useEffect(() => {
    if (cartContext.products && productData.flashData) {
      const matchedProducts = productData.flashData
        .map((item) => {
          const cartProduct = cartContext.products.find(
            (cartProduct) => cartProduct.id === item.id
          );
          if (cartProduct) {
            return {
              ...item,
              quantity: cartProduct.quantity,
            };
          }
          return null;
        })
        .filter((product) => product !== null);

      setProducts(matchedProducts);

      // Calculate total price immediately after matching products
      const total = matchedProducts.reduce((prev, curr) => {
        // Only add available items
        if (curr.availability_status === 2) {
          return prev + curr.price * curr.quantity;
        }
        return prev;
      }, 0);

      setTotalPrice(total);
    }
  }, [cartContext.products]);

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <Header  activePage="cart"/>
      <div className="cart-container custom-container mx-auto my-5">

      <div>
          {products && products.length > 0 && (
            <button
              onClick={() => cartContext.clearCart()}
              className="px-3 py-2 bg-color-orange border-0 w-auto float-end rounded-1 text-light"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="text-muted mb-5">
          Home / <span className="text-dark fw-medium">Cart</span>
        </div>

        

        <div className="row gx-0 gx-sm-3">
          {products && products.length > 0 ? (
            products.map((item, key) => (
              <CartItem
                key={key}
                data={item}
                availability_status={item.availability_status}
                cartContext={cartContext}
                favContext={favContext}
              />
            ))
          ) : (
            <h2 className="p-5 text-center">
              CART IS EMPTY
            </h2>
          )}
        </div>

        <div className="d-flex justify-content-center my-5">
          <Link
            to="/"
            className="btn btn-transparent border rounded-2 col-12 col-sm-5 p-3 border-1 border-dark my-2"
          >
            Return To Shop
          </Link>
        </div>

        {totalPrice > 0 ? (
          <div className="total-container p-4 rounded-2 border mt-5 col-12 col-sm-5 border-1 border-dark float-end">
            <h5>Cart Total</h5>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Subtotal:</span>{" "}
              <span>${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Delivery:</span> <span>$175</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Total:</span>{" "}
              <span>${totalPrice + 175}</span>
            </div>
            <button
              disabled={totalPrice <= 0}
              className={`w-100 mt-4 ${
                totalPrice > 0
                  ? "bg-color-orange text-light"
                  : "bg-color-lightgrey text-dark"
              } p-2 border-0 rounded-1`}
            >
              Proceed to Checkout
            </button>
          </div>
        ) : 
        <>
          {
           products && products.length > 0 &&   <div className="text-center">
           Total price of available items will appear here.
         </div> 
        }</>
      
      }
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
