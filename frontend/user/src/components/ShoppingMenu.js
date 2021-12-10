import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const client = axios.create({
  baseURL: "/",
});

export const ShoppingMenu = ({ lineItem, setLineItem }) => {
  const token = JSON.parse(localStorage.getItem("user")).access_token;
  let total = 0;
  const [aToken, setAToken] = useState("");
  const [cart, setCart] = useState(null);
  // const [lineItem, setLineItem] = useState(null);
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

  useEffect(() => {
    setAToken(token);
    getCart();
    getLineItem();
  }, [aToken]);

  return (
    <>
      {token === "" ? null : (
        <div class="col-lg-2 col-md-3 col-12">
          <div class="right-bar">
            {/* <!-- Search Form --> */}
            <div class="sinlge-bar">
              <Link to="/order" class="single-icon">
                <i class="fa fa-bell" aria-hidden="true"></i>
              </Link>
            </div>
            <div class="sinlge-bar">
              <Link to="/profile" class="single-icon">
                <i class="fa fa-user-circle-o" aria-hidden="true"></i>
              </Link>
            </div>
            <div class="sinlge-bar shopping">
              <a href="#" class="single-icon">
                <i class="ti-bag"></i>{" "}
                <span class="total-count">
                  {!lineItem ? 0 : lineItem.length}
                </span>
              </a>
              {/* <!-- Shopping Item --> */}
              <div class="shopping-item">
                <div class="dropdown-cart-header">
                  <span>{!lineItem ? 0 : lineItem.length} items</span>
                  <Link to="/cart">View Cart</Link>
                </div>
                <ul class="shopping-list">
                  {!cart
                    ? null
                    : !lineItem
                    ? null
                    : lineItem.map((item, key) => {
                        total += item.days * item.talent.price;
                        return (
                          <li>
                            <a
                              href="#"
                              class="remove"
                              title={"Remove this item " + item.id}
                              onClick={() => delItem(item.id)}
                            >
                              <i class="fa fa-remove"></i>
                            </a>
                            <h4>
                              <a href="#">{item.talent.fullname}</a>
                            </h4>
                            <p class="quantity">
                              {item.days} days -{" "}
                              <span class="amount">
                                {formatter.format(
                                  item.days * item.talent.price
                                )}
                                {}
                              </span>
                            </p>
                          </li>
                        );
                      })}
                </ul>
                <div class="bottom">
                  <div class="total">
                    <span>Total</span>
                    <span class="total-amount">{formatter.format(total)}</span>
                  </div>
                  <Link to="/checkout" class="btn animate">
                    Checkout
                  </Link>
                </div>
              </div>
              {/* <!--/ End Shopping Item --> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
