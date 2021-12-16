import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";

toast.configure();

const client = axios.create({
  baseURL: "/",
});

const access_token = !JSON.parse(localStorage.getItem("user"))
  ? ""
  : JSON.parse(localStorage.getItem("user")).access_token;

export const Contact = ({ loading }) => {
  const [msg, setMsg] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    messages: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(msg);

    const response = await client.post("/message/add", msg, {
      headers: {
        access_token,
      },
    });

    if (response.data.msg === "Success add") {
      toast("Message sent!", { type: "success" });
      setMsg({
        name: "",
        subject: "",
        email: "",
        phone: "",
        messages: "",
      });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  };

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
                      <form class="form" onSubmit={handleSubmit}>
                        <div class="row">
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Name<span>*</span>
                              </label>
                              <input
                                name="name"
                                type="text"
                                placeholder=""
                                value={msg.name}
                                onChange={(e) =>
                                  setMsg({ ...msg, name: e.target.value })
                                }
                                required
                              />
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
                                value={msg.subject}
                                onChange={(e) =>
                                  setMsg({ ...msg, subject: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Email<span>*</span>
                              </label>
                              <input
                                name="email"
                                type="email"
                                placeholder=""
                                value={msg.email}
                                onChange={(e) =>
                                  setMsg({ ...msg, email: e.target.value })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div class="col-lg-6 col-12">
                            <div class="form-group">
                              <label>
                                Your Phone<span>*</span>
                              </label>
                              <input
                                name="phone"
                                type="text"
                                placeholder=""
                                value={msg.phone}
                                onChange={(e) =>
                                  setMsg({ ...msg, phone: e.target.value })
                                }
                                required
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
                                value={msg.messages}
                                onChange={(e) =>
                                  setMsg({ ...msg, messages: e.target.value })
                                }
                                required
                              ></textarea>
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="form-group button">
                              <button type="submit" class="btn">
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
