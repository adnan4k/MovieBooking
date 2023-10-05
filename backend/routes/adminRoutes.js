import express from 'express'
import {login,addAdmin, getAllAdmin } from '../controllers/adminController.js'

const adminRouter = express.Router()

adminRouter.post("/signup",addAdmin)
adminRouter.post("/login",login)
adminRouter.get("/",getAllAdmin)

export default adminRouter