const router = require("express").Router();
const { Workout } = require("../../models");

//latest workout
router.get("/", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
      },
    },
  ])
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => res.status(400).json(err));
});

//make a new workout
router.post("/", (req, res) => {
  Workout.create(req.body, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json(err);
    } else {
      console.log("CREATE DATA", data);
      res.status(200).json(data);
    }
  });
});

//update existing workout
router.put("/:id", (req, res) => {
  Workout.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { exercises: req.body } },
    { runValidators: true },
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

//shows workouts in the range
//reversed the final variable to make it look better on the graphs
router.get("/range", (req, res) => {
  Workout.aggregate(
    [
      // Grouping
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
      // Sorting
      { $sort: { day: -1 } },
      // limiting to 7 days
      { $limit: 7 },
    ],
    function (err, data) {
      if (err) {
        console.log(err);
        res.status(400).json(err);
      } else {
        const reversedData = data.reverse(); //reversing so that data starts at the older day to the left of the chart and new to the right of the chart
        res.status(200).json(reversedData);
      }
      // json(data) is an array of documents
    }
  );
});

module.exports = router;
