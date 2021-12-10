import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const client = axios.create({
  baseURL: "/",
});

export const RegistForm = ({ Signup }) => {
  const history = useNavigate();
  const [error, setError] = useState("");
  const [details, setDetails] = useState({
    name: "",
    birthdate: "",
    gender: "",
    email: "",
    password: "",
    c_pass: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    if (details.password !== details.c_pass) {
      setError("Password not match!");
    } else {
      const cek = await client.get("/users/" + details.email);
      if (cek.data) {
        console.log(cek.data);
        setError("Email already in use!");
      } else {
        details.type = "user";
        Signup(details);
        history("/login");
      }
    }
  };

  return (
    <form onSubmit={submitHandler} class="form" method="post" action="#">
      <h6 style={{ color: "red" }}>{error === "" ? "" : error}</h6>
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Name<span>*</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder=""
              required="required"
              onChange={(e) => setDetails({ ...details, name: e.target.value })}
              value={details.name}
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Birthdate<span>*</span>
            </label>
            <input
              type="date"
              name="birthdate"
              placeholder=""
              required="required"
              onChange={(e) =>
                setDetails({ ...details, birthdate: e.target.value })
              }
              value={details.birthdate}
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Gender<span>*</span>
            </label>
            <select
              name="gender"
              id="state-province"
              style={{ display: "none" }}
              onChange={(e) =>
                setDetails({ ...details, gender: e.target.value })
              }
            >
              <option value="divition" selected="selected" disabled>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            <div class="nice-select" tabindex="0">
              <span class="current">Select Gender</span>
              <ul class="list">
                <li data-value="divition" class="option selected focus">
                  Select Gender
                </li>
                <li
                  data-value="male"
                  class="option"
                  onClick={(e) => setDetails({ ...details, gender: "male" })}
                >
                  Male
                </li>
                <li
                  data-value="female"
                  class="option"
                  onClick={(e) => setDetails({ ...details, gender: "female" })}
                >
                  Female
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Email Address<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder=""
              required="required"
              onChange={(e) =>
                setDetails({ ...details, email: e.target.value })
              }
              value={details.email}
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Password<span>*</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder=""
              required="required"
              onChange={(e) =>
                setDetails({ ...details, password: e.target.value })
              }
              value={details.password}
            />
          </div>
        </div>
        <div class="col-lg-6 col-md-6 col-12">
          <div class="form-group">
            <label>
              Confirm Password<span>*</span>
            </label>
            <input
              type="password"
              name="c_pass"
              placeholder=""
              required="required"
              onChange={(e) =>
                setDetails({ ...details, c_pass: e.target.value })
              }
              value={details.c_pass}
            />
          </div>
        </div>
        <div class="col-lg-19 col-12">
          <div class="single-widget get-button">
            <div class="content">
              <div class="button">
                <button className="btn">Sign Up</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
