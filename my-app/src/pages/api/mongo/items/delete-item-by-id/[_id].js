import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    const { _id } = req.query;
    await connectDB();
    const data = await Item.findByIdAndRemove(_id);
    res.status(200).json({ msg: "Item deleted successfully!" });
  } catch(error) {
    res.status(500).json({ error: "Unable to delete item." });
  }
}