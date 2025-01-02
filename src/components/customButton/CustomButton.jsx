import React from 'react'
import "./button.css"
import { Link } from 'react-router-dom'
export const CustomButton = ({text,isGreen=false,link="/"}) => {
  return (
    <Link to={link} className={`custom-btn ${isGreen && "custom-btn-green"}  border-0 rounded-1 d-flex align-items-center`}>
      {text}
    </Link>
  )
}

