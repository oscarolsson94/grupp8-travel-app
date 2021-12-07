import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    _id: { type: Schema.ObjectId, auto: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
