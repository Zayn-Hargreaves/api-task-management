const express = require("express");
const router = express.Router();
const Controller = require("../controller/task.controller")
router.get("/",Controller.index)
router.get("/tasks/detail/:id",Controller.detail)
router.patch("/change-status/:id/",Controller.changeStatus)
router.patch("/change-multi/:id/",Controller.changeMulti)
router.post("/create", Controller.create)
router.patch("/edit", Controller.edit)
router.delete("/delete", Controller.delete)
module.exports = router