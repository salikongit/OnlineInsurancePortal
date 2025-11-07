import { getConnectionObject } from "../configs/dbconfigs.js";

// Get all policies
export async function getPolicies(req, res) {
  try {
    const db = getConnectionObject();
    console.log(" DB object:", db ? "Available" : "NULL")
    const [rows] = await db.query("SELECT * FROM policies");
    console.log(" Rows from DB:", rows);

    res.json(rows);
  } catch (err) {
    console.error(" getPolicies error:", err);
    res.status(500).json({ error: err.message });
  }
}


// Buy a policy
export async function buyPolicy(req, res) {
  try {
    const { user_id, policy_id } = req.body;

    if (!user_id || !policy_id) {
      return res.status(400).json({ message: "Missing user_id or policy_id" });
    }

    const db = getConnectionObject();
    await db.query(
      "INSERT INTO user_policies (user_id, policy_id, status) VALUES (?, ?, 'active')",
      [user_id, policy_id]
    );

    res.json({ message: "Policy purchased successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}

// Get policy by ID
export async function getPolicyById(req, res) {
  try {
    const db = getConnectionObject();
    const [rows] = await db.query("SELECT * FROM policies WHERE policy_id=?", [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: "Policy not found" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin adds a new policy
export async function addPolicy(req, res) {
  const { policy_name, short_desc, long_desc, premium_amount, duration_years } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "INSERT INTO policies (policy_name, short_desc, long_desc, premium_amount, duration_years) VALUES (?,?,?,?,?)",
      [policy_name, short_desc, long_desc, premium_amount, duration_years]
    );
    res.json({ message: "Policy added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin updates a policy
export async function updatePolicy(req, res) {
  const { id } = req.params;
  const { policy_name, short_desc, long_desc, premium_amount, duration_years } = req.body;
  try {
    const db = getConnectionObject();
    await db.query(
      "UPDATE policies SET policy_name=?, short_desc=?, long_desc=?, premium_amount=?, duration_years=? WHERE policy_id=?",
      [policy_name, short_desc, long_desc, premium_amount, duration_years, id]
    );
    res.json({ message: "Policy updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Admin deletes a policy
export async function deletePolicy(req, res) {
  try {
    const db = getConnectionObject();
    await db.query("DELETE FROM policies WHERE policy_id=?", [req.params.id]);
    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
