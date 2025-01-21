import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { addCartItems } from "../services/userListingsApi";
import { handleApiError } from "../helpers/errorHandler";

export const useAddCart = (products, addProduct) => {
    const authContext = useContext(AuthContext); 

  const AddToCart = (id,quantity) => {
    if (authContext?.data?.authToken) {
      const exist = products.find((product) => product.id === id);
      if (!exist) {
       
     addCartItems({product_id:id,quantity},authContext.data.authToken).then((res)=>{
        addProduct(id); 
       toast.success("Product is added in to the cart!",{position:"top-center"})

       }).catch((err)=>{
        console.log(err)
        handleApiError(err)

       });
      }
    } else {
      toast.warn("Please Login first!");

    }
  };

  return { AddToCart };
};
