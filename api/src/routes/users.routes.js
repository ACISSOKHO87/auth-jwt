const express = require("express");
const userCtrl = require("../controllers/users.controllers");

const router = express.Router();

router.post("/signup", userCtrl.signup);
module.exports = router;
