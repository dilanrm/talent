import React from "react";
import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";

export const Contact = ({ loading }) => {
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          <section id="contact-us" class="contact-us section">
            <div class="container">
              <div class="contact-head">
                <div class="row">
                  <div class="col-lg-8 col-12">
                    <div class="form-main">
                      <div class="title">
                        <h4>Get in touch</h4>
                        <h3>Write us a message</h3>
                      </div>
                      <form class="form" method="post">
                        <div class="row">
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Name<span>*</span>
                              </label>
                              <input name="name" type="text" placeholder="" />
                            </div>
                          </div>
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Subjects<span>*</span>
                              </label>
                              <input
                                name="subject"
                                type="text"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Email<span>*</span>
                              </label>
                              <input name="email" type="email" placeholder="" />
                            </div>
                          </div>
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Phone<span>*</span>
                              </label>
                              <input
                                name="company_name"
                                type="text"
                                placeholder=""
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="form-group message">
                              <label>
                                your message<span>*</span>
                              </label>
                              <textarea
                                name="message"
                                placeholder=""
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="form-group button">
                              <button type="submit" class="btn ">
                                Send Message
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
};
