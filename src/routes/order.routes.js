const express = require("express")

const router = express.Router()

const orderController = require("../controllers/order.controller")

router.post("/", orderController.postOrder)
router.get("/", orderController.getAllOrders)

router.post("/confirm", orderController.confirmOrder)
router.post("/send", orderController.sendOrder)


module.exports = router
