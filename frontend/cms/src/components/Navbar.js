import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const currRoute = useLocation().pathname;
  return (
    <nav
      id="sidebarMenu"
      class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    >
      <div class="position-sticky pt-3">
        <ul class="nav flex-column">
          <li class="nav-item">
            <Link
              class={currRoute === "/" ? "nav-link active" : "nav-link"}
              aria-current="page"
              to="/"
            >
              <span data-feather="home"></span>
              Dashboard
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/order" ? "nav-link active" : "nav-link"}
              to="/order"
            >
              <span data-feather="file"></span>
              Orders
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/product" ? "nav-link active" : "nav-link"}
              to="/product"
            >
              <span data-feather="shopping-cart"></span>
              Products
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/user" ? "nav-link active" : "nav-link"}
              to="/user"
            >
              <span data-feather="users"></span>
              Users
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/image" ? "nav-link active" : "nav-link"}
              to="/image"
            >
              <span data-feather="bar-chart-2"></span>
              Images
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/chart" ? "nav-link active" : "nav-link"}
              to="/chart"
            >
              <span data-feather="layers"></span>
              Chart
            </Link>
          </li>
          <li class="nav-item">
            <Link
              class={currRoute === "/line" ? "nav-link active" : "nav-link"}
              to="/line"
            >
              <span data-feather="layers"></span>
              Items Chart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
