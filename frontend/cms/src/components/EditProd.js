import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const client = axios.create({
  baseURL: "/",
});

export const EditProd = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [values, setValues] = useState(null);

  const getItem = async () => {
    const response = await client.get("/talents/" + id);
    console.log(values);
    if (response.data) {
      setValues(response.data);
    }
  };

  console.log(values);

  const getAge = (birthDate) =>
    Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit");
    console.log(values);
    const { access_token } = JSON.parse(localStorage.getItem("user"));
    const data = values;
    data.age = getAge(data.birth);
    const response = await client.put("/talents/edit/"+id, data, {
      headers: {
        "Content-Type": "application/json",
        access_token,
      },
    });

    console.log(response);

    history("/talent");
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleReset = () => {
    setValues({
      fullname: "",
      age: 0,
      birth: "",
      personality: "",
      skills: "",
      price: 0,
      gender: "",
      nationality: "",
      height: 0,
    });
  };

  useEffect(() => {
    getItem();
    console.log(values);
  }, []);

  // if (!values) return null;
  // if (!talents) return null;

  return (
    <>
      {!values ? null : (
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 className="h2">Talent</h1>
          </div>
          <h4>Edit Talent</h4>
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <div className="form-floating">
              <input
                name="fullname"
                className="form-control"
                type="text"
                defaultValue={values.fullname}
                onChange={handleChange("fullname")}
              />
              <label htmlFor="floatingPassword">Talent Name</label>
            </div>
            <div className="form-floating">
              <input
                name="birth"
                className="form-control"
                type="date"
                defaultValue={new Date(values.birth).toISOString().substr(0, 10)}
                onChange={handleChange("birth")}
              />
              <label htmlFor="floatingPassword">Talent Birthday</label>
            </div>
            <div className="form-floating">
              <input
                name="price"
                className="form-control"
                type="number"
                defaultValue={values.price}
                onChange={handleChange("price")}
              />
              <label htmlFor="floatingPassword">Talent Price</label>
            </div>
            <div className="form-floating">
              <input
                name="personality"
                className="form-control"
                type="text"
                defaultValue={values.personality}
                onChange={handleChange("personality")}
              />
              <label htmlFor="floatingPassword">Talent Personality</label>
            </div>
            <div className="form-floating">
              <input
                name="height"
                className="form-control"
                type="number"
                defaultValue={values.height}
                onChange={handleChange("height")}
              />
              <label htmlFor="floatingPassword">Talent Height</label>
            </div>
            <div className="form-floating">
              <input
                name="nationality"
                className="form-control"
                type="text"
                defaultValue={values.nationality}
                onChange={handleChange("nationality")}
              />
              <label htmlFor="nationality">Talent Nationality</label>
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
              <label for="floatingPassword">Talent gender</label>
            </div>
            <div className="form-floating">
              <input
                name="skills"
                className="form-control"
                type="text"
                // placeholder="seperate with coma (eq. singing,drawing,fishing"
                defaultValue={values.skills}
                onChange={handleChange("skills")}
              />
              <label htmlFor="skills">Talent Skills</label>
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
