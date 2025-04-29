import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express()
app.use("/api/auth")
app.use("/api/messages")
app.use(express.json()) // to parse json data
app.get('/',(req,res)=>{
    res.send("yash shiva")
})

app.listen(5000,()=>{
    console.log('server started at ',5000)
})

