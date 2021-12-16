import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Topbar = ({ Logout }) => {
  const access_token = JSON.parse(localStorage.getItem("user")).access_token;
  let history = useNavigate();
  useEffect(() => {
    history("/");
  }, [access_token]);

  return (
    <div class="topbar">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12 col-12">
            {/* <!-- Top Left --> */}
            <div class="top-left">
              <ul class="list-main">
                <li>
                  <i class="ti-headphone-alt"></i> +060 (800) 801-582
                </li>
                <li>
                  <i class="ti-email"></i> support@shophub.com
                </li>
              </ul>
            </div>
            {/* <!--/ End Top Left --> */}
          </div>
          <div class="col-lg-8 col-md-12 col-12">
            {/* <!-- Top Right --> */}
            <div class="right-content">
              {access_token === "" ? (
                <ul class="list-main">
                  <li>
                    <i class="ti-user"></i> <Link to="/signup">Sign Up</Link>
                  </li>
                  <li>
                    <i class="ti-power-off"></i>
                    <Link to="/login">Login</Link>
                  </li>
                </ul>
              ) : (
                <ul class="list-main">
                  <li>
                    <i class="ti-user"></i>{" "}
                    <Link to="/profile">My account</Link>
                  </li>
                  <li>
                    <i class="ti-power-off"></i>
                    <button
                      onClick={Logout}
                      style={{
                        background: "none",
                        border: "0pt",
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
            {/* <!-- End Top Right --> */}
          </div>
        </div>
      </div>
    </div>
  );
};
