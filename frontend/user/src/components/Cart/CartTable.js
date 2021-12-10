import React, { useState } from "react";
import { Loading } from "../Loading";

export const CartTable = ({
  getImage,
  image,
  delItem,
  lineItem,
  formatter,
  setTotal,
  setDisc,
  cart,
}) => {
  const [values, setValues] = useState(lineItem);
  let total_temp = 0;
  let days = 0;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  if (!lineItem) return <Loading />;

  for (let i = 0; i < lineItem.length; i++) {
    days += lineItem[i].days;
  }

  if (days > 2) setDisc(0.05);

  return (
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
              <th class="text-center">
                <i class="ti-trash remove-icon"></i>
              </th>
            </tr>
          </thead>
          <tbody>
            {!cart
              ? null
              : !lineItem
              ? null
              : lineItem.map((item, key) => {
                  total_temp += item.days * item.talent.price;
                  setTotal(total_temp);
                  return (
                    <tr>
                      <td class="image" data-title="No">
                        {!image
                          ? null
                          : image.map((img, key) => {
                              if (img.talentId !== item.talentId) return null;
                              return <img src={img.filename} alt="#" />;
                            })}
                      </td>
                      <td class="product-des" data-title="Description">
                        <p class="product-name">
                          <a href="#">{item.talent.fullname}</a>
                        </p>
                      </td>
                      <td class="qty" data-title="Days">
                        <div class="input-group">
                          <div class="button minus">
                            <button
                              type="button"
                              class="btn btn-primary btn-number"
                              disabled="disabled"
                              data-type="minus"
                              data-field="quant[1]"
                            >
                              <i class="ti-minus"></i>
                            </button>
                          </div>
                          <input
                            type="text"
                            name="days[1]"
                            class="input-number"
                            data-min="1"
                            data-max="100"
                            value="1"
                          />
                          <div class="button plus">
                            <button
                              type="button"
                              class="btn btn-primary btn-number"
                              data-type="plus"
                              data-field="quant[1]"
                            >
                              <i class="ti-plus"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                      <td class="price" data-title="Price">
                        <span>{formatter.format(item.talent.price)}</span>
                      </td>
                      <td class="total-amount" data-title="Total">
                        <span>
                          {formatter.format(item.days * item.talent.price)}
                        </span>
                      </td>
                      <td class="action" data-title="Remove">
                        <a href="#" onClick={() => delItem(item.id)}>
                          <i class="ti-trash remove-icon"></i>
                        </a>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
        {/* <!--/ End Shopping Summery --> */}
      </div>
    </div>
  );
};
