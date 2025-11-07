import axios from "axios";




export async function getUserPurchases(userId) {
    try {

        const response = await axios.get(`http://localhost:7000/purchase/user/${userId}`);



        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error(" Error fetching user purchases:", error);
        return [];
    }
}
