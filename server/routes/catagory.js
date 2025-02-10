const express = require("express");
const router = express.Router();
const { create, read, remove } = require("../controllers/catagory");
const { authCheck, adminCheck } = require("../middleware/authenCheck");

router.post("/catagory", authCheck, adminCheck, create);
router.get("/catagory", authCheck, adminCheck, read);
router.delete("/catagory/:id", authCheck, adminCheck, remove);

module.exports = router;
