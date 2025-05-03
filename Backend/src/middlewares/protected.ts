import jwt,{ JwtPayload } from "jsonwebtoken";
import { Response,Request,NextFunction } from "express";
import prisma from "../db/prisma.ts";

interface DecodedToken extends JwtPayload{
    userId:String
}

declare global {
    namespace Express {
        export interface Request{
            user:{
                id:string
            }
        }
    }
} 

export const verifyToken = async(req:Request,res:Response,next:NextFunction):Promise<any>=>{
     try{
        const token = req.cookies?.jwt;


       if(!token){
        return res.status(400).json({message:"No token provided"})
       }

       const decoded = jwt.verify(token,process.env.JWT_SECRET!) as DecodedToken

       if(!decoded){
        return res.status(400).json({message:"Unauthorized Access Haram ke pille tu he  kon?!"})
       }

       const user = await prisma.user.findUnique({where:{id:decoded.userId.toString()},select:{id:true,username:true,
        fullname:true,profilepic:true}})

        if(!user){
            return res.status(500).json("user not found")
        }
        req.user = user

       next()
     }catch(error){
        return res.status(500).json({message:"Error in get me"})
     }
}