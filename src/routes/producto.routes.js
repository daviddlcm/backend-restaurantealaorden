const express = require("express")

const router = express.Router()

const productoController = require("../controllers/producto.controller")

router.post("/", productoController.postProducto)
router.get("/", productoController.getAllProductos)

module.exports = router