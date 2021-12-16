import React from "react";

export const NavSearchForm = () => {
  return (
    <div class="search-top">
      {/* <div class="top-search">
        <a href="#0">
          <i class="ti-search"></i>
        </a>
      </div> */}
      {/* <!-- Search Form --> */}
      <div
        class="search-top active"
        style={{
          right: "50px",
          top: "-57px",
        }}
      >
        <form class="search-form">
          <input type="text" placeholder="Search here..." name="search" />
          <button value="search" type="submit">
            <i class="ti-search"></i>
          </button>
        </form>
      </div>
      {/* <!--/ End Search Form --> */}
    </div>
  );
};
