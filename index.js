const express = require('express');
const mongoose = require("mongoose");
const path = require('path');

const roomRoute = require("./routes/room.route.js");
const bookRoute = require("./routes/book.route.js");
const instanceRoute = require("./routes/instance.route.js");
const authRoute = require("./routes/auth.route.js");

const app = express();


//middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use("/api/books", bookRoute);
app.use("/api/rooms", roomRoute);
app.use("/api/instances", instanceRoute);
app.use("/api/auth", authRoute);

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT || 3000, () => {
      console.log("Server is running on port "+ (process.env.PORT || 3000));
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

  module.exports = app;