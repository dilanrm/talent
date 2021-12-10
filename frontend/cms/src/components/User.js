import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const client = axios.create({
  baseURL: "/",
});

export const User = ({ option }) => {
  delete option.weekday;
  const [users, setUsers] = useState(null);
  const token = !JSON.parse(localStorage.getItem("user")) ? ""  : JSON.parse(localStorage.getItem("user")).access_token;

  const getUser = async () => {
    const response = await client.get("/users", {
      headers: { access_token: token },
    });
    setUsers(response.data);
  };

  async function deleteData(id) {
    let result = window.confirm("Are you sure?");
    if (result) {
      await client.delete("/users/delete/" + id, {
        headers: { access_token: token },
      });
      alert("Post deleted!");
      getUser();
    }
  }

  useEffect(() => {
    getUser();
    // console.log(prod);
  }, []);

  if (!users) return null;

  return (
    <>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
          <h1 class="h2">Users</h1>
          <Link className="btn btn-primary" to="/user/add">
            Add new User
          </Link>
        </div>
        <h4>Users List</h4>
        <div class="table-responsive">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Avatar</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Birthdate</th>
                <th scope="col">Gender</th>
                <th scope="col">Type</th>
                <th scope="col">Join At</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {!users
                ? null
                : users.map((user, key) => {
                    return (
                      <tr>
                        <td>
                          <img
                            src={user.avatar}
                            alt="..."
                            className="img-fluid"
                            style={{ width: "65px" }}
                          />
                        </td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          {new Date(user.birthdate).toLocaleDateString(
                            "en-US",
                            option
                          )}
                        </td>
                        <td>{user.gender}</td>
                        <td>{user.type}</td>
                        <td>
                          {new Date(user.createdAt).toLocaleDateString(
                            "en-US",
                            option
                          )}{" "}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            title="delete"
                            onClick={() => deleteData(user.id)}
                          >
                            <i class="far fa-trash-alt"></i>
                          </button>
                          <Link
                            to={"/user/edit/" + user.id}
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
