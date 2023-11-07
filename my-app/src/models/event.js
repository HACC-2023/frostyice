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
      "Event Reported",
      "Removal and Storage",
      "Sorting",
      "Disposal",
      "Complete",
    ],
  },
  reportedDate: {
    type: Date,
    default: new Date(),
  },
  publicType: {
    type: String,
    required: true,
  },
  publicTypeDesc: {
    // if the public type is "other" or if the reported wants to add more details
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
    type: Number,
    required: true,
  },
  publicLocationDesc: {
    type: String,
    required: true,
  },
  publicLatLongOrPositionDesc: {
    // this is the free text field on DOBOR form where reporter can enter lat/long or position description
    type: String,
  },
  mapLat: {
    // the lat from the embedded map
    type: Number,
  },
  mapLong: {
    type: Number,
  },
  closestIsland: {
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
  closestLandmark: {
    type: String,
  },
  debrisLandmarkRelativeLocation: {
    type: String,
  },
  publicDebrisEnvDesc: {
    // caught in reef, loose on shore, etc
    type: String,
    required: true,
  },
  publicDebrisEnvAdditionalDesc: {
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
