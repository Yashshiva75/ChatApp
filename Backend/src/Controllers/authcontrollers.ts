
import bcrypt from "bcryptjs"
import prisma from "../db/prisma.js"
import {Request,Response} from "express"



export const signup = async(req:Request,res:Request)=>{

       const {fullname,username,password,confirmpassword,gender} = req.body

       if(!fullname || !username || !password || !confirmpassword || !gender){
              return res.status(400).json({message:"All fields are required"})
       }

       if(password !== confirmpassword){
           return res.status(400).json({message:"Password not same"})
       }

       const user = await prisma.user.findUnique({where:{username}})

       if(user){
        return res.status(400).json({message:"User already exists"})
       }

       const salt = await bcrypt.genSalt(10)
       const hashedpassword = await bcrypt.hash(password,salt)
    
       const boyprofilepic = `https://avatar.iran.liara.run/public/boy?username=[value]`
       const girlprofilepic = `https://avatar.iran.liara.run/public/girl?username=[value]`
       const newUser = await prisma.user.create({})

}