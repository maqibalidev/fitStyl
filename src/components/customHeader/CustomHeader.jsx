import React from 'react'
import "./custom_header.css"
import { ArrowLEFT, ArrowRight } from '../../assets/icons/icons'
import CustomButton from '../customButton/CustomButton'
const CustomHeader = ({smallHeading,largeHeading,navBtnClass,showNav=false,showBtn=false}) => {
  return (
     <div className="custom-header">
            <h6 className="heading position-relative color-primary">{smallHeading}</h6>
            <div className="header-body d-flex justify-content-between">
              <h3>{largeHeading}</h3>
             {
              showNav && (
                <div className="nav-btns d-flex gap-3">
                <div className={`prev-btn p-2 ${navBtnClass}-prev rounded-circle d-flex align-items-center justify-content-center`}>
                  <ArrowLEFT />
                </div>
                <div className={`next-btn p-2 ${navBtnClass}-next rounded-circle d-flex align-items-center justify-content-center`}>
                  <ArrowRight />
                </div>
              </div>
              )
             }

             {
              showBtn && (
                <CustomButton text="View All"/>
              )
             }

            </div>
          </div>
    
  )
}

export default CustomHeader
