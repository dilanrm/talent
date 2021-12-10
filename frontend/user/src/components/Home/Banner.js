import React from "react";
import { SingleBanner } from "./SingleBanner";

export const Banner = () => {
  return (
    <section class="small-banner section">
      <div class="container-fluid">
        <div class="row">
          {/* <!-- Single Banner  --> */}<div class="col-12">
						<div class="section-title">
							<h2>Collection</h2>
						</div>
					</div>
          <SingleBanner />
          {/* <!-- /End Single Banner  --> */}
        </div>
      </div>
    </section>
  );
};
