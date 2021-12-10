import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const client = axios.create({
  baseURL: "/",
});

export const Product = ({option,formatter}) => {
  delete option.weekday;
  const [prod, setProd] = useState(null);
  const token = !JSON.parse(localStorage.getItem("user")) ? ""  : JSON.parse(localStorage.getItem("user")).access_token;

  const getProd = async () => {
    const response = await client.get("/talents", {
      headers: { access_token: token },
    });
    setProd(response.data);
  };

  async function deleteData(id) {
    let result = window.confirm("Are you sure?");
    if (result) {
      await client.delete("/talents/delete/" + id, {
        headers: { access_token: token },
      });
      alert("Post deleted!");
      getProd();
    }
  }

  useEffect(() => {
    getProd();
    // console.log(prod);
  }, []);

  if (!prod) return null;

  return (
    <>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Talents</h1>
          <Link className="btn btn-primary" to="/talent/add">
            Hire new Talent
          </Link>
        </div>
        <h4>Talents List</h4>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Birthdate (Age)</th>
                <th scope="col">Personality</th>
                <th scope="col">Gender</th>
                <th scope="col">Skills</th>
                <th scope="col">Price</th>
                <th scope="col">Nationality</th>
                <th scope="col">Height</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!prod?null:prod.map((prods, key) => {
                return (
                  <tr>
                    <td>{prods.fullname}</td>
                    <td>
                      {new Date(prods.birth).toLocaleDateString(
                          "en-US",
                          option
                      )} ({prods.age} years old)
                    </td>
                    <td>{prods.personality}</td>
                    <td>{prods.gender}</td>
                    <td>{prods.skills}</td>
                    <td>{formatter.format(prods.price)}</td>
                    <td>{prods.nationality}</td>
                    <td>{prods.height} cm</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        title="delete"
                        onClick={() => deleteData(prods.id)}
                      >
                        <i class="far fa-trash-alt"></i>
                      </button>
                      <Link
                        to={"/talent/edit/" + prods.id}
                        className="btn btn-sm btn-warning"
                        title="edit"
                      >
                        <i class="fas fa-edit"></i>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
};
