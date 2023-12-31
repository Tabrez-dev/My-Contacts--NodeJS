const express = require("express");
const  validateToken  = require("../middleware/validatetokenhandler");
const{registerUser, loginUser,currentUser}=require("../controllers/userController");
const router=express.Router();
//register user
router.post("/register",registerUser);
//login user
router.post("/login",loginUser);
//info of current user
router.get("/current",validateToken, currentUser);

module.exports=router;