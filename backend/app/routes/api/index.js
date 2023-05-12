const router = require("express").Router();

const authRoute = require("./authRouther");

router.use("/auth", authRoute);

module.exports = router;