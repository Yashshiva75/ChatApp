import { Router } from "express";
import { verifyToken } from "../middlewares/protected.ts";
import { sendMessage } from "../Controllers/messagecontrollers.ts";

const router = Router()

router.post("/send/:id",verifyToken,sendMessage)
router.get("/:id",verifyToken,getMessage)

export default router