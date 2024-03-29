// MODULES
var express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const methodOVerride = require("method-override");

// ROUTE MODULE
var userRoutes = require("./routes/userRoutes");
var prefRoutes = require("./routes/preferenceRoutes");

// APP
const app = express();

// CONFIG
let port = 3000;
let host = "localhost";
app.set("view engine", "ejs");

// CONNECT TO DB
mongoose
  .connect(
    "mongodb+srv://daniel:12345@itcs4155.cy1wdke.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(port, host, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => console.log(err.message));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

//set up session
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        "mongodb+srv://daniel:12345@itcs4155.cy1wdke.mongodb.net/?retryWrites=true&w=majority",
    }),
  })
);

app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// MIDDLEWARE
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOVerride("_method"));

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", userRoutes);

app.use('/pref', prefRoutes);