import React, { useState } from 'react'
import "../login/login.css"
import side_img from "../../assets/images/side_img.png"
import { Link } from 'react-router-dom'
import { Footer, Header,Loader ,GoogleIcon} from '../includes/imports'
const Register = () => {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Header/>
    {isLoading && <Loader />}
   <div className="row gx-0 my-5">
    <div className="col-6 d-none d-sm-flex login-left vh-100 align-items-center">
      <img src={side_img} alt="" />
    </div>
    
    <div className="col-12 col-sm-6 d-flex justify-content-center">
     
      <form className="login-form d-flex flex-column form  align-items-center justify-content-center gap-4">
      <div className="w-100">
      <h2>Create an account</h2>
      <span>Enter your details below</span>
      </div>
      <input type="text" className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"   placeholder="Name" />

<input type="text" className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0"   placeholder="Enter Your Email" />
<input type="text" className="form-control shadow-none border-bottom border-1 border-secondary px-0 border-start-0 rounded-0 border-end-0 border-top-0" placeholder="Password" />
      <div className="w-100 d-flex justify-content-between align-items-center mt-3 flex-column gap-3">
        <button className="btn btn-warning w-100 bg-color-orange text-light login-form-button mb-2 mb-sm-0 py-2 rounded-1">Login</button>
        <button className="btn btn-transparent w-100 border-secondary text-dark login-form-button mb-2 mb-sm-0 py-2 rounded-1 d-flex gap-2 align-items-center justify-content-center"><GoogleIcon/>Signup with Google</button>
<span className='mt-2 d-flex gap-3 text-secondary'>Already have and account? <Link className='text-dark form-bottom-redirect-link position-relative' to="/login">Login</Link></span>
      </div>
      </form>
    </div>
   </div>
   <Footer/>
  </div>
  )
}

export default Register
