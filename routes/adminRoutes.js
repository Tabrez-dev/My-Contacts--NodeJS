const express = require("express");
const validateToken = require("../middleware/validatetokenhandler");
const adminValidateToken = require("../middleware/adminValidateToken");

const { registerAdmin, viewAllUsers, modifyUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.post("/register", registerAdmin);
router.get("/users", validateToken,adminValidateToken, viewAllUsers);
router.put("/users/:id", validateToken,adminValidateToken, modifyUser);
router.delete("/users/:id", validateToken,adminValidateToken, deleteUser);

module.exports = router;
