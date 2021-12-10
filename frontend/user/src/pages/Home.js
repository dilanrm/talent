import React from "react";
import { Banner } from "../components/Home/Banner";
import { Newsletter } from "../components/Home/Newsletter";
import { Slider } from "../components/Home/Slider";
import { Loading } from "../components/Loading";

export const Home = ({ loading }) => {
  return (
    <>
    {loading === true ? (
        <Loading />
      ) : (
      <div>
        <Slider />
        {/* <!--/ End Slider Area --> */}

        {/* <!-- Start Small Banner  --> */}
        <Banner />
        {/* <!-- End Small Banner --> */}

        {/* <!-- Start Shop Newsletter  --> */}
        <Newsletter />
        {/* <!-- End Shop Newsletter --> */}
      </div>
      )}
    </>
  );
};
