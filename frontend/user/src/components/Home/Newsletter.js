import React from "react";

export const Newsletter = () => {
  return (
    <section class="shop-newsletter section">
      <div class="container">
        <div class="inner-top">
          <div class="row">
            <div class="col-lg-8 offset-lg-2 col-12">
              {/* <!-- Start Newsletter Inner --> */}
              <div class="inner">
                <h4>Newsletter</h4>
                <p> Subscribe to our newsletter</p>
                <form method="get" target="_blank" class="newsletter-inner" 
                action="https://mail.google.com/mail/u/0/#inbox?compose=new">
                  <input
                    name="to"
                    placeholder="Your email address"
                    required=""
                    type="email"
                  />
                  <button class="btn">Subscribe</button>
                </form>
              </div>
              {/* <!-- End Newsletter Inner --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
