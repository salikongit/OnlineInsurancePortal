import express from "express";
import { login } from "../controller/LoginController.js";
import { registerUser } from "../controller/UserController.js";

const router = express.Router();

// User login/register
router.post("/", login); // POST /login
router.post("/register", registerUser); // POST /login/register

// Admin login
router.post("/admin", login); // POST /login/admin

export default router;
