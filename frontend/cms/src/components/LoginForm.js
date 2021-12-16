import React, { useState, useEffect } from "react";

// import "./Login.css";

export const LoginForm = ({ Login, error }) => {
  const [details, setDetails] = useState({ email: "", password: "", type:"admin" });

  const submitHandler = (e) => {
    e.preventDefault();

    Login(details);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <main className="form-signin">
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal">Login</h1>
          {error !== "" ? <div className="error">{error}</div> : ""}
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
            <label htmlFor="floatingInput">Email address</label>
          </div>
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
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button className="w-100 btn btn-lg btn-primary" type="submit">
            Sign in
          </button>
          <p className="mt-5 mb-3 text-muted">&copy; 2021</p>
        </form>
      </main>
    </div>
  );
};
