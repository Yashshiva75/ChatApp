import express from "express";
import dotenv from "dotenv";
dotenv.config();
import authroutes from './routes/authroutes.ts'
import messageroutes from './routes/messageroute.ts'
const app = express()
import cookieparser from "cookie-parser"

app.use(cookieparser())
app.use(express.json()) // to parse json data
app.use("/api/auth",authroutes)
app.use("/api/messages",messageroutes)

app.get('/',(req,res)=>{
    res.send("yash shiva")
})

app.listen(5000,()=>{
    console.log('server started at ',5000)
})

