import { ROLES } from "../constants/RoleConstants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getConnectionObject } from "../configs/dbconfigs.js"

export async function login(req, res) {
    try {
        const connection = getConnectionObject();
        const { email, password, role } = req.body;
        const tableName = role === ROLES.ADMIN ? "admins" : "users";
        console.log("Login attempt:", { email, role, tableName });
        const [rows] = await connection.query(
            `SELECT * FROM ${tableName} WHERE email = ?`,
            [email]
        );
        console.log("Query result:", rows);
        if (rows.length === 0) {
            return res.status(400).json({ message: "Email not found" });
        }
        const user = rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign(
            {
                id: role === ROLES.ADMIN ? user.admin_id : user.user_id,
                role,
            },
            "user1234",
            { expiresIn: "2h" }
        );
        const userData = {
            id: role === ROLES.ADMIN ? user.admin_id : user.user_id,
            name: user.name,
            email: user.email,
            role,
        };
        res.status(200).json({
            message: "Login successful",
            token,
            user: userData, 
        });
    } catch (error) {
        console.error(" Login error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
}
