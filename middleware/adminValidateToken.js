const asyncHandler = require("express-async-handler");
const jwt=require("jsonwebtoken");

const adminValidateToken =asyncHandler(async(req,res,next)=>{
    let token;
    let authHeader=req.headers.Authorization || req.headers.authorization;
    
    if(authHeader && authHeader.startsWith("Bearer")){
        token=authHeader.split(" ")[1];
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing in the request");
        }
        jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,decoded)=>{
        if(err){
            res.status(401);
            
            throw new Error("User is not authorized");
        }
        req.user=decoded.user;
        if(req.user.role!=="admin"){
            res.status(403);
            throw new Error("User is not authorized to access this resource");
        }
        next();//middle ware
        });
   
    }
});
module.exports=adminValidateToken ;