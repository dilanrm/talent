import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Breadcrumb } from "../components/Breadcrumb";
import { Loading } from "../components/Loading";

toast.configure();

const client = axios.create({
  baseURL: "/",
});
const access_token = !JSON.parse(localStorage.getItem("user")) ? "" : JSON.parse(localStorage.getItem("user")).access_token;

export const Profile = ({ loading }) => {
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [user, setUser] = useState(null);

  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const avatarStyle = {
    width: "150px",
    borderRadius: "5.5em",
    height: "150px",
  };

  const getUser = async () => {
    const response = await client.post(
      "/users/",
      {},
      {
        headers: { access_token },
      }
    );

    if (response.data) {
      setUser(response.data);
    }
  };

  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
    console.log(e.target.files);
    console.log(image)
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar",image.raw);
    const config = {
      headers: { "Content-Type": "multipart/form-data", access_token },
    };
    const response = await client.post("/upload/user", formData , config);
    if (response) {
      toast("Avatar successfully changed!", { type: "success" });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // if (!user) return null;

  return (
    <>
      {loading === true ? (
        <Loading />
      ) : (
        <div>
          <Breadcrumb />
          {!user ? null : (
            <section class="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
              <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                  <div class="col col-lg-12 mb-4 mb-lg-0">
                    <div class="card mb-3" style={{ borderRadius: ".5rem" }}>
                      <div class="row g-0">
                        <div
                          class="col-md-4 gradient-custom text-center text-white"
                          style={{
                            borderTopLeftRadius: ".5rem",
                            borderBottomLeftRadius: ".5rem;",
                          }}
                        >
                          {image.preview ? (
                            <img
                              src={image.preview}
                              alt="..."
                              class="img-fluid my-5"
                              style={avatarStyle}
                            />
                          ) : (
                            <>
                              <img
                                src={user.avatar}
                                alt="..."
                                class="img-fluid my-5"
                                style={avatarStyle}
                              />
                            </>
                          )}
                          <h5 style={{ color: "#3c71d1" }}>{user.name}</h5>
                          <p>{user.type}</p>
                          <i class="far fa-edit mb-5"></i>
                        </div>
                        <div class="col-md-8">
                          <div class="card-body p-4">
                            <h6>Information</h6>
                            <hr class="mt-0 mb-4" />
                            <div class="row pt-1">
                              <div class="col-6 mb-3">
                                <h6>Email</h6>
                                <p class="text-muted">{user.email}</p>
                              </div>
                              <div class="col-6 mb-3">
                                <h6>Gender</h6>
                                <p class="text-muted">{user.gender}</p>
                              </div>
                              <div class="col-6 mb-3">
                                <h6>Birthday</h6>
                                <p class="text-muted">
                                  {new Date(user.birthdate).toLocaleDateString(
                                    "en-US",
                                    option
                                  )}
                                </p>
                              </div>
                              <div class="col-6 mb-3">
                                <h6>Join At</h6>
                                <p class="text-muted">
                                  {new Date(user.createdAt).toLocaleDateString(
                                    "en-US",
                                    option
                                  )}
                                </p>
                              </div>
                            </div>
                            <h6>Action</h6>
                            <hr class="mt-0 mb-4" />
                            <div class="row pt-1">
                              <div class="col-6 mb-3">
                                <h6>Change avatar:</h6>
                                <div>
                                  <form
                                    onSubmit={handleUpload}
                                    encType="multipart/form-data"
                                  >
                                    <div class="custom-file">
                                      <input
                                        type="file"
                                        class="custom-file-input"
                                        id="customFile"
                                        name="avatar"
                                        onChange={handleChange}
                                      />
                                      <label
                                        class="custom-file-label"
                                        for="customFile"
                                      >
                                        Choose file
                                      </label>
                                      <div class="mt-3">
                                        <button
                                          type="submit"
                                          class="btn btn-primary"
                                        >
                                          Submit
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </>
  );
};
