import mongoose from "mongoose";

// subdocument schema
const publicContactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
});

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
  publicType: {
    type: String,
    required: true,
  },
  publicTypeOther: {
    type: String,
  },
  publicContainerFullness: {
    type: String,
  },
  publicClaimBoat: {
    type: String,
    enum: ["Yes", "No"],
  },
  publicBiofoulingRating: {
    type: String,
    required: true,
  },
  publicLocationDesc: {
    type: String,
    required: true,
  },
  publicLatLongOrPositionDescription: {
    type: String,
  },
  nearestIsland: {
    type: String,
    required: true,
    enum: [
      "Big Island",
      "Maui",
      "Molokai",
      "Lanai",
      "Kahoolawe",
      "Oahu",
      "Kauai",
      "Niihau",
      "NWHI",
      "At-sea Offshore"
    ],
  },
  nearestLandmark: {
    type: String,
  },
  debrisLandmarkRelativeLocation: {
    type: String,
  },
  publicDebrisDesc: {
    type: String,
    required: true,
  },
  publicDebrisAdditionalDesc: {
    type: String,
  },
  publicContact: publicContactSchema,
  imageUrl: {
    type: String,
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
    type: Number,
    trim: true,
  },
  assessedEnvDamage: {
    type: String,
    trim: true,
  },
});

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);

export default Event;
