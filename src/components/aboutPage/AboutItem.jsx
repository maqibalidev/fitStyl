import React from 'react';
import "./about_item.css";
import { AboutIcon1 } from '../../assets/icons/icons';

export const  AboutItem = ({ isBordered = false }) => {
  return (
    <div className={`about-page-item d-flex p-4 rounded-2 flex-column align-items-center justify-content-center ${isBordered ? "about-page-bordered-item" : ""}`}>
      <div className="icon w-auto bg-color-orange text-light rounded-circle">
        <AboutIcon1 />
      </div>
      <h3 className={`mt-4 mb-0 ${isBordered ? "fw-medium" : "h5"}`}>10.5k</h3>
      <p className="text-center mb-0">Lorem ipsum dolor sit amet.</p>
    </div>
  );
};


