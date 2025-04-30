
import bcrypt from "bcryptjs"
import prisma from "../db/prisma.js"
import {Request,Response} from "express"
import { generateToken } from "../utils/jwt/GenerateToken.js"



export const signup = async(req:Request,res:Response): Promise<Response> =>{

       const {fullname,username,password,confirmpassword,gender} = req.body

       try{
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
       const newUser = await prisma.user.create({
              data:{
                     fullname,
                     username,
                     password : hashedpassword,
                     gender,
                     profilepic:gender === 'male' ? boyprofilepic : girlprofilepic

              }
       })

       if(newUser){
              generateToken(newUser.id,res)
              return res.status(200).json({data:{
                     id:newUser.id,
                     name:newUser.fullname,
                     username:newUser.username,
                     profilepic:newUser.profilepic
              },message:'user created successfully'})
       }else{
              return res.status(400).json({message:'user not found'})
       }
   }catch(error){
       console.log('error',error)
       return res.status(500).json({message:'Error in Api'})
   }

}