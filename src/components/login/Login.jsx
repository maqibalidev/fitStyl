import React, { useContext, useState } from "react";
import { forgetPass, loginApi } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { forgetPassSchema, loginSchema } from "../../schema/schemas";
import { Link, useNavigate } from "react-router-dom";
import side_img from "../../assets/images/side_img.png"
import "./login.css"
import { AuthContext, Footer, Header, Loader } from "../includes/imports";
import SpinnerLoader from "../includes/SpinnerLoader";
// import { Modal } from "bootstrap";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  // Formik for login
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      loginApi(values)
        .then((res) => {
          authContext.dispatch({
            type: "LOGIN",
            payload: {
              user:res.user,
              authToken: res.token,
            },
          });
          toast.success("Login successful", {
            onClose: () => {
              setIsLoading(false);
              navigate("/");
            },
          });
        })
        .catch((error) => {
          setIsLoading(false);
          handleApiError(error);
        });
    },
  });

  // Formik for forget password
  const forgetPassFormik = useFormik({
    initialValues: { email: "" },
    validateOnChange: true,
    validateOnBlur: true,
    validationSchema: forgetPassSchema,
    onSubmit: ({ email }) => {
      forgetPass(email)
        .then((res) => {
          setIsLoading(false);
          toast.success("Check your Gmail for password recovery");
        })
        .catch((error) => {
          setIsLoading(false);
          handleApiError(error);
        });
      setIsLoading(true);
      // const modalElement = document.getElementById("exampleModal");
      // const modalInstance = Modal.getInstance(modalElement);
      // if (modalInstance) {
      //   modalInstance.hide();  // Hide modal on submit
      // }
      
    },
  });

  // Show Modal function (used to open the modal)
  // const showModal = () => {
  //   const modalElement = document.getElementById("exampleModal");
  //   const modalInstance = new Modal(modalElement);
  //   modalInstance.show();
  // };

  return (
    <div>
      <Header activePage="login"/>
      <div className="row vh-100 gx-0 position-relative">
        {isLoading && <Loader />}
        <div className="col-6 d-none d-sm-flex login-left vh-100 align-items-center">
          <img src={side_img} alt="" />
        </div>

        <div className="col-12 col-sm-6 d-flex justify-content-center">
          <form onSubmit={formik.handleSubmit} className="login-form d-flex flex-column form vh-100 align-items-center justify-content-center gap-3">
            <div className="w-100">
              <h2>Log in to FitStyl</h2>
              <span>Enter your details below</span>
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
                {formik.touched.email && formik.errors?.email || ""}
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
                {formik.touched.password && formik.errors?.password || ""}
              </span>
            </div>
            <div className="w-100 d-flex justify-content-between align-items-center mt-3 flex-column flex-md-row gap-2">
              <button type="submit" className="btn btn-warning bg-color-orange text-light login-form-button mb-2 mb-sm-0 px-5 py-2 rounded-1">Login</button>
              <button type="button" className="btn btn-transparent border-0 shadow-none color-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Forgot Password?</button>
            </div>
            <span className='mt-2 d-flex gap-3 text-secondary'>Don't have an account? <Link className='text-dark form-bottom-redirect-link position-relative' to="/signup">Signup</Link></span>
          </form>
        </div>
      </div>
      <Footer />
      {/* Modal for forget password */}
      <div className="modal fade forget-pass-model" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">RESET PASSWORD</h5>
              <button type="button" className="btn-close shadow-none" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={forgetPassFormik.handleSubmit} className="p-3">
              <p className="fw-medium">We will send you a reset password email.</p>
              <div className="mb-3">
                <div className="w-100 pb-3">
                  <input
                    name="email"
                    value={forgetPassFormik.values.email}
                    onChange={forgetPassFormik.handleChange}
                    onBlur={forgetPassFormik.handleBlur}
                    type="text"
                    className="form-control shadow-none border-bottom border-1 border-muted "
                    placeholder="Enter Your Email"
                  />
                  <span className="text-start text-danger">
                    {forgetPassFormik.touched.email && forgetPassFormik.errors?.email || ""}
                  </span>
                </div>
              </div>
              <button disabled={isLoading} type="submit" className="model-reset-password-btn btn bg-warning bg-color-orange text-light w-100 m-0">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
