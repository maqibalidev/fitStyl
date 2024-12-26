import React, { useContext, useState } from "react";
import { loginApi } from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/schemas";
import Loader from "../includes/Loader";
import CustomInput from "./CustomInput";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

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
      {isLoading && <Loader />}
      <form
        onSubmit={formik.handleSubmit}
        className="form vh-100 w-50 mx-auto d-flex flex-column align-items-center justify-content-center"
      >
        <CustomInput
          name="email"
          placeholder="Enter Email"
          value={formik.values.email}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          handleTouched={formik.touched.email}
          handleErrors={formik.errors.email}
        />
        <CustomInput
          name="password"
          placeholder="Enter Password"
          value={formik.values.password}
          handleChange={formik.handleChange}
          handleBlur={formik.handleBlur}
          handleTouched={formik.touched.password}
          handleErrors={formik.errors.password}
        />
        <button type="submit" className="btn btn-danger w-100">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
