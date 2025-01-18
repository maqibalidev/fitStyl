import React, { useContext, useState } from "react";
import "../login/login.css";
import side_img from "../../assets/images/side_img.png";
import { Link, useNavigate } from "react-router-dom";
import {
  Footer,
  Header,
  Loader,
  GoogleIcon,
  registerSchema,
  AuthContext,
} from "../includes/imports";
import { useFormik } from "formik";
import { registerApi, registerWithGoogleApi } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import { signInWithGoogle } from "../../firebase/authService";
import SpinnerLoader from "../includes/SpinnerLoader";
const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
const authContext = useContext(AuthContext);
const navigate = useNavigate();
  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", confirm_password: "" },
    validationSchema: registerSchema,
    validateOnBlur:true,
    validateOnChange:true,
    onSubmit: async ({name,email,password,confirm_password}) => {
      setIsLoading(true)
      registerApi({username:name,email,password,confirmPass:confirm_password})
      .then((res)=>{
setIsLoading(false);
toast.success(res.data.message, {
  onClose: () => {
  navigate("/login")
  },
});

      }).catch((error)=>{
        setIsLoading(false)
        handleApiError(error);

      })
      
    },
  });



  const handleGoogleSignup = async () => {
    setIsGoogleLoading(true)
    try {
      // 1. Sign in with Google and get user details
      const { accessToken, displayName, email } = await signInWithGoogle(); // Extract accessToken

      const res = await registerWithGoogleApi({ token: accessToken, name: displayName });



      authContext.dispatch({
        type: "LOGIN",
        payload: {
          user:res.data.user,
          authToken: res.data.token,
        },
      });
      toast.info(res.data.message, {

        onClose: () => navigate("/"),
      });
    } catch (error) {
      handleApiError(error);
    } finally {
      setIsLoading(false);
      setIsGoogleLoading(false)
    }
  };
  


  return (
    <>
      <Header activePage="signup" />

    <div className="row gx-0 position-relative">
      {isLoading && <Loader />}
        <div className="col-6 d-none d-sm-flex login-left vh-100 align-items-center">
          <img src={side_img} alt="" />
        </div>

        <div className="col-12 col-sm-6 d-flex justify-content-center">
       
          <form onSubmit={formik.handleSubmit} className="login-form d-flex flex-column form  align-items-center justify-content-center gap-3">
           
            <div className="w-100">
              <h2>Create an account</h2>
              <span>Enter your details below</span>
            </div>
        
         <div className="w-100">
         <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"
              placeholder="Enter Username"
            />
            <span className="text-start text-danger">
              {formik.touched.name && formik.errors?.name || "" }
            </span>
         </div>
           <div className="w-100">
           <input
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
              className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"
              placeholder="Enter Your Email"
            />
             <span className="text-start text-danger">
              {formik.touched.email && formik.errors?.email || "" }
            </span>
           </div>
           <div className="w-100">
            <input
              name="password"
              type="text"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"
              placeholder="Password"
            />
               <span className="text-start text-danger">
              {formik.touched.password && formik.errors?.password || "" }
            </span>
           </div>
           <div className="w-100">
            <input
              name="confirm_password"
              type="text"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"
              placeholder="Confirm Password"
            />
               <span className="text-start text-danger">
              {formik.touched.confirm_password && formik.errors?.confirm_password || "" }
            </span>
           </div>
            <div className="w-100 d-flex justify-content-between align-items-center mt-3 flex-column gap-3">
              <button type="submit" className="btn btn-warning w-100 bg-color-orange text-light login-form-button mb-2 mb-sm-0 py-2 rounded-1">
                SignUp
              </button>
              <button disabled={isGoogleLoading}  onClick={handleGoogleSignup} className="btn btn-transparent w-100 border-secondary text-dark login-form-button mb-2 mb-sm-0 py-2 rounded-1 d-flex gap-2 align-items-center justify-content-center">
               { !isGoogleLoading ?<>
                <GoogleIcon />
                Signup with Google
                </>:
             <SpinnerLoader/>}
              </button>
              <span className="mt-2 d-flex gap-3 text-secondary text-nowrap">
                Already have and account?
                <Link
                  className="text-dark form-bottom-redirect-link position-relative"
                  to="/login"
                >
                  Login
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Register;
