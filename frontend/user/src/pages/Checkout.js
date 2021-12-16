import React, { useState, useEffect } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";

toast.configure();

const client = axios.create({
  baseURL: "/",
});
let days;
const access_token = !JSON.parse(localStorage.getItem("user"))
  ? ""
  : JSON.parse(localStorage.getItem("user")).access_token;

export const Checkout = ({ loading }) => {
  let history = useNavigate();
  const [total, setTotal] = useState(0);
  const [lineItem, setLineItem] = useState([]);
  const [disc, setDisc] = useState(0);
  const [isCard, setIsCard] = useState(false);
  const [product, setProduct] = useState({
    data: lineItem,
    total_due: total,
  });

  days = days || 0;
  let total_temp = 0;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const handleCard = (val) => {
    if (val.target.value === "card") setIsCard(true);
    else setIsCard(false);
  };

  const addOrder = async (data) => {
    let result = {};

    const { description, balance_transaction, billing_details, receipt_email } =
      data;
    const payt_trx_num = balance_transaction;
    const city = `${billing_details.address.city}, ${billing_details.address.country}`;
    const address = receipt_email;

    const { total_due } = product;
    const tgl = new Date();
    let startdate = new Date();
    let enddate = new Date();
    startdate.setDate(tgl.getDate() + 2);
    enddate.setDate(startdate.getDate() + days);
    const tax = 12;
    const discount = disc !== 1 ? 5 : 0;

    const response = await client.post(
      "/orders/add",
      {
        enddate,
        startdate,
        tax,
        discount,
        total_due,
        days,
        description,
        payt_trx_num,
        city,
        address,
      },
      {
        headers: { access_token },
      },
    );
    if (response.data) {
      editLine(response.data.id);
      console.log(response);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  const editLine = async (id) => {
    let ids = [];
    if (lineItem) {
      lineItem.forEach((item) => {
        ids.push(item.id);
      });
    }
    console.log(ids);
    const response = await client.put("/line-items/edits/" + id, { ids });
    if (response.data) {
      history("/order");
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  const handleToken = async (token, addresses) => {
    const response = await client.post(
      "/checkout",
      { token, product },
      {
        headers: { access_token },
      },
    );
    const { status, data } = response.data;
    console.log("Response:", response);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
      const { charge } = data;
      addOrder(charge);
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

  async function getLineItem() {
    const response = await client.get("/line-items/", {
      headers: { access_token },
    });
    if (response) {
      setLineItem(response.data);

      // if (lineItem) {

      // }
      console.log(total);
    }
  }

  useEffect(() => {
    getLineItem();
    // console.log(lineItem);

    // console.log(product)
  }, []);

  useEffect(() => {
    for (let i = 0; i < lineItem.length; i++) {
      days += lineItem[i].days;
      total_temp += lineItem[i].days * lineItem[i].talent.price;
      setTotal(total_temp);
    }
    if (days > 2) setDisc(0.05);
    console.log(days);
  }, [lineItem]);

  useEffect(() => {
    setProduct({
      data: lineItem,
      total_due:
        Math.round((total * (1 - disc) + total * 0.12 + Number.EPSILON) * 100) /
        100,
    });
    console.log(product.total_due);
  }, [total]);

  if (!lineItem) {
    return null;
  }

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          <section class="shop checkout section">
            <div class="container">
              <div class="row">
                <div class="col-12">
                  <div class="order-details">
                    {/* <!-- Order Widget --> */}
                    <div class="single-widget">
                      <h2>CART TOTALS</h2>
                      <div class="content">
                        <ul>
                          <li>
                            Cart Subtotal<span>{formatter.format(total)}</span>
                          </li>
                          <li>
                            Disc. (> 2 days)
                            <span>
                              {disc !== 0.05
                                ? "5% (" + formatter.format(total * disc) + ")"
                                : "0% (" + formatter.format(total * 0) + ")"}
                            </span>
                          </li>
                          <li>
                            Tax
                            <span>12% ({formatter.format(total * 0.12)})</span>
                          </li>
                          {/* <li>You Save<span>$20.00</span></li> */}
                          <li class="last">
                            You Pay
                            <span>
                              {formatter.format(
                                total * (1 - disc) + total * 0.12,
                              )}
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* <!--/ End Order Widget -->
                    <!-- Order Widget --> */}
                    <div class="single-widget">
                      <h2>Payments</h2>
                      <div class="content">
                        <div className="checkbox">
                          <div class="custom-control">
                            <select
                              class="custom-select"
                              onChange={handleCard.bind(this)}
                            >
                              <option selected disabled>
                                Custom payment method
                              </option>
                              <option value="card">Card</option>
                              <option value="ovo">OVO</option>
                              <option value="gopay">Gopay</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <!--/ End Order Widget --> */}
                    {/* <!-- Payment Method Widget --> */}
                    <div class="single-widget payement">
                      <div class="content">
                        <img src="images/payment-method.png" alt="#" />
                      </div>
                    </div>
                    {/* <!--/ End Payment Method Widget --> */}
                    {/* <!-- Button Widget --> */}
                    <div class="single-widget get-button">
                      <div class="content">
                        <div class="button">
                          {!isCard ? (
                            <a href="#" class="btn">
                              proceed to checkout
                            </a>
                          ) : (
                            <StripeCheckout
                              stripeKey="pk_test_51K2wUBCHu9iZyST2wya6lFpM0w4GhZirwSIm6TydVIaIlamSm8NWUNC7X7ChpTFOfBuvny8vwXhC5oOebBL9Lktq00hkHQnste"
                              token={handleToken}
                              amount={product.total_due * 100}
                              name="Talent Order"
                              billingAddress
                              shippingAddress
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {/* <!--/ End Button Widget --> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
