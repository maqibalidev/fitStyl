import React, { createContext, useContext, useReducer, useEffect } from "react";
import {
  addCartItems,
  clearProductCart,
  getCartItems,
  removeCartItems,
  updateCartItems,
} from "../services/userListingsApi";
import { AuthContext } from "./AuthContext";
import { handleApiError } from "../helpers/errorHandler";
import { toast } from "react-toastify";

// Reducer for Cart State
const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_CART":
      // Ensure payload is directly an array of IDs
      return action.payload;

    case "ADD_PRODUCT":
      return [...state, action.payload.id];

    case "REMOVE_PRODUCT":
      return state.filter((productId) => productId !== action.payload.id);
  
    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
};

// Reducer for Loader State
const loaderReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_LOADER":
      return { isLoading: true };

    case "HIDE_LOADER":
      return { isLoading: false };

    default:
      return state;
  }
};


export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const { data } = useContext(AuthContext); 

  const [cartState, cartDispatch] = useReducer(cartReducer, []);
  const [loaderState, loaderDispatch] = useReducer(loaderReducer, {
    isLoading: false,
  });


  useEffect(() => {
    if (!data?.authToken) return;

    const fetchCart = async () => {
      loaderDispatch({ type: "SHOW_LOADER" }); // Show loader
      try {
        const res = await getCartItems(data.authToken);
        if (res?.data?.length) {
          // Extract only the `id` from each item
          const cartIds = res.data.map((item) => item.product_id);
          cartDispatch({ type: "SET_CART", payload: cartIds });
        }
      } catch (err) {
        console.error("Cart fetch error: ", err);
        handleApiError(err);
      } finally {
        loaderDispatch({ type: "HIDE_LOADER" }); // Hide loader
      }
    };

    fetchCart();
  }, [data?.authToken]);

  // Action Creators
  const addProduct = async (id, quantity,img_id=null,size) => {
    loaderDispatch({ type: "SHOW_LOADER" });
    try {
      await addCartItems({ product_id: id, quantity,img_id ,size}, data.authToken);
      cartDispatch({ type: "ADD_PRODUCT", payload: { id, quantity } });
      toast.success("Product added to cart!", { position: "top-center" });
    } catch (err) {
      console.error("Add product error: ", err);
      handleApiError(err);
    } finally {
      loaderDispatch({ type: "HIDE_LOADER" }); // Hide loader
    }
  };

  const removeProduct = async (id) => {
    loaderDispatch({ type: "SHOW_LOADER" }); // Show loader
    try {
      await removeCartItems({ product_id: id }, data.authToken);
      cartDispatch({ type: "REMOVE_PRODUCT", payload: { id } });
    } catch (err) {
      console.error("Remove product error: ", err);
      handleApiError(err);
    } finally {
      loaderDispatch({ type: "HIDE_LOADER" });
      return true;
    }
  };

  const updateProduct = async (product_id, quantity) => {
   const parsedQuantity = parseInt(quantity);
    loaderDispatch({ type: "SHOW_LOADER" }); 
    try {
      await updateCartItems({ product_id,quantity:parsedQuantity}, data.authToken);
      cartDispatch({ type: "UPDATE_PRODUCT", payload: { id:product_id, quantity } });
      toast.success("Product updated!", { position: "top-center" });
    } catch (err) {
      console.error("error updating product: ", err);
      handleApiError(err);
    } finally {
      loaderDispatch({ type: "HIDE_LOADER" });
      return true;
    }
  };


  const clearCart = async() => {
    try {
      await clearProductCart(data.authToken);
      cartDispatch({ type: "CLEAR_CART" });
    } catch (err) {
      console.error("error clearing cart: ", err);
      handleApiError(err);
    } finally {
      loaderDispatch({ type: "HIDE_LOADER" });
      return true;
    }
    
  };

  return (
    <CartContext.Provider
      value={{
        products: cartState,
        addProduct,
        removeProduct,
        clearCart,
        updateProduct,
        isLoading: loaderState.isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
