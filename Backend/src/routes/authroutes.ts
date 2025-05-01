import {Router} from 'express'
import { getMe, login, logout, signup } from '../Controllers/authcontrollers.ts'
import { verifyToken } from '../middlewares/protected.ts'

const router = Router()

router.get("/me",verifyToken,getMe)
router.post("/signup",signup)
router.post("/login",login)
router.post("/logout",logout)

export default router