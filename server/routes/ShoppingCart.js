const express = require("express")
const router = express.Router()
const verifyJWT = require("../middleware/verifyJWT")
const ShoppingCartcontroller = require("../controllers/ShoppingCartcontroller")

router.get("/:id",verifyJWT, ShoppingCartcontroller.getAllProducts)
router.post("/",verifyJWT,ShoppingCartcontroller.creatNewProductIncartProducte)
router.put("/",verifyJWT,ShoppingCartcontroller.updateIncartProducte)
router.delete("/:id",ShoppingCartcontroller.deletProducte)

module.exports = router
