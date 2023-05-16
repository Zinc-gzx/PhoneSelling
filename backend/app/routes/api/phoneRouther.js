const router = require("express").Router();
const phoneController = require("../../controllers/phone");

router.route('/home').get(phoneController.getPhoneListAndBrands);
router.route('/comment').post(phoneController.updateComment);
router.route('/checkout').post(phoneController.updateStock);
router.route('/hide').post(phoneController.updateHide);

module.exports = router;