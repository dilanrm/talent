require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const path = require("path");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/static", express.static(path.join(__dirname, "static")));

const routes = require("./routes");
app.use(routes);

app.listen(port, () => {
  console.log("App Listening on port", port);
});
