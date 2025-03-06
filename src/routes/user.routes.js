const express = require("express")

const router = express.Router()

const userController = require("../controllers/user.controller")

router.post("/", userController.postUser)
router.post("/signin", userController.signIn)
//router.get("/validateEmail", userController.validateEmail)
router.get("/", userController.getAllUsers)

module.exports = router