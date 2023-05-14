const router = require("express").Router();

const authRoute = require("./authRouther");
const phoneRoute = require("./phoneRouther")

router.use("/auth", authRoute);
router.use("/home", phoneRoute);

module.exports = router;