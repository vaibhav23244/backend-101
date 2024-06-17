const express = require("express");

const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/:id", userController.getUsers);

router.post("/signup", userController.signUp);

router.post("/login", userController.logIn);

module.exports = router;
