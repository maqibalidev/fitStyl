import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const useAddCart = (products, addProduct) => {
  const authContext = useContext(AuthContext);

  const AddToCart = (id, quantity = 1,img_id=null,size=null) => {
    if (authContext?.data?.authToken) {
    
      if (products.length < 9) {
        const exist = products.find((product) => product.id === id);
        if (!exist) {
          addProduct(id,quantity,img_id,size);
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
