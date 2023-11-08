import mongoose from "mongoose";

const sortedEventSchema = new mongoose.Schema({
  sortedDate: {
    type: Date,
    required: true,
  },
  material: {
    type: String,
    enum: ["Nets", "Foam", "Cylinders"],
    required: true,
  },
  island: {
    type: String,
    enum: ["Oahu", "Maui", "Big Island", "NWHI", "At-sea Offshore"],
    required: true,
  },
  mass: {
    type: Number,
    required: true,
  },
  polymers: {
    type: String,
    enum: ["EVA", "NYLON", "HDPE", "OTHER"],
    required: true,
  },
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  disposalDate: {
    type: Date,
  },
  disposalMechanism: {
    type: String,
    enum: [
      "Repurposed for Infrastructure",
      "Repurposed for research",
      "Repurposed for academia",
      "Stored for future reuse",
      "Burned for power",
      "Landfill",
      "Burned",
      "Left in environment",
    ],
  },
});

const SortedEvent =
  mongoose.models.SortedEvent ||
  mongoose.model("SortedEvent", sortedEventSchema);

export default SortedEvent;