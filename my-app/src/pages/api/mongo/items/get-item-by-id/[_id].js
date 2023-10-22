import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    const { _id } = req.query;
    console.log("id: ", _id);
    await connectDB();
    const item = await Item.findById(_id);
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch item." });
  }
}
