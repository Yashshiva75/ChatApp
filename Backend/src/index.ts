import express from "express";

const app = express()

app.get('/',(req,res)=>{
    res.send("yash shiva")
})

app.listen(5000,()=>{
    console.log('server started')
})

