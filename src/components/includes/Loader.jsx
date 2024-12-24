import React from "react";

const Loader = () => {
  return (
    <div className="loader-overlay d-flex vh-100 align-items-center justify-content-center position-absolute top-0 bottom-0 w-100 ">
      <div class="loader-container d-flex justify-content-center align-items-center px-5 py-4 ">
        <div class="spinner-border text-success "></div>
      </div>
    </div>
  );
};

export default Loader;
