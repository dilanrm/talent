import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "/",
});

export const EditUser = () => {
  const { id } = useParams();
  const history = useNavigate();

  const [values, setValues] = useState(null);

  console.log(values);

  const getUser = async (id) => {
    const response = await client.get("/users/get/" + id);
    console.log(values);
    if (response.data) {
      setValues(response.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
      console.log("submit");
      console.log(values);
      const data = values;
      const response = await client.put("/users/edit/"+id, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log(response);

      history("/user");
    
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleReset = () => {
    setValues({
      name: "",
      birthdate: "",
      gender: "",
      avatar: "",
      type: "",
    });
  };

  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <>
      {!values ? null : (
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
                defaultValue={new Date(values.birthdate).toISOString().substr(0, 10)}
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
                <option value="user" selected={values.type === "user"}>User</option>
                <option value="admin" selected={values.type === "admin"}>Admin</option>
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
                <option value="male" selected={values.gender === "male"}>
                  Male
                </option>
                <option value="demale" selected={values.gender === "female"}>
                  Female
                </option>
              </select>
              <label for="floatingPassword">User gender</label>
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
      )}
    </>
  );
};
