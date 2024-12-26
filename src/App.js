import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "swiper/css";
import "swiper/css/pagination";

import { Root } from "./routes/Root";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/cartContext";
import "./App.css";
import "./assets/css/responsive.css"
function App() {
  const router = createBrowserRouter([{ path: "*", element: <Root /> }]);
  return (
    <AuthProvider>
      <CartProvider>
        <ToastContainer autoClose={2000} toastClassName="toast-class" />
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
