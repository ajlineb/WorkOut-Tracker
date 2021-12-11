const router = require("express").Router();
const exerciseRoutes = require("./exercise-routes");

router.use("/workouts", exerciseRoutes);

module.exports = router;
