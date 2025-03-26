import mongoose from "mongoose";

const castingSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Casting = mongoose.model("Casting", castingSchema);
