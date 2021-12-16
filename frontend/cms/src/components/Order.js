import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const client = axios.create({
  baseURL: "/",
});

export const Order = () => {
  const [orders, setOrders] = useState(null);
  let option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const getOrder = async () => {
    try {
      const response = await client.get("/orders/all");
      if (response.data) {
        setOrders(response.data);
        console.log(orders);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const confirm = async (id) => {
    let result = window.confirm("Confirm this Transaction?");
    if (result) {
      await client.put("/orders/confirm/" + id);
      toast("Payment Confirmed!", { type: "success" });
      getOrder();
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Orders</h1>
      </div>
      <h4>Talents List</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr class="main-hading">
              <th>Trans. Code</th>
              <th>DATE</th>
              <th class="text-center">DAYS</th>
              <th class="text-center">TOTAL PAID</th>
              <th class="text-center">STATUS</th>
              <th class="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {!orders ? (
              <tr>
                <td colspan="6">
                  <h3>No Order</h3>
                </td>
              </tr>
            ) : (
              orders.map((order, key) => {
                return (
                  <tr>
                    <td>{order.payt_trx_num}</td>
                    <td>
                      From{" "}
                      <strong>
                        {new Date(order.startdate).toLocaleDateString(
                          "en-US",
                          option,
                        )}
                      </strong>
                      <br />
                      Until{" "}
                      <strong>
                        {new Date(order.enddate).toLocaleDateString(
                          "en-US",
                          option,
                        )}
                      </strong>
                    </td>
                    <td>{order.total_days}</td>
                    <td>{formatter.format(order.total_due)}</td>
                    <td>
                      <span
                        style={
                          order.status === "pending"
                            ? { color: "orange" }
                            : { color: "green" }
                        }
                      >
                        {order.status}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => confirm(order.id)}
                        title="Confirm Payment"
                      >
                        <span>Confirm Payment</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
