import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

import { LoginForm } from "./pages/LoginForm";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Loading } from "./components/Loading";
import { Footer } from "./components/Footer";
import { Contact } from "./pages/Contact";
import { Regist } from "./pages/Regist";
import { Shop } from "./pages/Shop";
import { Cart } from "./pages/Cart";
import { Checkout } from "./pages/Checkout";
import { Profile } from "./pages/Profile";
import { Order } from "./pages/Order";

const client = axios.create({
  baseURL: "/",
});

  if (!JSON.parse(localStorage.getItem("user"))) {
    localStorage.setItem("user", JSON.stringify({ access_token: "" }));
  }

function App() {
  // const history = useNavigate();
  const token = !JSON.parse(localStorage.getItem("user")) ? ""  : JSON.parse(localStorage.getItem("user")).access_token;
  const [user, setUser] = useState({ access_token: "" });
  const [lineItem, setLineItem] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);


  const Login = async (details) => {
    // console.log(details);

    details.type = "user";

    const result = await client.post("/users/login", details);

    if (result.data.access_token) {
      console.log("Logged in, token:" + result.data.access_token);
      setUser({ access_token: result.data.access_token });
      localStorage.setItem(
        "user",
        JSON.stringify({ access_token: result.data.access_token })
      );
      console.log(JSON.parse(localStorage.getItem("user")));
      window.location.reload();
    } else {
      console.log(result.data.message);
      setError(result.data.message);
    }

  };

  const Logout = () => {
    console.log("Logged out");
    setUser({ access_token: "" });
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(user));
    console.log(JSON.parse(localStorage.getItem("user")));
    // history("/");
  };

  const Signup = async (details) => {
    console.log(details);

    const response = await client.post("/users/register", details);
    if(response) window.alert("Registration success! You can login now.") 
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, [user]);

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div className="App">
          <Router>
            <Header
              Logout={Logout}
              lineItem={lineItem}
              setLineItem={setLineItem}
            />

            <Routes>
              <Route exact path="/" element={<Home />} loading={loading} />
              <Route
                path="/login"
                element={
                  <LoginForm Login={Login} Error={error} loading={loading} />
                }
              />
              <Route
                path="/signup"
                element={
                  <Regist loading={loading} error={error} Signup={Signup} />
                }
              />
              <Route
                path="/shop"
                element={
                  <Shop
                    loading={loading}
                    lineItem={lineItem}
                    setLineItem={setLineItem}
                  />
                }
              />
              <Route path="profile" element={<Profile loading={loading} />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    loading={loading}
                    lineItem={lineItem}
                    setLineItem={setLineItem}
                  />
                }
              />
              <Route
                path="/checkout"
                element={<Checkout loading={loading} />}
              />
              <Route path="/contact" element={<Contact />} loading={loading} />
              <Route path="/order" element={<Order />} loading={loading} />
            </Routes>

            <Footer />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
