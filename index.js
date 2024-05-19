const express = require('express');
const moment = require('moment')
const mongoose = require("mongoose");
const path = require('path');

const roomRoute = require("./routes/room.route.js");
const bookRoute = require("./routes/book.route.js");
const instanceRoute = require("./routes/instance.route.js");
const authRoute = require("./routes/auth.route.js");

const app = express();


//middleware
app.use(cors({
  origin: '*'
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/books", bookRoute);
app.use("/rooms", roomRoute);
app.use("/instances", instanceRoute);
app.use("/auth", authRoute);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect(
    "mongodb+srv://fathanahuni:VxHyczHdBiPi4Ts9@backenddb.mi89dpp.mongodb.net/akioAPI?retryWrites=true&w=majority&appName=BackendDB"
  )
  .then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });