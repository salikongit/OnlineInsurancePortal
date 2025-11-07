import { hashSync } from "bcrypt";
import { getConnectionObject } from "../configs/dbconfigs.js";


export async function registerUser(request, response) {
  try {
    const connection = getConnectionObject();
    const { name, email, password, phone, address } = request.body;
    const encryptedPassword = hashSync(password, 12);
    const qry = `INSERT INTO users (name, email, password, phone, address) VALUES ('${name}', '${email}', '${encryptedPassword}', '${phone}', '${address}')`;
    const [result] = await connection.query(qry);
    if (result.affectedRows === 1) {
      response.status(201).send({ message: "User registered successfully!" });
    } else {
      response.status(500).send({ message: "User registration failed" });
    }
  } catch (error) {
    console.log(error);
    if (error.errno === 1062)
      response.status(400).send({ message: "User with this email already exists" });
    else
      response.status(500).send({ message: "Something went wrong" });
  }
}

// Get user profile
export async function getUserProfile(req, res) {
  const user_id = req.params.user_id;
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM users WHERE user_id=?", [user_id]);
    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

