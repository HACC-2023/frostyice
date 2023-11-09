import connectDB from "@/lib/mongodb";
import Event from "@/models/event";
import mongoose from "mongoose";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const { _id } = req.query;
      console.log(_id)
      const events = await Event.find({ _id: '654cb44cb6d9313189dfaa1a' });
      console.log(events)
      res.status(200).json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Helpful error message" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
