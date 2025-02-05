const express = require("express");
const { authCheck } = require("../middleware/authenCheck");
const { getOrderAdmin, changeOrderStatus } = require("../controllers/admin");
const router = express.Router();

router.put("/admin/order-status", authCheck, changeOrderStatus);
router.post("/admin/orders", authCheck, getOrderAdmin);

module.exports = router;
