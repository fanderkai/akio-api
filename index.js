const express = require('express');
const mongoose = require("mongoose");
const Room = require("./models/room.model.js");
const Book = require("./models/book.model.js");
const roomRoute = require("./routes/room.route.js");
const bookRoute = require("./routes/book.route.js");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/books", bookRoute);
app.use("/api/rooms", roomRoute);