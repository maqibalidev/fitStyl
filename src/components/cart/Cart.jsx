import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./cart.css";
import {
  AuthContext,
  CartContext,
  CartItem,
  favoriteContext,
  Footer,
  Header,
  Loader,
} from "../includes/imports";
import { getCartItems } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import SkeletonComponent from "../skeleton/Skeleton";
import Swal from "sweetalert2";

const Cart = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const cartContext = useContext(CartContext);
  const [clearCartLoading,setClearCartLoading] = useState(false);
  const favContext = useContext(favoriteContext);
  const { favProducts } = useContext(favoriteContext);

  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
 if(authContext?.data?.authToken){
  getCartItems(authContext?.data?.authToken)
  .then((res) => {
    setLoading(false);
    setProducts(res.data);

    // Calculate the total price of items in the cart
    const total = res.data.reduce((sum, product) => sum + ((product.final_price || 0)* product.quantity), 0);
    setTotalPrice(total);
  })
  .catch((err) => {
    setLoading(false);
    handleApiError(err);
  });
 }
  }, [authContext?.data?.authToken,cartContext.products]); 


const handleClearCart = ()=>{

  Swal.fire({
    title: "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Clear it!"
  }).then((result) => {
    if (result.isConfirmed) {
      setClearCartLoading(true);
      cartContext.clearCart().then(()=>{
        setClearCartLoading(false)
      });
      setTotalPrice(0);
    }
  });


}

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <Header activePage="cart" />
      {clearCartLoading && <Loader/>}
      <div className="cart-container custom-container mx-auto my-5">
        
        <div>
          {products && products.length > 0 && (
            <button
              onClick={handleClearCart}
              className="px-3 py-2 bg-color-orange border-0 w-auto float-end rounded-1 text-light"
            >
              Clear Cart
            </button>
          )}
        </div>

        <div className="text-muted mb-5">
          <Link to="/">Home</Link> / <span className="text-dark fw-medium">Cart</span>
        </div>

        <div className="row gx-0 gx-sm-3">
          {loading ? (
            <SkeletonComponent count={4} showTiles={true} height={150} />
          ) : (
            <>
              {products && products.length > 0 ? (
                products.map((item, key) => (
                  <CartItem
                    key={key}
                    data={item}
                    availability_status={item.availability_status}
                    cartContext={cartContext}
                    existFavorites={!!favProducts.find((product) => product.id === item.product_id)}
                    favContext={favContext}
                  />
                ))
              ) : (
                <h2 className="p-5 text-center">CART IS EMPTY</h2>
              )}
            </>
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
              <span className="fw-medium">Subtotal:</span> <span>${totalPrice}</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Delivery:</span> <span>$175</span>
            </div>
            <div className="d-flex justify-content-between py-2 border-bottom border-1 border-muted">
              <span className="fw-medium">Total:</span> <span>${totalPrice + 175}</span>
            </div>
            <button
            onClick={()=>navigate("/place_order")}
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
        ) : (
          <>
            {products && products.length > 0 && (
              <div className="text-center">
                Total price of available items will appear here.
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Cart;
