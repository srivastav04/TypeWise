import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  scores: {
    type: [Number],
    default: [],
  },
  averageScore: {
    type: Number,
    default: 0,
  },
  totalTests: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
    default: "https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=default",
  },
});

const User = mongoose.model("User", userSchema);
export default User;
