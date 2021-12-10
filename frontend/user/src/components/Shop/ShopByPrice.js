import React from "react";

export const ShopByPrice = () => {
  return (
    <ul class="check-box-list">
      <li>
        <label class="checkbox-inline" for="1">
          <input name="news" id="1" type="checkbox" />
          $20 - $50<span class="count">(3)</span>
        </label>
      </li>
      <li>
        <label class="checkbox-inline" for="2">
          <input name="news" id="2" type="checkbox" />
          $50 - $100<span class="count">(5)</span>
        </label>
      </li>
      <li>
        <label class="checkbox-inline" for="3">
          <input name="news" id="3" type="checkbox" />
          $100 - $250<span class="count">(8)</span>
        </label>
      </li>
    </ul>
  );
};
