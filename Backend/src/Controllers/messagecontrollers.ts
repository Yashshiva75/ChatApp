import prisma from "../db/prisma.ts";
import { Response,Request } from "express";

//Send Message
export const sendMessage = async(req:Request,res:Response):Promise<any>=>{

    const {message} = req.body
    const {id} = req.params
}