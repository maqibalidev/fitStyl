import React, { memo } from "react";
import "./custom_header.css";
import { CustomButton ,ArrowLEFT, ArrowRight} from "../includes/imports";

const CustomHeaderComponent = ({ smallHeading, largeHeading, navBtnClass, showNav = false, showBtn = false ,isLoaded=false,link= "#"}) => {
  return (
    <div className="custom-header w-100">
      <h6 className="heading position-relative color-primary">{smallHeading}</h6>
      <div className="header-body d-flex justify-content-between align-items-center flex-wrap">
        <h3 className="large-heading mb-2 flex-grow-1">{largeHeading}</h3>

        {showNav && isLoaded && (
          <div className="nav-btns d-flex gap-2 gap-sm-3 flex-grow-1 justify-content-end">
            <div
              className={`prev-btn p-2 ${navBtnClass}-prev rounded-circle d-flex align-items-center justify-content-center`}
            >
              <ArrowLEFT />
            </div>
            <div
              className={`next-btn p-2 ${navBtnClass}-next rounded-circle d-flex align-items-center justify-content-center`}
            >
              <ArrowRight />
            </div>
          </div>
        )}

        {showBtn && (
          <div className="d-flex justify-content-end flex-grow-1">
            <CustomButton text="View All" link={link}/>
          </div>
        )}
      </div>
    </div>
  );
};

export const CustomHeader = memo(CustomHeaderComponent);
