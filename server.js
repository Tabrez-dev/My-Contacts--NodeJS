const express=require('express');
const connectDb = require('./config/dbConnections');

connectDb();

const app=express();
const port=process.env.PORT|| 5000;
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});