import React from "react";

export const ShopSorter = ({ onChangePage }) => {
  return (
    <div class="row">
      <div class="col-12">
        {/* <!-- Shop Top --> */}
        <div class="shop-top">
          <div class="shop-shorter">
            {/* <div class="single-shorter">
              <label>Sort By :</label>
              <select>
                <option selected="selected">Name</option>
                <option>Price</option>
                <option>Age</option>
              </select>
            </div> */}
            <div class="single-shorter">
              <label>Show :</label>
              <select onChange={onChangePage}>
                <option selected="selected" value="3">3</option>
                {[...Array(31)].map((x, i) =>
                  i % 3 === 0 && i > 3 ? (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ) : null,
                )}
              </select>
            </div>
          </div>
        </div>
        {/* <!--/ End Shop Top --> */}
      </div>
    </div>
  );
};
