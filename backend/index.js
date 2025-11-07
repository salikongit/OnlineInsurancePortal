import express from "express";
import cors from "cors";
import { connectDb } from "./src/configs/dbconfigs.js";
import { registerUser } from "./src/controller/UserController.js";
import { login } from "./src/controller/LoginController.js";
import { adminLogin, getAllUsers, getUserPolicies } from "./src/controller/AdminController.js";
import { verifyToken } from "./src/Middleware/VerifyToken.js";
import { addPolicy, getPolicies } from "./src/controller/PolicyController.js";
import ClaimRoutes from "../backend/src/Routes/ClaimRoutes.js";
import PolicyRoutes from "../backend/src/Routes/PolicyRoutes.js"
import AdminRoutes from "../backend/src/Routes/AdminRoutes.js"
import purchaseRoutes from "./src/Routes/PurchaseRoutes.js";


const app = express();


app.use(cors({
    origin: "http://localhost:5173",   
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());
app.use(cors());

app.use("/admin", AdminRoutes);
app.use("/policy", PolicyRoutes);
app.use("/claims", ClaimRoutes);
app.use("/purchase", purchaseRoutes);
console.log(" Purchase routes active at /purchase");


app.post("/register", registerUser);             // chal rha
app.post("/login", login);                       // chal rha
app.post("/admin/addpolicy", addPolicy);         // chal rha
app.post("/admin/login", adminLogin);
app.get("/admin/getusers", verifyToken, getAllUsers);  // chal rha
app.get("/admin/userpolicies", getUserPolicies);       // chal rha


// //  Start Server
// app.listen(7000, () => {
//     connectDb();
//     console.log(" Server running on port 7000");
// });


const startServer = async () => {
    try {
        await connectDb(); 
        console.log(" Database connected");

        app.listen(7000, () => {
            console.log(" Server running on port 7000");
        });
    } catch (error) {
        console.error("Failed to connect to DB:", error);
    }
};

startServer();
