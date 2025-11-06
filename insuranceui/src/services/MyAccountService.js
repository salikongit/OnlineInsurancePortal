// src/services/MyAccountService.js
import axios from "axios";

// Base URL for backend (adjust if needed)


// 🧩 Fetch user purchases
export async function getUserPurchases(userId) {
    try {

        const response = await axios.get(`http://localhost:7000/purchase/user/${userId}`);



        // Ensure we always return an array
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error(" Error fetching user purchases:", error);
        return [];
    }
}
