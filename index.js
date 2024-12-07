const express= require("express");

const app=express();

const PORT=8000;

const {connectToMongoDB}=require("./connect")
connectToMongoDB('mongodb://localhost:27017/short-url')
.then(()=>console.log("MongoDB Connected"));


const urlRoute=require('./routes/url')

app.use("/url",urlRoute)
app.listen(PORT,()=>console.log(`Server Started at ${PORT}`));

