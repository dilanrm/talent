import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "/",
});

export const AddUser = () => {
  const history = useNavigate();

  const [isMail, setIsMail] = useState(false);
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    birthdate: "",
    gender: "",
    avatar: "",
    type: "",
  });

  console.log(values);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cek = await client.get("/users/" + values.email);
    if (cek.data) {
      console.log(cek.data);
      window.alert("Email already in use!");
    } else {
      console.log(cek.data);
        console.log("submit");
        console.log(values);
        const data = values;
        const response = await client.post("/users/register/", data, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        console.log(response);

        history("/user");
    }
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleReset = () => {
    setValues({
      name: "",
      email: "",
      password: "",
      birthdate: "",
      gender: "",
      avatar: "",
      type: "",
    });
  };

  useEffect(() => {}, []);

  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">User</h1>
      </div>
      <h4>Add User</h4>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="form-floating">
          <input
            name="name"
            className="form-control"
            type="text"
            defaultValue={values.name}
            onChange={handleChange("name")}
          />
          <label htmlFor="floatingPassword">User Name</label>
        </div>
        <div className="form-floating">
          <input
            name="birthdate"
            className="form-control"
            type="date"
            defaultValue={values.birthdate}
            onChange={handleChange("birthdate")}
          />
          <label htmlFor="floatingPassword">User Birthday</label>
        </div>
        <div className="form-floating">
          <select
            name="type"
            className="form-control"
            onChange={handleChange("type")}
          >
            <option value="" selected disabled>
              Choose type
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <label for="floatingPassword">User Type</label>
        </div>
        <div className="form-floating">
          <select
            name="gender"
            className="form-control"
            onChange={handleChange("gender")}
          >
            <option value="" selected disabled>
              Choose Gender
            </option>
            <option value="male">Male</option>
            <option value="demale">Female</option>
          </select>
          <label for="floatingPassword">User gender</label>
        </div>
        <div className="form-floating">
          <input
            name="email"
            className="form-control"
            type="email"
            defaultValue={values.email}
            onChange={handleChange("email")}
          />
          <label htmlFor="floatingPassword">User email</label>
        </div>
        <div className="form-floating">
          <input
            name="password"
            className="form-control"
            type="password"
            defaultValue={values.password}
            onChange={handleChange("password")}
          />
          <label htmlFor="nationality">User password</label>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success" title="add">
            Submit
          </button>
          <button type="reset" className="btn btn-warning" title="add">
            Reset
          </button>
        </div>
      </form>
    </main>
  );
};
