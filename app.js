// MODULES
var express = require("express");

// ROUTE MODULE
var userRoutes = require("./routes/userRoutes");

// APP
const app = express();

// CONFIG
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

// CONNECT TO DB


// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", userRoutes);

// LISTEN
app.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
