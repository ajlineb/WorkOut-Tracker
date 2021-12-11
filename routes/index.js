const router = require("express").Router();
const apiRoutes = require("./api");
const webPageRoutes = require("./webPageRoutes");

router.use("/api", apiRoutes);

router.use("/", webPageRoutes);

module.exports = router;
