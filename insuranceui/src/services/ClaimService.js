
import axios from "axios";

const BASE_URL = "http://localhost:7000/claims";

export async function submitClaim(claimData) {
    try {
        const response = await axios.post(`${BASE_URL}/submit`, claimData);
        console.log(" Claim submitted:", response.data);
        return response.data;
    } catch (error) {
        console.error("Error submitting claim:", error);
        throw error.response?.data || { error: "Failed to submit claim" };
    }
}

export async function getUserClaims(userId) {
    try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error(" Error fetching user claims:", error);
        throw error.response?.data || { error: "Failed to load user claims" };
    }
}
