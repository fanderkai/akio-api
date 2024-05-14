const express = require('express');
const mongoose = require("mongoose");
const multer = require('multer');

const roomRoute = require("./routes/room.route.js");
const bookRoute = require("./routes/book.route.js");
const instanceRoute = require("./routes/instance.route.js");
const authRoute = require("./routes/auth.route.js");
const letterRoute = require("./routes/letter.route.js");
const imageRoute = require("./routes/image.route.js");

const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/books", bookRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/instances", instanceRoute);
app.use("/api/letters", letterRoute);
app.use("/api/images", imageRoute);

app.use("/api/auth", authRoute);

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