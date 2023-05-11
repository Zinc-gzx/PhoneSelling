const router = require("express").Router();
const authController = require("../../controllers/authController");

router.route('/sign-in').post(authController.signIn);
router.route('/sign-out').post(authController.signOut);
router.route('/sign-up').post(authController.signUp);
router.route('/verify').get(authController.verify);
router.route('/reset-password-request').post(authController.resetPasswordRequest);
router.route('/reset-password').post(authController.resetPassword);


module.exports = router;