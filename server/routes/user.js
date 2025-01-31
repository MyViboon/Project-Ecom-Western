const express = require("express");
const router = express.Router();
const {
  listUsers,
  changesStatus,
  changesRole,
  userCart,
  getUserCart,
  emptyCart,
  saveAddress,
  saveOrder,
  getOrder,
} = require("../controllers/user");
const { authCheck, adminCheck } = require("../middleware/authenCheck");

router.get("/users", authCheck, adminCheck, listUsers);
router.post("/change-status", authCheck, adminCheck, changesStatus);
router.post("/change-role", authCheck, adminCheck, changesRole);

router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);
router.delete("/user/cart", authCheck, emptyCart);

router.post("/user/address", authCheck, saveAddress);

router.post("/user/order", authCheck, saveOrder);
router.get("/user/order", authCheck, getOrder);

module.exports = router;
