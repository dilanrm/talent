import React from "react";
import "./banner.css";

export const SingleBanner = () => {
  const onHover = { content: "", backgroundColor: "rgba(0,0,0,0.8)" };
  return (
    <>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/nAbThyu2_ZY/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Hana Macchia Karaoke Stream</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=nAbThyu2_ZY"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
            <div class="content">
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "20px",
                  color: "rgba(236, 123, 1, 0.7)",
                }}
              >
                Hana Macchia
              </p>
              <br />
              <br />
              <br />
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/5DP4Zfh1QPo/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Zea Special 200K Live Karaoke</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=5DP4Zfh1QPo"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/t1Ny203vUfk/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Taka Radjiman Cover Song</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=t1Ny203vUfk"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/1nF8cgdsyNM/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Tsukino Mito Plays Cooking Simulator</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=1nF8cgdsyNM"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/uUURPgZ4Z5Q/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Hana Drawing Stream collab</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=uUURPgZ4Z5Q"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-12">
        <div class="single-banner">
          <div class="hovereffect">
            <img
              class="img-responsive"
              src="https://i3.ytimg.com/vi/LSKZ-5pi3wk/maxresdefault.jpg"
              alt=""
            />
            <div class="overlay">
              <h2>Amelia Watson Voice Acting</h2>
              <a
                class="info"
                href="https://www.youtube.com/watch?v=LSKZ-5pi3wk"
                target="_blank"
              >
                Check it here!
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
