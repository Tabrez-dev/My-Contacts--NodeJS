//server.js
const express=require('express');
const dotenv=require("dotenv").config();

const connectDb = require('./config/dbConnections');// Corrected import
connectDb();
const app=express();
const port=process.env.PORT|| 5000;
const errorHandler = require('./middleware/errorHandler');



app.use(express.json());//middleware
app.use("/api/contacts", require("./routes/contactRoutes"));//middleware
app.use("/api/users", require("./routes/userRoutes"));//middleware
app.use(errorHandler);//middleware

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});