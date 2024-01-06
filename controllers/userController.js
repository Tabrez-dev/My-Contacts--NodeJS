const asycHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const registerUser =asycHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }
   
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
        role:"user",
    });
    console.log(`user created:${user}`);
    if(user){
        res.status(201).json({_id: user.id,email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({message:"Register the user"})
});

const registerAdmin =asycHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all the fields");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword=await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
        role:"admin",
    });
    console.log(`user created:${user}`);
    if(user){
        res.status(201).json({_id: user.id,email: user.email});
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({message:"Register the user"})
});

const loginUser =asycHandler(async (req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user=await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                id: user._id,
                username: user.username,
                email: user.email,
                
                role:user.role,
            },
        },process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Invalid email or password is not valid");
    }
    
});

const viewAllUsers = asycHandler(async (req, res) => {
    if (req.user.role !== 'admin') {
        res.status(403);
        throw new Error('Not authorized to access this resource');
    }

    const users = await User.find();
    res.status(200).json(users);
});


const modifyUser = asycHandler(async (req, res) => {
    const { name, profileImage } = req.body;
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        req.user.name = name;
        req.user.profileImage = profileImage;

        await req.user.save();

        res.status(200).json({
            _id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            profileImage: req.user.profileImage,
            role: req.user.role,
        });
    } else {
        res.status(403).json({ message: 'Access denied. Admins or users themselves only.' });
    }
});



const deleteUser = asycHandler(async (req, res) => {
    if (req.user.role === 'admin' || req.user.id === req.params.id) {
        const user = await User.findById(req.params.id);

        if (user) {
            await user.remove();
            res.status(200).json({ message: 'User deleted successfully.' });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } else {
        res.status(403).json({ message: 'Access denied. Admins or users themselves only.' });
    }
});

const currentUser =asycHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser, registerAdmin, viewAllUsers, modifyUser, deleteUser };