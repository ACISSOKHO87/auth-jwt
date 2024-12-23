const express = require("express");
const userCtrl = require("../controllers/users.controllers");
const jwtconfig = require("../config/jwt.config");

const router = express.Router();

router.post("/signup", userCtrl.signup);
router.post("/signin", userCtrl.signin);
router.get("/profil", jwtconfig.extractUserFromToken, userCtrl.profil);
module.exports = router;
