import mongoose from "mongoose";

const teamSchema = mongoose.Schema(
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

export const Team = mongoose.model("Team", teamSchema);
