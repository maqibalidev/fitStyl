import React from 'react'
import "./button.css"
const CustomButton = ({text,isGreen=false}) => {
  return (
    <button className={`custom-btn ${isGreen && "custom-btn-green"}  border-0 rounded-1 d-flex align-items-center`}>
      {text}
    </button>
  )
}

export default CustomButton
