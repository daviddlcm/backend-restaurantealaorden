const express = require("express")

const router = express.Router()

const orderController = require("../controllers/order.controller")

router.post("/", orderController.postOrder)
router.get("/", orderController.getAllOrders)

module.exports = router
