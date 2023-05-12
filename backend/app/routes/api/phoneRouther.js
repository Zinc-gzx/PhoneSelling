const router = require("express").Router();
const phoneController = require("../../controllers/phone");

router.route('/home').get(phoneController.getPhoneListAndBrands);
module.exports = router;