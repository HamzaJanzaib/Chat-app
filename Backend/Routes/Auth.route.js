const express = require("express")
const { Register, Login, Logout, UpdateProfile , CheckAuth } = require("../controllers/Auth.Controller")
const { ValidInputs, ValidInputsLogin } = require("../Middleware/validInputs")
const { authMiddleware } = require("../Middleware/Auth.Middleware")
const router = express.Router()

router.post("/register", ValidInputs, Register)
router.post("/Login", ValidInputsLogin, Login)
router.get("/Logout", Logout)
router.put("/Update-Profile", authMiddleware, UpdateProfile)

router.get("/Check", authMiddleware, CheckAuth)

module.exports = router