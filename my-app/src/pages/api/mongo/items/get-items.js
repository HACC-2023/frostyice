import connectDB from "@/lib/mongodb";
import Item from "@/models/item";

export default async function handler(req, res) {
  try {
    await connectDB();
    console.log("sending req get items");
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch items." });
  }
}
