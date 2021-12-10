import React from "react";
import { Routes, Route } from "react-router-dom";

// import "../App.css";

import { Dashboard } from "./Dashboard";
import { User } from "./User";
import { Order } from "./Order";
import { Product } from "./Product";
import { Image } from "./Image";
import{ EditProd } from "./EditProd";
import { AddProd } from "./AddProd";
import { AddUser } from "./AddUser";
import { EditUser } from "./EditUser";

export const Main = () => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });
  let option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div>
      <div class="container-fluid">
        <div class="row">
          {/* <Navbar /> */}
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="/talent" element={<Product formatter={formatter} option={option} />} />
            <Route path="/talent/edit/:id" element={<EditProd />} />
            <Route path="/talent/add" element={<AddProd />} />
            <Route path="/order" element={<Order />} />
            <Route path="/user" element={<User option={option} />} />
            <Route path="/user/add" element={<AddUser />} />
            <Route path="/user/edit/:id" element={<EditUser />} />
            <Route path="/image" element={<Image />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};
