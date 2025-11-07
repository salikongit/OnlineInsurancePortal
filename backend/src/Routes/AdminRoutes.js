import express from "express";
import { verifyToken } from "../Middleware/VerifyToken.js";
import { getAllUsers, getUserPolicies, getUserClaims } from "../controller/AdminController.js";
import { addPolicy } from "../controller/PolicyController.js";
import { login } from "../controller/LoginController.js";
import { getAllClaims, updateClaimStatus } from "../controller/ClaimController.js";
import { getDashboardStats } from "../controller/AdminController.js"

const router = express.Router();

// Admin login
router.post("/login", login);

// Admin-only routes (protected)
router.get("/admin/getusers", verifyToken, getAllUsers);
router.get("/userpolicies/:user_id", verifyToken, getUserPolicies);
router.get("/userclaims/:user_id", verifyToken, getUserClaims);

// Policy management (admin adds policy)
router.post("/addpolicy", verifyToken, addPolicy);

// Claim management (admin only)
router.get("/claims", verifyToken, getAllClaims);
router.put("/claims/:id", verifyToken, updateClaimStatus);
router.get("/dashboard-stats", getDashboardStats);


export default router;
