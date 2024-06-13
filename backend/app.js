const express = require("express");
const config = require("./config.js");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./routes/userRoute.js");

const PORT = config.PORT;
const uri = config.uri;

const app = express();

// Serve static files from the 'uploads' directory
app.use  ("/uploads", express.static(__dirname + "/uploads"));

// middleware to handle body data from postman
app.use(express.json());

// Middleware for handling CORS POLICY

// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());

// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/users", userRoute);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connection Successful");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
