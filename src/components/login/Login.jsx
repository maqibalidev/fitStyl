import React, { useContext, useState } from "react";
import { loginApi } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/schemas";
import { AuthContext } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import side_img from "../../assets/images/side_img.png"
import "./login.css"
import { Footer, Header,Loader } from "../includes/imports";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      loginApi(values)
        .then((data) => {
          authContext.dispatch({
            type: "LOGIN",
            payload: {
              name: data.user.username,
              email: data.user.email,
              id: data.user.id,
              authToken: data.token,
            },
          });
          toast.success("login success", {
            onClose: () => {
              setIsLoading(false);
              navigate("/");
            },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          handleApiError(error);         
        })
    },
  });
  return (
    <div>
      <Header/>
      {isLoading && <Loader />}
     <div className="row vh-100 gx-0 my-5">
      <div className="col-6 d-none d-sm-flex login-left vh-100 align-items-center">
        <img src={side_img} alt="" />
      </div>
      
      <div className="col-12 col-sm-6 d-flex justify-content-center">
       
        <form className="login-form d-flex flex-column form vh-100 align-items-center justify-content-center gap-4">
        <div className="w-100">
        <h2>Log in to FitStyl</h2>
        <span>Enter your details below</span>
        </div>
<input type="text" className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"   placeholder="Enter Your Email" />
<input type="text" className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0" placeholder="Password" />
        <div className="w-100 d-flex justify-content-between align-items-center mt-3 flex-column flex-md-row gap-3">
          <button className="btn btn-warning bg-color-orange text-light login-form-button mb-2 mb-sm-0 px-5 py-2 rounded-1">Login</button>
          <Link className="color-primary">Forget Password?</Link>
        </div>
        <span className='mt-2 d-flex gap-3 text-secondary'>Don't have an account? <Link className='text-dark form-bottom-redirect-link position-relative' to="/signup">Signup</Link></span>
        
        </form>
      </div>
     </div>
     <Footer/>
    </div>
  );
};

export default Login;
