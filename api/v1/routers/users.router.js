const express = require("express");
const router = express.Router();
const Controller = require("../controller/users.controller")
const Middleware = require("../middleware/authe.middleware")
router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/forgot/password", Controller.forgotPassword)
router.post("/password/otp", Controller.otpPassword)
router.post("/password/reset", Controller.resetPassword)
router.get("/detail",Middleware.requireAuth ,Controller.detail)
router.get("/list",Middleware.requireAuth ,Controller.list)
module.exports = router;