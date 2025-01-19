import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "swiper/css";
import "swiper/css/pagination";
import { Root } from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/cartContext";
import { FavoriteProvider } from "./contexts/favoritesContext";
import "./App.css";
import "./assets/css/responsive.css";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./Test";
import { SocketProvider } from "./contexts/socketContext";
import React from "react";
import ErrorBoundary from "./components/includes/ErrorBoundary";
function App() {
  const router = createBrowserRouter([{ path: "*", element: <Root /> }]);
  return (
    <AuthProvider>
     
        <FavoriteProvider>
          <CartProvider>
            <ToastContainer autoClose={2000} toastClassName="toast-class" />
            <SkeletonTheme baseColor="#d2d2d2" highlightColor="#e5e5e5">
            <SocketProvider>
            <React.Suspense fallback={<ErrorBoundary />}>
            <RouterProvider router={router} />
          </React.Suspense>
              </SocketProvider>
            </SkeletonTheme>
          </CartProvider>
        </FavoriteProvider>
     
    </AuthProvider>
  );
}

export default App;
