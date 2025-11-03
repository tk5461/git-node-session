const express = require("express")
const router = express.Router()

const productcontroller = require("../controllers/productcontroller")

router.get("/", productcontroller.getAllProducts)
router.get("/:id",productcontroller.getProductById)
router.post("/",productcontroller.creatNewProduct)
router.put("/:id",productcontroller.updateProdacte)
router.delete("/:id",productcontroller.deletProducte)


module.exports = router
