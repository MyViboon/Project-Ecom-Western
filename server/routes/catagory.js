const express = require("express");
const router = express.Router();
const { create, read, remove } = require("../controllers/catagory");

router.post("/catagory", create);
router.get("/catagory", read);
router.delete("/catagory/:id", remove);

module.exports = router;
