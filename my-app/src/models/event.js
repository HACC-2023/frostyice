import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  status: {
    type: String,
    required: true,
    enum: [
      "Reported",
      "Removed & Stored",
      "Multievent Transport",
      "Sorted",
      "Disposed",
    ],
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  detectedLocation: {
    type: String,
    required: true,
    enum: ["Oahu", "Maui", "Big Island", "NWHI", "At-sea Offshore"],
  },
  publicDesc: {
    type: String,
    required: true,
    enum: [
      "A mass of netting and/or fishing gear",
      "An abandoned/derelict vessel",
      "A container/drum/cylinder",
      "A large concentration of plastics",
      "Potential Japan tsunami marine debris",
      "A large concentration of miscellaneous trash",
      "Other",
    ],
  },
  publicEnvDamage: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  approxSize: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  dibsBy: {
    type: String,
    trim: true,
  },
  removedBy: {
    type: String,
    trim: true,
  },
  removalStartDate: {
    type: Date,
  },
  removalEndDate: {
    type: Date,
  },
  debrisSize: {
    type: Number,
    trim: true,
  },
  debrisMass: {
    type: Number,
    trim: true,
  },
  tempStorage: {
    type: String,
    trim: true,
  },
  assessedEnvDamage: {
    type: String,
    trim: true,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
