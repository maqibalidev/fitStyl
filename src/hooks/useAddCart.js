import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const useAddCart = (products, addProduct) => {
  const authContext = useContext(AuthContext); 

  const AddToCart = (id) => {
    if (authContext?.data?.authToken) {
      const exist = products.find((product) => product.id === id);
      if (!exist) {
        addProduct(id); 
      }
    } else {
      toast.warn("Please Login first!"); 
    }
  };

  return { AddToCart };
};
