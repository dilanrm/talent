import React from "react";
import { Loading } from "../Loading";

export const OrderTable = ({ orders }) => {
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
  if (!orders) return <Loading />;
  return (
    <div class="row">
      <div class="col-12">
        {/* <!-- Shopping Summery --> */}
        <table class="table shopping-summery">
          <thead>
            <tr class="main-hading">
              <th>Trans. Code</th>
              <th>DATE</th>
              <th class="text-center">DAYS</th>
              <th class="text-center">TOTAL PAID</th>
              <th class="text-center">STATUS</th>
              <th class="text-center">DETAIL</th>
            </tr>
          </thead>
          <tbody>
            {!orders ? (
              <tr>
                <h3>No Order</h3>
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
                          option
                        )}
                      </strong>
                      <br />
                      Until{" "}
                      <strong>
                        {new Date(order.enddate).toLocaleDateString(
                          "en-US",
                          option
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
                      <a
                        data-toggle="modal"
                        data-target={"#theModal-" + order.id}
                        title="Quick View"
                        href="#"
                      >
                        <span>See Detail</span>
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
        {/* <!--/ End Shopping Summery --> */}
      </div>
    </div>
  );
};
