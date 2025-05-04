import { Router } from "express";
import { verifyToken } from "../middlewares/protected.ts";
import { getMessage, getUsersforSidebar, sendMessage } from "../Controllers/messagecontrollers.ts";

const router = Router()

router.get("/conversations",verifyToken,getUsersforSidebar)
router.post("/send/:id",verifyToken,sendMessage)
router.get("/:id",verifyToken,getMessage)

export default router