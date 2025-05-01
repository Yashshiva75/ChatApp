
import bcrypt from "bcryptjs"
import prisma from "../db/prisma.js"
import {Request,Response} from "express"
import { generateToken } from "../utils/jwt/GenerateToken.js"
import { promises } from "dns"



export const signup = async(req:Request,res:Response): Promise<any> =>{

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

//Login
export const login = async(req:Request,res:Response):Promise<any>=>{
    const {username,password} = req.body
    
    try{
       if(!username || !password){
              return res.status(400).json({message:"Please enter username/password"})
       }
       const user = await prisma.user.findUnique({where:{username}})
       if (!user) {
              return res.status(404).json({ message: "User not found" });
            }

       const isPasswordCorrect = await bcrypt.compare(password,user?.password!)

       if(!isPasswordCorrect){
              return res.status(401).json({message:"Password is not correct"})
       }

       generateToken(user?.id,res)

       return res.status(200).json({
             message:"login success😎",
             id:user?.id,
             fullname:user?.fullname,
             username:user?.username,
             profilepic:user?.profilepic
       })

    }catch(error){
         console.log('error',error)
         return res.status(500).json({message:'error in api login'})
    }
}

export const logout = async(req:Request,res:Response):Promise<any>=>{
       try{
              res.cookie("jwt","",{maxAge:0})
              return res.status(200).json("logout success")
       }catch(error){
              return res.status(500).json("logout error")
       }
}

//Get Me

export const getMe = async(req:Request,res:Response):Promise<any>=>{
       try{
              
         const user = await prisma.user.findUnique({where:{id:req.user.id.toString()}})
         
         res.status(200).json({
              id:user?.id,
              fullname:user?.fullname,
              username:user?.username,
              profilepic:user?.profilepic
         })
       }catch(error){
          return res.status(500).json({message:"error in get me api"})
       }
}