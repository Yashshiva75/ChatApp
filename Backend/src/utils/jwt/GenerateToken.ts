import jwt from 'jsonwebtoken'
import {Response} from 'express'
import 'dotenv/config'

export const generateToken = (userid:String | undefined,res:Response)=>{
        const token = jwt.sign({userid},process.env.JWT_SECRET!,{
            expiresIn:"15d"
        })
        res.cookie("jwt",token,{
            maxAge: 15*24*60*1000,
            httpOnly:true,
            sameSite:"strict",
            secure:process.env.NODE_ENV !== "development"
        })
    return token;
}