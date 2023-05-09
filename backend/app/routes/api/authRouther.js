const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route('/sign-in').post(authController.signIn);
router.route('/sign-out').post(authController.signOut);
// router.route('/sign-up').post(authController.signUp);

module.exports = router;