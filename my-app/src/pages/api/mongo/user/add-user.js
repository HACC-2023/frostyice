import connectDB from "@/lib/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { firstName, lastName, email, role, password, orgId } = await req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      await connectDB();
      await User.create({
        firstName,
        lastName,
        email,
        role,
        password: hashedPassword,
        orgId,
      });
    }
    res.status(200).json({ msg: "User added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Unable to add user to database." });
  }
}
