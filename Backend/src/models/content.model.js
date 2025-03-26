import mongoose from "mongoose";

const contentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type:{
    type: String,
    required:true,
    enum: ["web series", "serial", "music video", "movie","reality show", "sports", "short film"]
  },
  language:{
    type: String,
    required: true,
  },
  genres:{
    type: [String],
    enum: ["action", "adventure", "animation", "comedy", "crime", "documentary", "drama", "family", "fantasy", "history", "music", "mystery", "romance", "science_fiction", "tv_movie", "thriller", "war", "western"]
  },
  status: {
    type: String,
    enum: ["past", "running", "upcoming"],
    default: "active",
  },
  video:{
    type: String,
  },
  videoUrl: {
    type: String,
  },
  Images: [
    {
      type: String,
    },
  ],
  
  date:{
    type: Date,
    default: Date.now,
  }
});

export const Content = mongoose.model("Content", contentSchema);