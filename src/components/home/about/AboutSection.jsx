import React from 'react'
import "./about_section.css"
import { AboutIcon1 } from '../../../assets/icons/icons'
const AboutSection = () => {
  return (
    <div className='custom-container about-sec-container mx-auto d-flex align-items-center mb-4 justify-content-center flex-column flex-sm-row'>
      <div className="about-item d-flex flex-column align-items-center">
      <div className="icon w-auto  bg-color-orange text-light rounded-circle">
        <AboutIcon1/>
        </div>
        <h5 className='mt-4 mb-0'>FAST Delivery</h5>
        <p className='text-center'>Lorem ipsum dolor sit amet.</p>
      </div>
  
      <div className="about-item d-flex flex-column align-items-center">
      <div className="icon w-auto bg-color-orange text-light rounded-circle">
        <AboutIcon1/>
        </div>
        <h5 className='mt-4 mb-0'>FAST Delivery</h5>
        <p className='text-center'>Lorem ipsum dolor sit amet.</p>
      </div>
  

      <div className="about-item d-flex flex-column align-items-center">
      <div className="icon w-auto  bg-color-orange text-light rounded-circle">
        <AboutIcon1/>
        </div>
        <h5 className='mt-4 mb-0'>FAST Delivery</h5>
        <p className='text-center'>Lorem ipsum dolor sit amet.</p>
      </div>
  
    </div>
  )
}

export default AboutSection
