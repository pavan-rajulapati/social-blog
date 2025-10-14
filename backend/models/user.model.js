import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
  preferences: { type: Object },
});

const UserSchema = mongoose.model("User", userSchema)


