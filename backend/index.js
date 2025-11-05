import express from "express";
import { connectDb } from "./src/configs/dbconfigs.js";
import { registerUser } from "./src/controller/UserController.js";
import { login } from "./src/controller/LoginController.js";
import { getAllUsers, getUserPolicies } from "./src/controller/AdminController.js";
import { verifyToken } from "./src/Middleware/VerifyToken.js";
import { addPolicy, getPolicies } from "./src/controller/PolicyController.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", registerUser);                                   //works
app.post("/login", login);                                             //works
app.post("/admin/addpolicy", addPolicy);                               //works

app.get("/admin/getusers",verifyToken, getAllUsers);                   //works
app.get("/admin/userpolicies", getUserPolicies);                       //works
app.get("/getpolicies", getPolicies);                                  //works

app.listen(7000, () => {
    connectDb();
});