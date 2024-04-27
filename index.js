const express = require('express');
const mongoose = require("mongoose");
const Room = require("./models/room.model.js");
const Book = require("./models/book.model.js");
const Instance = require("./models/instance.model.js");
const roomRoute = require("./routes/room.route.js");
const bookRoute = require("./routes/book.route.js");
const instanceRoute = require("./routes/instance.route.js")
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/rooms", roomRoute);
app.use("/api/books", bookRoute);
app.use("/api/rooms", instanceRoute);