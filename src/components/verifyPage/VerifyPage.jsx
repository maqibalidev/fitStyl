import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyApi } from '../../services/userListingsApi';
import { toast } from 'react-toastify';
import { handleApiError } from '../../helpers/errorHandler';
import { AuthContext, HappyEmoji } from '../includes/imports';
import {SadEmoji} from "../includes/imports"
const VerifyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading,setIsLoading] = useState(true);
    const [isSuccess,setIsSuccess] = useState(false);;
    useEffect(()=>{

  const verifyToken = location.search.split("=")[1];
        if (!verifyToken) {
          
          console.log("Token is missing",{onclose:()=>{
            navigate("/")
          }})
        
        }
        setIsSuccess(true)
      verifyApi({token:verifyToken}).then((res)=>{
toast.success("Account verified successfully!",{onclose:()=>{
navigate("/")
  }})

      }).catch((error)=>{
        setIsSuccess(false)
handleApiError(error)
      }).finally(()=>{
        setIsLoading(false);

      })

    },[])
  return (
    <div className='vh-100 d-flex flex-column align-items-center justify-content-center'>
       {isSuccess ? <HappyEmoji/> :<SadEmoji/>}
      {loading ? <h5>We are processing your request Please wait!</h5>:
      <h5>{isSuccess ? "Account Verified!":"Something went wrong! please try again."}</h5>
      }
    </div>
  )
}

export default VerifyPage
