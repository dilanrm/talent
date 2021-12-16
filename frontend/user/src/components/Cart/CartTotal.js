import React from "react";
import { Link } from "react-router-dom";

export const CartTotal = ({total, formatter, disc}) => {
  return (
    <div class="row">
      <div class="col-12">
        {/* <!-- Total Amount --> */}
        <div class="total-amount">
          <div class="row">
            <div class="col-lg-8 col-md-5 col-12">
              <div class="left"></div>
            </div>
            <div class="col-lg-4 col-md-7 col-12">
              <div class="right">
                <ul>
                  <li>
                    Cart Subtotal<span>{formatter.format(total)}</span>
                  </li>
                  <li>
                    Disc. (> 2 days)<span>{disc !== 1 ? ("5% (" + formatter.format(total*disc) + ")") : "0%"}</span>
                  </li>
                  <li>
                    Tax<span>2% ({formatter.format(total*0.02)})</span>
                  </li>
                  {/* <li>You Save<span>$20.00</span></li> */}
                  <li class="last">
                    You Pay<span>{formatter.format(total*(1-disc)+(total*0.02))}</span>
                  </li>
                </ul>
                <div class="button5">
                  <Link to="/checkout" class="btn">
                    Checkout
                  </Link>
                  <Link to="/shop" class="btn">
                    Continue shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!--/ End Total Amount --> */}
      </div>
    </div>
  );
};
