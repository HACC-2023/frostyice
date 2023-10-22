import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const { name, description, price } = await req.body;
      await connectDB();
      await Item.create({
        name,
        description,
        price,
      });
    }
    res.status(200).json({ msg: "Item added successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Unable to add item to database." });
  }
}
