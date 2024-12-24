import { createContext, useReducer } from "react";
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const updatedCart = [...state, action.payload.product];
      localStorage.setItem("cartData", JSON.stringify(updatedCart));
      return updatedCart;

    case "REMOVE_PRODUCT":
      const filteredCart = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("cartData", JSON.stringify(filteredCart));
      return filteredCart;

    case "UPDATE_PRODUCT":
      const updated = state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartData", JSON.stringify(updated));
      return updated;
    case "CLEAR_CART":
      console.log("clear cart is calling")
      localStorage.setItem("cartData", JSON.stringify([]));
      return [];

    default:
      return state;
  }
};
const INITIALS = JSON.parse(localStorage.getItem("cartData")) || [];

export const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIALS
);


  const addProduct = (product) =>
    dispatch({ type: "ADD_PRODUCT", payload: { product } });
  const removeProduct = (id) =>
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  const updateProduct = (id, quantity) =>
    dispatch({ type: "UPDATE_PRODUCT", payload: { id, quantity } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });
  return (
    <CartContext.Provider
      value={{
        products: state,
        addProduct,
        removeProduct,
        updateProduct,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
