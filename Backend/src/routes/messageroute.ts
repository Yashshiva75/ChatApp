import { Router } from "express";
import { verifyToken } from "../middlewares/protected.ts";

const router = Router()

router.post("/send/:id",verifyToken,sendMessage)

export default router