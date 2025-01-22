import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addCartItems } from "../services/userListingsApi";
import { handleApiError } from "../helpers/errorHandler";
import { toast } from "react-toastify";

export const useAddCart = (products, addProduct) => {
  const authContext = useContext(AuthContext);

  const AddToCart = (id, quantity = 1) => {
    if (authContext?.data?.authToken) {
    
      if (products.length < 9) {
        const exist = products.find((product) => product.id === id);
        if (!exist) {
          addProduct(id);
        }
      } else {
        toast.info("Cart is full!",{position:"top-center"});
        return Promise.reject("Cart is full");
      }
    } else {
      toast.warn("Please Login first!",{position:"top-center"});
      return Promise.reject("User not logged in");
    }
  };

  return { AddToCart };
};
