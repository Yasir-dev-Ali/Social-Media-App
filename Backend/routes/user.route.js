import { Router } from "express";
import { LoginUser, LogoutUser, RegisterUser } from "../controller/user.controller.js";
const router = Router();

// Create a new user
router.post("/user", RegisterUser); // Register user
router.post("/login", LoginUser); // Login user
router.post("/Logout" ,LogoutUser); // Logout user

export default router;