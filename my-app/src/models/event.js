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
  publicTypeOther: {
    type: String,
  },
  publicContainerFullness: {
    type: String,
    enum: [
      "Did not find a container/drum/cylinder",
      "Full",
      "Partially Emptied",
      "Empty",
    ],
  },
  publicClaimBoat: {
    type: String,
    enum: ["Yes", "No"],
  },
  publicBiofoulingRating: {
    type: String,
    required: true,
    enum: [
      "1 - No algae or marine life at all",
      "2",
      "3",
      "4",
      "5",
      "6 - Patches of dense algae and presence of barnacle colonies",
      "7",
      "8",
      "9",
      "10 - Abundant, healthy growth of algae and barnacles covering submerged areas",
    ],
  },
  publicLocationDesc: {
    type: String,
    required: true,
    enum: [
      "At sea, BEYOND three miles from nearest land",
      "At sea, WITHIN three miles of nearest land",
      "In the shore break",
      "On the beach BELOW the high wash of the waves",
      "On the beach ABOVE the high wash of the waves",
      "None of the above, a description follows below",
    ],
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
    enum: [
      "Caught on the reef or is partially buried in sand",
      "Loose in the shore break or on the shoreline and could go back out to sea",
      "Trapped in a tide pool and cannot escape",
      "Loose on the shore but caught in the vegetation line",
      "Tied to a fixed object so it cannot be swept away",
      "Pushed inland above the high wash of the waves so it cannot be swept away",
      "Other - please explain how urgent recovery/removal is",
    ],
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
