import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";
import { RegistForm } from "../components/Regist/RegistForm";

export const Regist = ({ loading, Signup }) => {
const access_token = !JSON.parse(localStorage.getItem("user")) ? "" : JSON.parse(localStorage.getItem("user")).access_token;
    let history = useNavigate();
    
  useEffect(() => {
    if(access_token) history("/");
  }, [access_token]);
  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          <section class="shop checkout section">
            <div class="container">
              <div class="row">
                <div class="col-lg-12 col-12">
                  <div class="checkout-form">
                    <h2>Create Your Account Here</h2>
                    <p>
                      Please register your data in order to create you account
                    </p>
                    {/* <!-- Form --> */}
                    <RegistForm Signup={Signup} />
                    {/* <!--/ End Form --> */}
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
