import React, { useContext, useEffect, useState } from "react";
import "./account_page.css";
import { AuthContext, Footer, Header, Loader } from "../includes/imports";
import {
  getUser,
  updateUser,
  verifyUser,
} from "../../services/userListingsApi";
import { handleApiError } from "../../helpers/errorHandler";
import { useFormik } from "formik";
import { accountSchema } from "../../schema/schemas";
import { toast } from "react-toastify";
const AccountPage = () => {
  const [loading, setLoading] = useState(false);
  const { data } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    currentPass: "",
    password: "",
    confirmPass: "",
    verified: 0,
  });
  useEffect(() => {
    getUser(data.authToken)
      .then((res) => {
        formik.setValues({
          username: res.user?.username || "",
          email: res.user?.email || "",
          address: res.user?.address || "",
        });

        setValues({
          username: res.user?.username || "",
          email: res.user?.email || "",
          address: res.user?.address || "",
          currentPass: "",
          password: "",
          confirmPass: "",
          verified: res.user?.is_verified || 0,
        });
      })
      .catch((error) => {
        handleApiError(error);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      address: "",
      currentPass: "",
      password: "",
      confirmPass: "",
    },
    validationSchema: accountSchema,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: async ({
      username,
      address,
      currentPass,
      password,
      confirmPass,
    }) => {
      setLoading(true);
   matchValues !== true ? updateUser(
    {
      username,
      address,
      currentPassword: currentPass!=="" ? currentPass : null,
      newPassword: password !== "" ? password : null,
      confirmPass: confirmPass !== "" ? confirmPass : null
    },
    data.authToken
  )
    .then((res) => {
      toast.success("account updated successfully");
    })
    .catch((error) => {
      handleApiError(error);
      setLoading(false);
    })
    .finally(() => {
      setLoading(false);
    }) 
    : setLoading(false)
    },
  });

  const matchValues = ()=>{
    if(formik.values.username == values.username && formik.values.address==values.address){
      return true
    }
    return false;
    }
    

  const handleVerifyClick = () => {
    console.log("abc");
    setLoading(true);
    verifyUser({ email: formik.values.email },data.authToken)
      .then((res) => {
        setLoading(false);
        toast.success("Please check your email for Account verification");
      })
      .catch((error) => {
        setLoading(false);
        handleApiError(error);
      });
  };

  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <Header activePage="account" />

      <div className="position-relative">
        {loading && <Loader />}
        <div className="custom-container mx-auto p-5 my-5 ">
          <form
            onSubmit={formik.handleSubmit}
            className="form d-flex flex-column gap-2"
          >
            <h5 className="fw-medium color-primary">Edit Your Profile</h5>
            <div className="row ">
              <div className="col-12 col-sm-6">
                <div>
                  <span>Username</span>
                  <input
                    name="username"
                    placeholder="Username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="form-control bg-color-lightgrey shadow-none"
                    type="text"
                  />
                </div>
                {formik.touched.username && formik.errors.username && (
                  <span className="text-danger">{formik.errors.username}</span>
                )}
              </div>
              <div className="col-12 col-sm-6">
                <div>
                  <span>
                    Email{" "}
                    {!values.verified ? (
                      <span className="text-danger">(Not Verified)</span>
                    ) : (
                      <span className="color-green">(Verified)</span>
                    )}
                  </span>
                  <div className="d-flex">
                    <input
                      disabled
                      name="email"
                      placeholder="Email"
                      className={`form-control bg-color-lightgrey shadow-none  ${
                        !values.verified && "rounded-end-0"
                      }`}
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      type="text"
                    />

                    {!values.verified && (
                      <div
                        onClick={() => handleVerifyClick()}
                        role="button"
                        className="bg-color-orange d-flex justify-content-center align-items-center px-3 text-light rounded-0 border-0"
                      >
                        Verify
                      </div>
                    )}
                  </div>
                  {formik.touched.email && formik.errors.email && (
                    <span className="text-danger d-block">
                      {formik.errors.email}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div>
              <div className="mb-2">
                <span className="lh-1">Address</span>
                <input
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Your Address"
                  className="form-control bg-color-lightgrey shadow-none"
                  type="text"
                />
              </div>
              {formik.touched.address && formik.errors.address && (
                <span className="text-danger">{formik.errors.address}</span>
              )}

              <div className="mb-3">
                <span className="lh-1">Password Changes</span>
                <input
                  value={formik.values.currentPass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="currentPass"
                  className="form-control bg-color-lightgrey shadow-none  "
                  placeholder="Current Password"
                  type="text"
                />
                {formik.touched.currentPass && formik.errors.currentPass && (
                  <span className="text-danger">
                    {formik.errors.currentPass}
                  </span>
                )}
              </div>

              <div className="mb-3">
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="password"
                  className="form-control bg-color-lightgrey shadow-none  "
                  placeholder="New Password"
                  type="text"
                />
                {formik.touched.password && formik.errors.password && (
                  <span className="text-danger">{formik.errors.password}</span>
                )}
              </div>
              <div className="mb-3">
                <input
                  value={formik.values.confirmPass}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="confirmPass"
                  className="form-control bg-color-lightgrey shadow-none"
                  placeholder="Confirm Password"
                  type="text"
                />
                {formik.touched.confirmPass && formik.errors.confirmPass && (
                  <span className="text-danger">
                    {formik.errors.confirmPass}
                  </span>
                )}
              </div>
            </div>
            <div className="d-flex gap-3 justify-content-end">
              <button
                onClick={() => formik.setValues(values)}
                type="reset"
                className="bg-transparent p-0 border-0 rounded-2"
              >
                Cancel
              </button>
              <button className="bg-color-orange text-light px-4 p-2 border-0 rounded-2">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AccountPage;
