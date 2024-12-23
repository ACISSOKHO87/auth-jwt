const express = require("express");
const { signin, signup, profil } = require("../controllers/users.controllers");
const { extractUserFromToken } = require("../config/jwt.config");

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profil", extractUserFromToken, profil);
module.exports = router;
