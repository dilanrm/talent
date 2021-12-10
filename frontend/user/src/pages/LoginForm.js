import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";

export const LoginForm = ({ Login, error, loading }) => {
  const [details, setDetails] = useState({ email: "", password: "" });

  let history = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };
  
  useEffect(() => {
    if(JSON.parse(localStorage.getItem("user")).access_token !== "") history("/");
  }, [JSON.parse(localStorage.getItem("user"))]);

  return (
    <>
      {/* {(JSON.parse(localStorage.getItem("user")).email !== "") ? history("/") : (
        <div/>
      )} */}
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />

          <div className="container">
            <main className="form-signin">
              <form onSubmit={submitHandler} style={{ margin: "30px" }}>
                <h1 className="h3 mb-3 fw-normal">Login</h1>
                {error !== "" ? <div className="error">{error}</div> : ""}
                <label htmlFor="floatingInput">Email address</label>
                <div class="form-floating">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={(e) =>
                      setDetails({ ...details, email: e.target.value })
                    }
                    value={details.email}
                    required
                  />
                </div>
                <label htmlFor="floatingPassword">Password</label>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={(e) =>
                      setDetails({ ...details, password: e.target.value })
                    }
                    value={details.password}
                    required
                  />
                </div>
                <br />
                <button className="w-100 btn btn-lg btn-primary" type="submit">
                  Sign in
                </button>
              </form>
            </main>
          </div>
        </div>
        
      )}
    </>
  );
};
