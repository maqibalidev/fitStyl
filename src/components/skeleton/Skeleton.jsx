import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonComponent = ({ count = 1 ,isFluid=false,showTiles=false,height}) => {
  return (
    <div className={`row h-100 ${isFluid && "gx-0"}`}>
      {[...Array(count)].map((item, index) => (
        <div key={index} className={`${!isFluid ? count > 4 ? "col-6 col-sm-4 col-md-2 mb-3" : "col-12 col-sm-4 col-lg-3 mb-3" : "col-12"}`}>
          <Skeleton className={`mb-1 ${isFluid && "h-100"} w-100`} height={!isFluid ? height : ""}  />
        {showTiles &&   <Skeleton count={3} />}
        </div>
      ))}
    </div>
  );
};

export default SkeletonComponent;
