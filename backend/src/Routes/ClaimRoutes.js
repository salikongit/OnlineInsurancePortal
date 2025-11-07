import express from "express";
import {
    submitClaim,
    getUserClaims,
    getAllClaims,
    updateClaimStatus,
} from "../controller/ClaimController.js";

const router = express.Router();

// User submits a new claim
router.post("/submit", submitClaim);

// User views their own claims
router.get("/user/:user_id", getUserClaims);

// Admin views all claims
router.get("/all", getAllClaims);

// Admin updates a claim's status
router.put("/update/:id", updateClaimStatus);

export default router;
