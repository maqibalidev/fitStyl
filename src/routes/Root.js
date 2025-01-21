import React, { Suspense, lazy, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import logout from "./logout";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
import Home from "../components/home/Home";
import { About,Cart,Contact,Loader } from "../components/includes/imports";
import VerifyPage from "../components/verifyPage/VerifyPage";


const HomePage = lazy(() => import("../components/home/Home"));
const Register = lazy(() => import("../components/register/Register"));
const Login = lazy(() => import("../components/login/Login"));
const Favorites = lazy(() => import("../components/favorites/Favorites"));
const Products = lazy(() => import("../components/products/Products"));
const ResetPass = lazy(() => import("../components/login/ResetPass"));
const ProductDetails = lazy(() => import("../components/productDetails/ProductDetails"));
const AccountPage = lazy(() => import("../components/accountPage/AccountPage"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage"));

export const Root = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

   useEffect(() => {

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  //   const checkAuth = () => {
  //     const { authToken } = authContext?.data;
  //     if (authToken) {
  //       try {
  //         // ////////////////// IF TOKEN FOUND ,CHECK FOR THE EXPIRY   ////////////////////
  //         const token = jwtDecode(authToken);
  //         if (Date.now() / 1000 < token.exp) {
  //           if (
  //             location.pathname === "/login" ||
  //             location.pathname === "/register"
  //           ) {
  //             navigate("/");
  //           }
  //         } else {
  //           // /////////////////// logout USER ON TOKEN EXPIRY  ///////////////////////////
  //           authContext.dispatch({ type: "LOGOUT" });
  //         }
  //       } catch (error) {
  //         console.error("Invalid token: ", error);
  //         authContext.dispatch({ type: "LOGOUT" });
  //       }
  //     }
  //     // /////////////////// NAVIGATE TO INDEX ROUTE IF  authToken IS undefined  ///////////////////////////
  //     else if (
  //       location.pathname !== "/login" &&
  //       location.pathname !== "/register"
  //     ) {
  //       navigate("/login");
  //     }
  //   };
  //   checkAuth();
  //   // eslint-disable-next-line
   }, [authContext?.data, navigate, location]);

  return (
    <Suspense
      fallback={
       <Loader/>
      }
      >
      <Routes>   
       <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route path="/products/:parameters?" element={<Products/>} />
        <Route path="/product?" element={<ProductDetails/>} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/account" element={<AccountPage/>} />
        <Route path="/reset-password?" element={<ResetPass/>} />
        <Route path="/verify?" element={<VerifyPage/>} />
        <Route path="*" element={<NotFoundPage />} />  
      </Routes>
    </Suspense>
  );
};
