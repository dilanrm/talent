import React from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "/",
});

const ApiCall = () => {
  const apiLogin = async (data) => {
    const user = data;
    const response = await client.post("/users/login", user);

    return response;
  };

  return { apiLogin };
};

export default ApiCall;
