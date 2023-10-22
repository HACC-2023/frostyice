import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: true,
    default: "user"
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
