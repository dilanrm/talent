import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Header = ({ Logout }) => {
  const access_token = !JSON.parse(localStorage.getItem("user"))
    ? ""
    : JSON.parse(localStorage.getItem("user")).access_token;
  const currRoute = useLocation().pathname;
  return (
    <>
      <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="/">
          V-Talent Admin
        </a>
        <button
          className="navbar-toggler position-absolute d-md-none collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#sidebarMenu"
          aria-controls="sidebarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <input
          class="form-control form-control-dark w-100"
          type="text"
          placeholder=""
          aria-label="Search"
        />
        <div className="navbar-nav">
          <div className="nav-item text-nowrap">
            {access_token === "" ? null : (
              <button
                className="nav-link px-3"
                onClick={Logout}
                style={{
                  backgroundColor:
                    "rgba(var(--bs-dark-rgb),var(--bs-bg-opacity))",
                  border: "none",
                  outline: "none",
                }}
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </header>
      {access_token === "" ? null : (
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
                  class={
                    currRoute === "/order" ? "nav-link active" : "nav-link"
                  }
                  to="/order"
                >
                  <span data-feather="file"></span>
                  Orders
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={
                    currRoute === "/talent" ? "nav-link active" : "nav-link"
                  }
                  to="/talent"
                >
                  <span data-feather="shopping-cart"></span>
                  Talents
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
                  class={
                    currRoute === "/image" ? "nav-link active" : "nav-link"
                  }
                  to="/image"
                >
                  <span data-feather="bar-chart-2"></span>
                  Images
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class={
                    currRoute === "/messages" ? "nav-link active" : "nav-link"
                  }
                  to="/messages"
                >
                  <span data-feather="layers"></span>
                  Message
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      )}
    </>
  );
};
