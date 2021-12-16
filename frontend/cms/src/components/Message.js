import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const client = axios.create({
  baseURL: "/",
});

const access_token = !JSON.parse(localStorage.getItem("user"))
  ? ""
  : JSON.parse(localStorage.getItem("user")).access_token;

export const Message = () => {
  const [msg, setmsg] = useState(null);
  let option = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const getMsg = async () => {
    try {
      const response = await client.get("/message");
      if (response.data) {
        setmsg(response.data);
        console.log(msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const delMsg = async (id) => {
    let result = window.confirm("Delete this message?");
    if (result) {
      await client.delete("/message/delete/" + id, {
        headers: { access_token },
      });
      toast("Message deleted!", { type: "success" });
      getMsg();
    }
  };

  useEffect(() => {
    getMsg();
  }, []);

  return (
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Messages</h1>
      </div>
      <h4>Message List</h4>
      <div class="table-responsive">
        <table class="table table-striped table-sm">
          <thead>
            <tr class="main-hading">
              <th>NAME</th>
              <th>EMAIL</th>
              <th class="text-center">SUBJECT</th>
              <th class="text-center">PHONE</th>
              <th class="text-center">MESSAGE</th>
              <th class="text-center">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {!msg ? (
              <tr>
                <td colspan="6">
                  <h3>No Message</h3>
                </td>
              </tr>
            ) : (
              msg.map((message, key) => {
                return (
                  <tr>
                    <td>{message.name}</td>
                    <td>{message.email}</td>
                    <td>{message.subject}</td>
                    <td>{message.phone}</td>
                    <td>{message.message}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => delMsg(message.id)}
                        title="Delete Message"
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <a
                        className="btn btn-sm btn-success"
                        href={
                          "https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=" +
                          message.email
                        }
                        target="_blank"
                      >
                        Reply
                      </a>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
};
