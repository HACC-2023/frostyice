import mongoose, { Schema } from "mongoose";

const organizationSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    enum: ["Oahu", "Maui", "Big Island", "Kauai"],
    required: true,
  }
});

const Organization = mongoose.models.Organization ||mongoose.model("Organization", organizationSchema);
export default Organization;
