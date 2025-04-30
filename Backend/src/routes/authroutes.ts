import express from 'express'
import { signup } from '../Controllers/authcontrollers.ts'

const router = express.Router()

router.post("/signup",signup)

export default router