require("dotenv").config();
const express = require("express");
const mongoose=require("mongoose");
const cors = require("cors");



const router=require("./routes/chat");
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

const connectDB=require("./db");


app.use("/api",router);

app.listen(port, () => {
    console.log(`server running on port ${port}`);
    connectDB();
    
})
