import React from "react";

import { Topbar } from "./Topbar";
import { Middlebar } from "./Middlebar";
import { Navbar } from "./Navbar";

export const Header = ({ Logout, getCart, setLineItem, lineItem, cart, token }) => {
  return (
    <header class="header shop">
      {/* <!-- Topbar --> */}
      <Topbar Logout={Logout} lineItem={lineItem} setLineItem={setLineItem} />
      {/* <!-- End Topbar --> */}
      <Middlebar
        getCart={getCart}
        cart={cart}
        lineItem={lineItem}
        setLineItem={setLineItem}
        token={token}
      />
      {/* <!-- Header Inner --> */}
      <Navbar />
      {/* <!--/ End Header Inner --> */}
    </header>
  );
};
