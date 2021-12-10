import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb } from "../components/Breadcrumb";
import { CartTable } from "../components/Cart/CartTable";
import { CartTotal } from "../components/Cart/CartTotal";
import { Loading } from "../components/Loading";

toast.configure();

const client = axios.create({
  baseURL: "/",
});
const token = !JSON.parse(localStorage.getItem("user")) ? "" : JSON.parse(localStorage.getItem("user")).access_token;

export const Cart = ({ loading, lineItem, setLineItem }) => {
  const [cart, setCart] = useState(null);
  const [image, setImage] = useState("");
  const [total, setTotal] = useState(0);
  const [disc, setDisc] = useState(0);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "IDR",
  });

  const getCart = async () => {
    const response = await client.get("/carts/", {
      headers: { access_token: token },
    });
    setCart(response.data);
    // console.log(cart);
  };

  const getLineItem = async () => {
    const response = await client.get("/line-items/", {
      headers: { access_token: token },
    });
    setLineItem(response.data);
    // console.log(lineItem);
  };

  const delItem = async (id) => {
    const response = await client.delete("/line-items/delete/" + id, {
      headers: { access_token: token },
    });

    if (response) {
      toast(`This talent has been removed`, { type: "success" });
      getLineItem();
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  const getImage = async (id) => {
    const response = await client.get("/talent-images/");
    console.log(response.data);
    setImage(response.data);
  };

  useEffect(() => {
    getCart();
    getLineItem();
    getImage();
  }, []);
  
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          <div class="shopping-cart section">
            <div class="container">
              <CartTable
                setDisc={setDisc}
                setTotal={setTotal}
                image={image}
                getImage={getImage}
                cart={cart}
                delItem={delItem}
                lineItem={lineItem}
                formatter={formatter}
              />
              <CartTotal disc={disc} total={total} formatter={formatter} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
