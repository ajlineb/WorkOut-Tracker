const router = require("express").Router();
const { Workout } = require("../../models");

router.post("/", async ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/bulk", async ({ body }, res) => {
  try {
    Workout.insertMany(body).then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async ({ body }, res) => {
  try {
    const dbWorkout = await Workout.find(body);
    console.log(dbWorkout);
    res.status(200).json(dbWorkout);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/", (req, res) => {
  Workout.find({})
    .then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
