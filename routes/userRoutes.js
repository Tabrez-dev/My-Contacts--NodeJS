const express = require("express");
const validateToken = require("../middleware/validatetokenhandler");
const userValidateToken = require("../middleware/userValidateToken");
const { registerUser, loginUser, currentUser, registerAdmin, modifyUser, deleteUser } = require("../controllers/userController");
const { updateContact } = require("../controllers/contactController");
const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, userValidateToken, currentUser);

router.put("/modify", validateToken, userValidateToken, updateContact);

router.delete("/:id", validateToken, userValidateToken, deleteUser);

module.exports = router;
