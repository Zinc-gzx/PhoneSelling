const router = require("express").Router();
const userProfileController = require("../../controllers/userProfileController");

router.route('/listing').get(userProfileController.getPhoneList);
router.route('/add-phone').post(userProfileController.addPhone);
router.route('/delete-phone').post(userProfileController.deletePhone);
router.route('/enable-phone').post(userProfileController.enablePhone);
router.route('/disable-phone').post(userProfileController.disablePhone);
router.route('/show-comment').post(userProfileController.showComment);
router.route('/hide-comment').post(userProfileController.hideComment);

module.exports = router;