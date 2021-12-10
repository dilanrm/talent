import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";
import { OrderModal } from "../components/Order/OrderModal";
import { OrderTable } from "../components/Order/OrderTable";

toast.configure();

const client = axios.create({
  baseURL: "/",
});
const access_token = !JSON.parse(localStorage.getItem("user")) ? "" : JSON.parse(localStorage.getItem("user")).access_token;

export const Order = () => {
  const [orders, setOrders] = useState(null);
  const [lineItem, setLineItem] = useState(null);
  const [image, setImage] = useState(null);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const getLineItem = async () => {
    const response = await client.get("/line-items/orders");
    setLineItem(response.data);
    console.log(lineItem);
  };

  const getOrder = async () => {
    try {
      const response = await client.get("/orders/", {
        headers: { access_token },
      });
      if (response.data) {
        setOrders(response.data);
        console.log(orders);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getImage = async () => {
    const response = await client.get("/talent-images/");
    if (response.data) {
      setImage(response.data);
      console.log(image);
    }
  };

  useEffect(() => {
    getLineItem();
    getImage();
    getOrder();
  }, []);

  return (
    <>
      <Breadcrumb />
      <div class="shopping-cart section">
        <div class="container">
          <OrderTable orders={orders} />
        </div>
      </div>
      <OrderModal
        formatter={formatter}
        lineItem={lineItem}
        orders={orders}
        image={image}
      />
    </>
  );
};
