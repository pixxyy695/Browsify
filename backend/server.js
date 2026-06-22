require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app=express();

// Enable CORS for frontend
app.use(cors());

// Middleware
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connected to mongodb");
    })
    .catch((err)=>{
    console.log(err);
})
app.get("/",(req,res)=>{
    res.json({message:"api working"});
});
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});

const productRoutes=require("./routes/productRoutes");
app.use("/api/products",productRoutes);