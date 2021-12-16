import React from "react";
import { useLocation } from "react-router-dom";

export const NavMain = ({ Link }) => {
  const currRoute = useLocation().pathname;
  return (
    <nav class="navbar navbar-expand-lg">
      <div class="navbar-collapse">
        <div class="nav-inner">
          <ul class="nav main-menu menu navbar-nav">
            <li className={currRoute === "/" ? "active" : ""}>
              <Link to="/">Home</Link>
            </li>
            <li className={currRoute === "/shop" ? "active" : ""}>
              <a href="#">
                Shop<i class="ti-angle-down"></i>
              </a>
              <ul class="dropdown">
                <li>
                  <Link to="/shop">Shop Grid</Link>
                </li>
                <li>
                  <Link to="/cart">Cart</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
              </ul>
            </li>
            <li className={currRoute === "/contact" ? "active" : ""}>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
