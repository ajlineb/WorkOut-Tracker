const router = require("express").Router();
const statsRoutes = require("./stats-routes");
const exerciseRoutes = require("./exercise-routes");

//router.use("/stats", statsRoutes);
router.use("/workouts", exerciseRoutes);

module.exports = router;
