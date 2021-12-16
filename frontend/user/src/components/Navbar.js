import React from "react";
import { Link } from "react-router-dom";

import { NavMain } from "./NavMain";

export const Navbar = () => {
  return (
    <div class="header-inner">
      <div class="container">
        <div class="cat-nav-head">
          <div class="row">
            <div class="col-lg-9 col-12">
              <div class="menu-area">
                {/* <!-- Main Menu --> */}
                <NavMain Link={Link} />
                {/* <!--/ End Main Menu -->	 */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
