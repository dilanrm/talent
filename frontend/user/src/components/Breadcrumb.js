import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export const Breadcrumb = () => {
  const currRoute = useLocation().pathname;
  return (
    <div class="breadcrumbs">
      <div class="container">
        <div class="row">
          <div class="col-12">
            <div class="bread-inner">
              <ul class="bread-list">
                <li>
                  <Link to="/">
                    Home<i class="ti-arrow-right"></i>
                  </Link>
                </li>
                <li class="active">
                  <Link to={currRoute}>{currRoute.replace("/","")}</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
