import React, { Suspense, lazy, useContext, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
// import logout from "./logout";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";
const HomePage = lazy(() => import("../components/home/Home"));
const Register = lazy(() => import("../components/register/Register"));
const Login = lazy(() => import("../components/login/Login"));
const NotFoundPage = lazy(() => import("../components/NotFoundPage"));

export const Root = () => {
  const location = useLocation();
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

//   useEffect(() => {
// const checkAuth=()=>{
//     const { authToken } = authContext?.data;
//    if (authToken) {
//    try {
//       // ////////////////// IF TOKEN FOUND ,CHECK FOR THE EXPIRY   ////////////////////
//     const token = jwtDecode(authToken);
//     if (Date.now() / 1000 < token.exp) {
//       if (location.pathname === "/login" || location.pathname === "/register") {
//         navigate("/");
//       }
//     } else {
//       // /////////////////// logout USER ON TOKEN EXPIRY  ///////////////////////////
//     authContext.dispatch({type:'LOGOUT'})
//     }
//    } catch (error) {
//     console.error("Invalid token: ", error);
//     authContext.dispatch({type:'LOGOUT'})
//    }}
//     // /////////////////// NAVIGATE TO INDEX ROUTE IF  authToken IS undefined  ///////////////////////////
//     else if (location.pathname !== "/login" && location.pathname !== "/register") {
//       navigate("/login");
//     }
// }
//    checkAuth();
//    // eslint-disable-next-line
//   }, [authContext?.data, navigate, location]);

  return (
    <Suspense
      fallback={
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="spinner-border text-success "></div>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
    </Suspense>
  );
};