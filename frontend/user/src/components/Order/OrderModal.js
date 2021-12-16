import React, { useState } from "react";

import { Loading } from "../Loading";

export const OrderModal = ({ orders, image, lineItem, formatter }) => {
  const [values, setValues] = useState(lineItem);
  //   if (!lineItem) return <Loading />;
  return (
    <>
      {!orders
        ? null
        : orders.map((order, key) => {
            return (
              <div
                class="modal fade"
                id={"theModal-" + order.id}
                style={{ zIndex: "9999999" }}
                role="dialog"
              >
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span class="ti-close" aria-hidden="true"></span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <div class="row">
                        <div class="col-12">
                          {/* <!-- Shopping Summery --> */}
                          <table class="table shopping-summery">
                            <thead>
                              <tr class="main-hading">
                                <th>PRODUCT</th>
                                <th>NAME</th>
                                <th class="text-center">DAYS</th>
                                <th class="text-center">UNIT PRICE</th>
                                <th class="text-center">TOTAL</th>
                              </tr>
                            </thead>
                            <tbody>
                              {!lineItem
                                ? null
                                : lineItem.map((item, key) => {
                                    if (item.orderId !== order.id) return null;
                                    return (
                                      <tr>
                                        <td class="image" data-title="No">
                                          {!image
                                            ? null
                                            : image.map((img, key) => {
                                                if (
                                                  img.talentId !== item.talentId
                                                )
                                                  return null;
                                                return (
                                                  <img
                                                    src={img.filename}
                                                    alt="#"
                                                  />
                                                );
                                              })}
                                        </td>
                                        <td
                                          class="product-des"
                                          data-title="Description"
                                        >
                                          <p class="product-name">
                                            <a href="#">
                                              {item.talent.fullname}
                                            </a>
                                          </p>
                                        </td>
                                        <td class="qty" data-title="days">
                                          <span>{item.days}</span>
                                        </td>
                                        <td class="price" data-title="Price">
                                          <span>
                                            {formatter.format(
                                              item.talent.price
                                            )}
                                          </span>
                                        </td>
                                        <td
                                          class="total-amount"
                                          data-title="Total"
                                        >
                                          <span>
                                            {formatter.format(
                                              item.days * item.talent.price
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                            </tbody>
                          </table>
                          {/* <!--/ End Shopping Summery --> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
    </>
  );
};
