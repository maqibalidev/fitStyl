import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const NewArrivalItem = memo(({ img, showImageRight = false, desc, isBottomItem = false }) => {
  return (
    <div className={`new-arrival-item h-100 rounded-1 position-relative bg-color-black`}>
      {isBottomItem && <div className="round-gradient position-absolute top-0 left-0 w-100 h-100"></div>}
      
      <img
        src={img}
        alt="New Arrival"
        className={`h-100 ${showImageRight ? 'image-right' : 'w-100'} item-img object-fit-contain position-absolute top-0 left-0 px-4 pt-4`}
        loading="lazy"
     />

      <div className={`new-arrival-bottom position-absolute bottom-0 left-0 d-flex flex-column gap-2 ${isBottomItem && 'w-100'}`}>
        <h4 className="text-light new-arrival-heading mb-0">Play Station 5</h4>
        <p className="new-arrival-item-desc mb-0 new-arrival-desc">{desc}</p>
        <Link to="#" className="text-light new-arrival-item-btn position-relative">Shop Now</Link>
      </div>
    </div>
  );
});


