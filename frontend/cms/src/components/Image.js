import React, { useState, useEffect } from "react";
import axios from "axios";

const client = axios.create({
  baseURL: "/",
});

export const Image = () => {
  const access_token = !JSON.parse(localStorage.getItem("user")) ? ""  : JSON.parse(localStorage.getItem("user")).access_token;
  const [talents, setTalents] = useState(null);
  const [image, setImage] = useState(null);
  
  const styleImg = {
    width: "280px",
    height: "280px"
  }

  const getImage = async () => {
    const response = await client.get("/talent-images/");
    setImage(response.data);
    console.log(image);
  };

  const getTale = async () => {
    const response = await client.get("/talents/", {
      headers: { access_token },
    });
    setTalents(response.data);
    console.log(talents);
  };

  useEffect(() => {
    getTale();
    getImage();
  }, []);

  if (!image) return null;

  return (
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">Images</h1>
      </div>
      <h4>Talent Images</h4>
      <div class="row">
        <div class="col-lg-4 col-md-8 col-12">
          <div class="card" style={{ width: "18rem" }}>
            <img
              class="card-img-top"
              src="http://via.placeholder.com/150"
              alt="Card image cap"
            />
            <form>
              <div class="card-body">
              <div className="form-floating">
              <select
                name="talentId"
                className="form-control"
              >
                <option value="" selected disabled>
                  Choose Talent
                </option>
                {!talents ? null : talents.map((talent,key) => {
                  return(
                    <option value={talent.id} >{talent.fullname}</option>
                  )
                })}
              </select>
              <label for="floatingPassword">Add new</label>
            </div>
                <p class="card-text">
                  <input type="file" name="avatar" />
                </p>
              </div>
              <div class="card-body">
                <button type="submit" className="btn btn-sm btn-success">
                  Upload
                </button>
                <button type="reset" className="btn btn-sm btn-warning">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        {!image
          ? null
          : image.map((img, key) => {
              return (
                <div class="col-lg-4 col-md-8 col-12">
                  <div class="card" style={{ width: "18rem" }}>
                    <img
                      className="card-img-top"
                      src={img.filename}
                      alt="Card image cap"
                      style={styleImg}
                    />
                    <form>
                      <div class="card-body">
                        <h5 class="card-title">{img.talent.fullname}</h5>
                        <p class="card-text">
                          <input type="file" name="avatar" />
                        </p>
                      </div>
                      <div class="card-body">
                        <a href="#" class="card-link">
                          Upload new
                        </a>
                        <a href="#" class="card-link">
                          Delete
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
              );
            })}
      </div>
    </main>
  );
};
