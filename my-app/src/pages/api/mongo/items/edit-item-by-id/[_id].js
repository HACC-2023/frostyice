import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    if (req.method === "PUT") {
      const { _id } = req.query;
      const { name, description, price } = await req.body;
      await connectDB();
      await Item.findByIdAndUpdate(_id, {
        name,
        description,
        price,
      });
      res.status(200).json({ msg: "Item updated successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to update item." });
  }
}
