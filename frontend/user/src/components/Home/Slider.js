import React from "react";
import { Link } from "react-router-dom";

export const Slider = () => {
  return (
    <section
      class="hero-slider"
      style={{
        backgroundImage:
          "url('https://i.ytimg.com/vi/Vbbhj0iFBiE/maxresdefault.jpg')",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover"
      }}
    >
      {/* <!-- Single Slider --> */}
      <div class="single-slider" style={{ background: "rgba(0,0,0,0.6)" }}>
        <div class="container">
          <div class="row no-gutters">
            <div class="col-lg-9 offset-lg-3 col-12">
              <div class="text-inner">
                <div class="row">
                  <div class="col-lg-7 col-12">
                    <div class="hero-text">
                      <h1>
                        <span>GET YOUR TALENT NOW! </span>Best Virtual Idol
                      </h1>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <div class="button">
                        <Link to="/shop" class="btn">
                          Find it Now!
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!--/ End Single Slider --> */}
    </section>
  );
};
