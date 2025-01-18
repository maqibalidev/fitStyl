import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { resetPassSchema } from '../../schema/schemas';
import { resetPass } from '../../services/userListingsApi';
import { toast } from 'react-toastify';
import { handleApiError } from '../../helpers/errorHandler';
import { Loader } from '../includes/Loader';

const ResetPass = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
      initialValues: { password: "", confirm_password: "" },
      validationSchema: resetPassSchema,
      validateOnBlur: true,
      validateOnChange: true,
      onSubmit: async ({ password, confirm_password }) => {
        setIsLoading(true);
  
        // Extract resetToken from query params
        const resetToken = location.search.split("=")[1];
        if (!resetToken) {
          setIsLoading(false);
          console.log("Token is missing")
          return toast.error("Link expired!");
        }
  
        resetPass({ resetToken,password, confirm_password })
          .then((res) => {
            setIsLoading(false);
            toast.success(res.message, {
              onClose: () => {
                navigate("/login");
              },
            });
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error)
            handleApiError(error); // Display error in a user-friendly way
          });
      },
    });
    

  return (
    <div className='position-relative vh-100 d-flex justify-content-center align-items-center'>
            {isLoading && <Loader />}
     
      <form onSubmit={formik.handleSubmit} className='form d-flex flex-column gap-3 shadow-sm p-5'>
      <h4 className='color-primary'>RESET PASSWORD</h4>
      <div className="w-100">
            <input
              name="password"
              type="text"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"
              placeholder="New Password"
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
           <button className='py-2 border-0 bg-color-orange text-light' type='submit'>RESET PASSWORD</button>
      </form>
    </div>
  )
}

export default ResetPass
