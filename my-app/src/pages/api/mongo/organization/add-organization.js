import connectDB from "@/lib/mongodb";
import Organization from "@/models/organization";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, location } = await req.body;
      await connectDB();
      await Organization.create({
        name,
        location
      });
    }
    res.status(200).json({ msg: "Item added successfully!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error: "Unable to add item to database." });
  }
}
