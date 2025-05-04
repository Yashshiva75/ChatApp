import prisma from "../db/prisma.ts";
import { Response,Request } from "express";

//Send Message
export const sendMessage = async(req:Request,res:Response):Promise<any>=>{
    
    try{
    const {message} = req.body
    const {id:recieverId} = req.params
    const senderId = req.user.id
    
    let conversation = await prisma.conversation.findFirst({
        where:{
            participantIds:{
                hasEvery:[senderId,recieverId]
            }
        }
    })

    if(!conversation){
        conversation = await prisma.conversation.create({
            data:{
                participantIds:{
                    set:[senderId,recieverId]
                }
            }
        })
    }

    const newMessage = await prisma.message.create({
        data:{
            senderId,
            body:message,
            conversationId:conversation.id
        }
    })

    if(newMessage){
        conversation = await prisma.conversation.update({
            where:{
                id:conversation.id
            },
            data:{
                messages:{
                    connect:{
                        id:newMessage.id
                    }
                }
            }
        })
    }
    return res.status(200).json({message:"Message sent successfully "})
    }catch(error){
      console.log("Error",error)
      return res.status(500).json("error in send msg api!")
    }
}

//Get message
export const getMessage = async(req:Request,res:Response):Promise<any>=>{
    try{

        const {id:userToChatId} = req.params
        const senderId = req.user.id

        const conversation = await prisma.conversation.findFirst({
            where:{
                participantIds:{
                    hasEvery:[userToChatId,senderId]
                }
            },
            include:{
                messages:{
                    orderBy:{
                        createdAt:"asc"
                    }
                }
            }
        })
        
        if(!conversation){
            return res.status(400).json({message:"Conversation not found"})
        }

        return res.status(200).json(conversation.messages)
    }catch(error){
        return res.status(500).json({message:"Api Error found"})
    }
}

//Get Users

export const getUsersforSidebar = async(req:Request,res:Response):Promise<any>=>{
     try{

        const me = req.user.id
        const users = await prisma.user.findMany({
            where:{
                id:{
                    not:me
                }
            },
            select:{
                id:true,
                fullname:true,
                profilepic:true
            }
        })
       return res.status(200).json({
        users:users
       })
     }catch(error){
        console.log('Error',error)
        return res.status(500).json('error in api')
     }
}