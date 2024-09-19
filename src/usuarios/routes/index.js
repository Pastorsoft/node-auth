const express = require("express");
const router = express.Router();
const UserController = require("../controller");
const auth = require("../../middleware/auth");

router.get("/usuarios/:username", UserController.apiGetUserbyUsername);
router.get("/usuarios", auth.isAuthenticated, UserController.apiGetAllUsers);
router.post("/create", UserController.apiCreateUser);
router.post("/login", UserController.apiLogin);
router.post("/update", UserController.apiUpdate);

module.exports = router;
