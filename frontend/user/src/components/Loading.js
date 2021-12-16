import React from "react";
import "./loading.scss";

export const Loading = () => {
  return (
    <div class="preloader">
      <div class="preloader-inner">
        
      {/* <div class="wrapper">
        <div class="bg">
          <div class="load"></div>
        </div>
      </div> */}

      {/* <div class="text"> Loading... </div> */}
        <div class="preloader-icon">
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};
