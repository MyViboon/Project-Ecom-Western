const express = require("express");
const router = express.Router();
const {
  create,
  list,
  remove,
  listby,
  searchFilters,
  update,
} = require("../controllers/product");

// locallhost:5000/api/product
router.post("/product", create);
router.get("/products/:count", list);
router.put("/product/:id", update);
router.delete("/product/:id", remove);
router.post("/productby", listby);
router.post("/search/filters", searchFilters);

module.exports = router;
