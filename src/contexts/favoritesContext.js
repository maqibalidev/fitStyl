import { createContext, useReducer } from "react";
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_PRODUCT":
      const updatedCart = [...state,action.payload];
      localStorage.setItem("favoritesData", JSON.stringify(updatedCart));
      return updatedCart;

    case "REMOVE_PRODUCT":
      const filteredCart = state.filter(
        (product) => product.id !== action.payload.id
      );
      localStorage.setItem("favoritesData", JSON.stringify(filteredCart));
      return filteredCart;

    case "CLEAR_CART":
      console.log("clear cart is calling")
      localStorage.setItem("favoritesData", JSON.stringify([]));
      return [];

    default:
      return state;
  }
};
const INITIALS = JSON.parse(localStorage.getItem("favoritesData")) || [];

export const favoriteContext = createContext();
export const FavoriteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIALS
);


  const addFavProduct = (id,title,image,price,rating) =>
    dispatch({ type: "ADD_PRODUCT", payload: { id,title,image,price,rating} });
  const removeFavProduct = (id) =>
    dispatch({ type: "REMOVE_PRODUCT", payload: { id } });
  const clearFavorites = () => dispatch({ type: "CLEAR_CART" });
  return (
    <favoriteContext.Provider
      value={{
        favProducts: state,
        addFavProduct,
        removeFavProduct,
        clearFavorites,
      }}
    >
      {children}
    </favoriteContext.Provider>
  );
};
