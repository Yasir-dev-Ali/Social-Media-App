import { Router } from "express";
import { LoginUser, RegisterUser } from "../controller/user.controller.js";
const router = Router();

// Create a new user
router.post("/user", RegisterUser);
router.post("/login", LoginUser); // Assuming you want to use the same controller for login


export default router;