// MODULES
var express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");


// ROUTE MODULE
var userRoutes = require("./routes/userRoutes");

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

// ROUTES
app.get("/", (req, res) => {
  res.render("index");
});

app.use("/users", userRoutes);



const request = require("request");

var apiKey = "IbaW8dTN1RMuvUDjDeWJ0ezUI3gDF3bGIt6COlj48Gi57bbvzt";
var apiSecret = "0ZZhQn3IwuGN76cO8lng1TrbgF3JrUB6QSpiye7Z";
var accessToken = null; // Initialize access token as null

const apiUrl = 'https://api.petfinder.com/v2/oauth2/token';

// Create the request body as a JSON object
const requestBody = {
  grant_type: 'client_credentials',
  client_id: apiKey,
  client_secret: apiSecret
};

// Wrap the API request in a promise
const getAccessToken = () => {
  return new Promise((resolve, reject) => {
    request.post(
      apiUrl,
      {
        json: true,
        body: requestBody
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          // Access token is available in the response body
          accessToken = body.access_token;
          console.log('Access Token:', accessToken);
          resolve(accessToken);
        }
      }
    );
  });
};

// Wrap the API request in a promise
const callExternalApiUsingRequest = () => {
  return new Promise((resolve, reject) => {
    // Filters for animal search
    const queryParams = {
      type: 'Dog',     //type of animal
      breed: 'Pit Bull Terrier',
      size: 'Medium',
      age: 'young',    //"baby", "young", "adult", "senior"
      gender: 'male',   
      location: 'Charlotte, NC',    //The location to search for animals, such as a city, state, or ZIP code
      distance: 10,     //radius according to unit param
      unit: 'Miles',    //unit param for distance
      status: "adoptable"      //"adoptable", "adopted", "found" -- our app should sort and only find adoptable
    };

    // Step 5: Use the generated access token in the API request
    request(
      {
        url: 'https://api.petfinder.com/v2/animals',               //to search based on pet's id add /{id} after animals
        qs: queryParams,
        json: true,
        headers: {
          Authorization: `Bearer ${accessToken}` // Use the generated access token in the request header
        },
      },
      (err, res, body) => {
        if (err) {
          reject(err);
        } else {
          console.log(body.animals); // Log the response data
          resolve(body);
        }
      }
    );
  });
};

// Usage
getAccessToken()
  .then(() => callExternalApiUsingRequest())
  .catch(err => console.error(err));
