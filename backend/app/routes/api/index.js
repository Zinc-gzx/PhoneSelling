const router = require("express").Router();

const authRoute = require("./authRouther");
const userProfileRoute = require("./userProfileRouther");
const phoneRoute = require("./phoneRouther");

router.use("/auth", authRoute);
router.use("/userProfile", userProfileRoute);
router.use("/home", phoneRoute);

module.exports = router;