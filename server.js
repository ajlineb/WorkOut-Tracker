const express = require("express");
const mongojs = require("mongojs");

const logger = require("morgan");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const databaseUrl = "workoutTrackerDB";
const collections = ["user"];

const db = mongojs(databaseUrl, collections);
db.on("error", (error) => {
  console.log("Database Error:", error);
});
//--------------------------------------------

// db.on("error", (error) => {
//   console.log(`Database error: ${error}`);
// });

// app.get("/stats", (req, res) => {
//   db.places.find({}, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       //console.log("here is the data");
//       //console.log("------------------------------------------------");
//       res.json(data);
//     }
//   });
// });

// app.get("/exercise", (req, res) => {
//   db.places.find({}).sort({ country: 1 }, (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("here is the data");
//       console.log("------------------------------------------------");
//       res.json(data);
//     }
//   });
// });

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
