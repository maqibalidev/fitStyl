import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { addCartItems } from "../services/userListingsApi";
import { handleApiError } from "../helpers/errorHandler";
import { toast } from "react-toastify";

export const useAddCart = (products, addProduct) => {
  const authContext = useContext(AuthContext);

  const AddToCart = (id, quantity = 1) => {
    if (authContext?.data?.authToken) {
      const exist = products.find((product) => product.id === id);
      if (!exist) {
        return addCartItems({ product_id: id, quantity }, authContext.data.authToken)
          .then((res) => {
            addProduct(id);
            toast.success("Product is added to the cart!", { position: "top-center" });
          })
          .catch((err) => {
            console.error(err);
            handleApiError(err);
            throw err; 
          });
      }
    } else {
      toast.warn("Please Login first!");
      return Promise.reject("User not logged in"); // Return a rejected promise if not logged in
    }
  };

  return { AddToCart };
};
