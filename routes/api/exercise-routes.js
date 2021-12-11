const router = require("express").Router();
const { Workout } = require("../../models");

router.get("/", async ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.status(200).json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
