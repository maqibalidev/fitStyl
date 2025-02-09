import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"; 
import { toast } from "react-toastify";

export const useFavorites = ( favProducts, addFavProduct, removeFavProduct) => {
  const authContext = useContext(AuthContext); 

  const FavoriteToggle = (id, title, img, price, rating,size=null) => {
    if (authContext?.data?.authToken) {
      const existFav = favProducts.find((product) => product.id === id);
      if (!existFav) {
        addFavProduct(id, title, img, price, rating,size);
      } else {
        removeFavProduct(id);
      }
    } else {
      toast.warn("Please Login first!");
    }
  };

  return { FavoriteToggle };
};
