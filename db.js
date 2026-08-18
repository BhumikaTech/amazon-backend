const mongoose = require("mongoose");

const mongoUrl = "mongodb://127.0.0.1:27017/amazonDB";

mongoose.connect(mongoUrl);

const db = mongoose.connection;

db.on("connected", () => {
    console.log("Connected to MongoDB server");
});

db.on("error", (err) => {
    console.log("MongoDB connection error:", err);
});

db.on("disconnected", () => {
    console.log("Disconnected from MongoDB server");
});

module.exports = db;