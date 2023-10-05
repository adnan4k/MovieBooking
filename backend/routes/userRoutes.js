import express from "express"
import { deleteUser,getUserById, getAllUsers, getUsersBooking, login, signup, updateUser } from "../controllers/userController.js";




const router = express.Router();
router.get("/:id", getUserById);
router.get("/",getAllUsers);
router.post("/signup",signup);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser)
router.post("/login",login)
router.get("/booking/:id",getUsersBooking)


export  default router
