import React from "react";

export const Logo = ({Link}) => {
  return (
    <div class="logo">
      <Link to="/">
        <img src="images/logo.png" alt="logo" />
      </Link>
    </div>
  );
};
