import React from "react";

export const ShopSorter = () => {
  return (
    <div class="row">
      <div class="col-12">
        {/* <!-- Shop Top --> */}
        <div class="shop-top">
          <div class="shop-shorter">
            <div class="single-shorter">
              <label>Sort By :</label>
              <select>
                <option selected="selected">Name</option>
                <option>Price</option>
                <option>Age</option>
              </select>
            </div>
          </div>
        </div>
        {/* <!--/ End Shop Top --> */}
      </div>
    </div>
  );
};
