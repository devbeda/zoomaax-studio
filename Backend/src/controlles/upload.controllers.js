import { request } from "http";
import mongoose from "mongoose";
import { Content } from "../models/content.model.js";
import fs from "fs";
import cloudinary from "../utils/cloudinary.js";
import { News } from "../models/news.models.js";
import { Event } from "../models/events.model.js";
import { log } from "console";
import { Casting } from "../models/casting.models.js";
import { Team } from "../models/ourteam.models.js";


export const uploadContent = async (req, res) => {
  try {
    const { title, description, type, language, genres, status, videoUrl, date } = req.body;

    // Validate content type
    const validTypes = ["web series", "serial", "music video", "movie", "reality show", "sports", "short film"];
    if (!validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid content type." });
    }

    // Validate genres (if provided)
    const validGenres = [
      "action", "adventure", "animation", "comedy", "crime", "documentary", "drama", "family", "fantasy",
      "history", "music", "mystery", "romance", "science_fiction", "tv_movie", "thriller", "war", "western"
    ];

    let selectedGenres = [];
    if (genres) {
      selectedGenres = Array.isArray(genres) ? genres : genres.split(",");
      selectedGenres = selectedGenres.filter((genre) => validGenres.includes(genre)); // Remove invalid genres
    }

    // Upload thumbnail (required)
    let thumbnailUrl = "";
    console.log("Thumbnail MIME Type:", req.files?.thumbnail[0]?.mimetype);

    if (req.files?.thumbnail) {
      const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
        folder: "content_thumbnails",
        resource_type: "image",
        allowed_formats: ["jpg", "jpeg", "png"]   
      });
      thumbnailUrl = thumbnailResult.secure_url;
    } else {
      return res.status(400).json({ message: "Thumbnail is required." });
    }
    fs.unlinkSync(req.files.thumbnail[0].path);


    // Upload video (optional)
    let videoFileUrl = "";
    if (req.files?.video) {
      const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
        resource_type: "video",
        folder: "content_videos",
      });
      videoFileUrl = videoResult.secure_url;
    }
    fs.unlinkSync(req.files.video[0].path);

    // Upload images (optional)
    let imageUrls = [];
    if (req.files?.images) {
      for (let img of req.files.images) {
        const imgResult = await cloudinary.uploader.upload(img.path, {
          folder: "content_images",
          resource_type: "image",
          allowed_formats: ["jpg", "jpeg", "png"] 
        });
        imageUrls.push(imgResult.secure_url);
      }
    }
    if (req.files?.images) {
      req.files.images.forEach((img) => fs.unlinkSync(img.path));
    }

    // Create new content
    const newContent = new Content({
      title,
      description,
      type,
      language,
      genres: selectedGenres, // If genres are not provided, it will be an empty array
      status,
      date: date || new Date(),
      thumbnail: thumbnailUrl,
      video: videoFileUrl || null,
      videoUrl: videoUrl || null,
      Images: imageUrls,
    });

    await newContent.save();
    res.status(201).json({ message: "Content uploaded successfully", content: newContent });

  } catch (error) {
    fs.unlinkSync(req.files.thumbnail[0].path);
      if (req.files?.video) fs.unlinkSync(req.files.video[0].path);
      if (req.files?.images) {
        req.files.images.forEach((img) => fs.unlinkSync(img.path));
      }
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error, failed to upload content. Try again!" });
  }
};


export const getAllContent = async (req, res) => {
  try {
    const contents = await Content.find({});
    res.status(200).json({ message: "content fetched successfully", contents });
  } catch (error) {
    console.error("Error getting content:", error);
    res.status(500).json({
      message: "Server Error while getting the conent ",
      error: error.message,
    });
  }
};

export const getContentById = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content fetched successfully", content });
  } catch (error) {
    console.error("Error getting content:", error);
    res.status(500).json({
      message: "Server Error while getting the conent ",
      error: error.message,
    });
  }
};

export const updateContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const { title, description, type, language, genres, status, date, videoUrl } = req.body;

    if (!mongoose.Types.ObjectId.isValid(contentId)) {
      return res.status(400).json({ message: "Invalid content ID." });
    }

    const content = await Content.findById(contentId);
    if (!content) {
      return res.status(404).json({ message: "Content not found." });
    }

    // Validate content type
    const validTypes = ["web_series", "serial", "music_video", "movie", "reality_show", "sports", "short_film"];
    if (type && !validTypes.includes(type)) {
      return res.status(400).json({ message: "Invalid content type." });
    }

    // Validate genres
    const validGenres = [
      "action", "adventure", "animation", "comedy", "crime", "documentary", "drama", "family", "fantasy",
      "history", "music", "mystery", "romance", "science_fiction", "tv_movie", "thriller", "war", "western"
    ];
    const selectedGenres = Array.isArray(genres) ? genres : genres?.split(",");
    if (genres && selectedGenres.some((genre) => !validGenres.includes(genre))) {
      return res.status(400).json({ message: "Invalid genres selected." });
    }

    

    // Upload new thumbnail if provided
    let thumbnailUrl = content.thumbnail;
    if (req.files?.thumbnail) {
      const thumbnailResult = await cloudinary.uploader.upload(req.files.thumbnail[0].path, {
        folder: "content_thumbnails",
      });
      thumbnailUrl = thumbnailResult.secure_url;
    }
    fs.unlinkSync(req.files.thumbnail[0].path);

    // Upload new video if provided
    let videoFileUrl = content.video;
    if (req.files?.video) {
      const videoResult = await cloudinary.uploader.upload(req.files.video[0].path, {
        resource_type: "video",
        folder: "content_videos",
      });
      videoFileUrl = videoResult.secure_url;
    }
    fs.unlinkSync(req.files.video[0].path);

    // Upload new images if provided
    let imageUrls = content.Images;
    if (req.files?.images) {
      imageUrls = [];
      for (let img of req.files.images) {
        const imgResult = await cloudinary.uploader.upload(img.path, {
          folder: "content_images",
        });
        imageUrls.push(imgResult.secure_url);
      }
    }
    if (req.files?.images) {
      req.files.images.forEach((img) => fs.unlinkSync(img.path));
    }

    // Update content fields
    content.title = title || content.title;
    content.description = description || content.description;
    content.type = type || content.type;
    content.language = language || content.language;
    content.genres = selectedGenres || content.genres;
    content.status = status || content.status;
    content.date = date || content.date;
    content.thumbnail = thumbnailUrl;
    content.video = videoFileUrl || content.video;
    content.videoUrl = videoUrl || content.videoUrl;
    content.Images = imageUrls;

    await content.save();

    res.status(200).json({ message: "Content updated successfully", content });

  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ message: "Server error, failed to update content. Try again!" });
  }
};

export const deleteContent = async (req, res) => {
  try {
    const contentId = req.params.id;
    const deleteContent = await Content.findByIdAndDelete(contentId);

    if (!deleteContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json({ message: "Content deleted successfully" });
  } catch (error) {
    console.error("Error deleting content", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Event handlers
export const uploadEvent = async (req, res) => {
  const { eventName, description, date, location } = req.body;
  try {
    if (!eventName || !description || !location) {
      return res
        .status(400)
        .json({
          message: "Event name, description, and location are required.",
        });
    }

    if (!req.file) {
      return res.status(400).json({ messge: "Thumbnail is required" });
    }

    // Upload thumbnail to Cloudinary

    const thumbnailResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "event_thumbnails",
    });
    fs.unlinkSync(req.file.path);

    const newEvent = new Event({
      eventName,
      description,
      date,
      location,
      thumbnail: thumbnailResult.secure_url,
    });
    await newEvent.save();
    try {
      fs.unlinkSync(req.file.path);
    } catch (error) {
      console.error("Error deleting temp files: ", error);
    }
    res
      .status(200)
      .json({ message: "Thumbnail successfully uploaded", event: newEvent });
  } catch (error) {
    console.error("Error uploading event", error);
    res.status(500).json({
      message: "Server Error while uploading the event ",
      error: error.message,
    });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).json({ message: "events fetched successfully", events });
  } catch (error) {
    console.error("Error getting events:", error);
    res.status(500).json({
      message: "Server Error while getting the events ",
      error: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event fetched successfully", event });
  } catch (error) {
    console.error("Error getting event:", error);
    res.status(500).json({
      message: "Server Error while getting the event ",
      error: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { eventName, description, date, location } = req.body;

    // Find event by ID
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Update Thumbnail if a new one is provided
    let updateThumbnail = event.thumbnail;
    if (req.files && req.files.thumbnail) {
      try {
        const file = req.files.thumbnail;
        const thumbnailResult = await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "event_thumbnails" }
        );
        updateThumbnail = thumbnailResult.secure_url;

        // Delete temp file
        fs.unlinkSync(file.tempFilePath);
      } catch (error) {
        console.error("Error uploading thumbnail: ", error);
      }
    }

    // Update event fields only if they are provided
    event.eventName = eventName || event.eventName;
    event.description = description || event.description;
    event.date = date ? new Date(date) : event.date;
    event.location = location || event.location;
    event.thumbnail = updateThumbnail;

    // Save the updated event
    await event.save();

    res.status(200).json({
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Error updating event: ", error);
    res.status(500).json({
      message: "Server Error while updating the event",
      error: error.message,
    });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      message: "Server Error while deleting the event ",
      error: error.message,
    });
  }
};

// news handellers
export const uploadNews = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    let imageUrls = [];

    if (req.files) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "news_images", // Set Cloudinary folder
        });

        imageUrls.push(result.secure_url);

        // Delete the file from local storage after successful upload
        fs.unlink(file.path, (err) => {
          if (err) console.error("Error deleting file:", err);
        });
      }
    }

    const newNews = new News({
      title,
      description,
      images: imageUrls,
    });

    await newNews.save();
    res.status(201).json({ message: "News added successfully", news: newNews });
  } catch (error) {
    console.error("Can't upload News", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({});
    res.status(200).json({ message: "News successfully fetched", news: news });
  } catch (error) {
    console.error("Can't fetch News", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await News.findById(newsId);
    if (!news) return res.status(404).json({ message: "News not found" });

    res.status(200).json({ message: "Your NEWS has been fetched", news: news });
  } catch (error) {
    console.error("Can't fetch News", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const { title, description, existingImages } = req.body;

    const updateNews = await News.findById(newsId);
    if (!updateNews) {
      return res.status(404).json({ message: "Content not found" });
    }
    let imageUrls = existingImages || updateNews.images;
    if (req.files && req.files.length > 0) {
      imageUrls = []; // Reset if new images are uploaded
      for (let img of req.files) {
        const imgResult = await cloudinary.uploader.upload(img.path, {
          folder: "content_images",
        });
        imageUrls.push(imgResult.secure_url);
      }
    }
    // console.log(imageUrls[1]);

    updateNews.title = title || updateNews.title;
    updateNews.description = description || updateNews.description;

    updateNews.images = imageUrls;

    await updateNews.save();

    res
      .status(200)
      .json({ message: "Content updated successfully", content: updateNews });
  } catch (error) {
    console.error("server error: " + error);
    res.status(500).json({ message: "Can't update yur content. TryAgain !" });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const newsId = req.params.id;
    const deleteNews = await News.findByIdAndDelete(newsId);
    if (!deleteNews) {
      return res.status(404).json({ message: "News not found" });
    }
    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    console.error("Error deleting content", error);
    res.status(500).json({ message: "Can't delete your news" });
  }
};

// Casting handellers

export const addCasting = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required." });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "casting_images",
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // Remove local file
    }

    const newCasting = new Casting({ name, role, image: imageUrl });
    await newCasting.save();

    res
      .status(201)
      .json({ message: "Casting added successfully", casting: newCasting });
  } catch (error) {
    console.error("Error adding casting:", error);
    res
      .status(500)
      .json({
        message: "Server error while adding casting",
        error: error.message,
      });
  }
};

export const getAllCasting = async (req, res) => {
  try {
    const castings = await Casting.find();
    res
      .status(200)
      .json({ message: "Castings fetched successfully", castings });
  } catch (error) {
    console.error("Error getting castings:", error);
    res
      .status(500)
      .json({
        message: "Server error while getting castings",
        error: error.message,
      });
  }
};

export const getCastById = async (req, res) => {
  try {
    const casting = await Casting.findById(req.params.id);
    if (!casting) {
      return res.status(404).json({ message: "Casting not found" });
    }
    res.status(200).json({ message: "Casting fetched successfully", casting });
  } catch (error) {
    console.error("Error getting casting:", error);
    res
      .status(500)
      .json({
        message: "Server error while getting casting",
        error: error.message,
      });
  }
};

export const updateCasting = async (req, res) => {
  try {
    const { name, role } = req.body;
    const casting = await Casting.findById(req.params.id);

    if (!casting) {
      return res.status(404).json({ message: "Casting not found" });
    }

    let updatedImage = casting.image;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "casting_images",
      });
      updatedImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    casting.name = name || casting.name;
    casting.role = role || casting.role;
    casting.image = updatedImage || casting.image;

    await casting.save();

    res.status(200).json({ message: "Casting updated successfully", casting });
  } catch (error) {
    console.error("Error updating casting:", error);
    res
      .status(500)
      .json({
        message: "Server error while updating casting",
        error: error.message,
      });
  }
};

export const deleteCasting = async (req, res) => {
  try {
    const casting = await Casting.findByIdAndDelete(req.params.id);

    if (!casting) {
      return res.status(404).json({ message: "Casting not found" });
    }

    res.status(200).json({ message: "Casting deleted successfully" });
  } catch (error) {
    console.error("Error deleting casting:", error);
    res
      .status(500)
      .json({
        message: "Server error while deleting casting",
        error: error.message,
      });
  }
};

// team Controllers

export const addTeam = async (req, res) => {
  try {
    const { name, role } = req.body;

    if (!name || !role) {
      return res.status(400).json({ message: "Name and role are required." });
    }

    let imageUrl = "";
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "team_images",
      });
      imageUrl = uploadResult.secure_url;
      fs.unlinkSync(req.file.path); // Remove local file
    }

    const newTeamMember = new Team({ name, role, image: imageUrl });
    await newTeamMember.save();

    res
      .status(201)
      .json({ message: "Team member added successfully", team: newTeamMember });
  } catch (error) {
    console.error("Error adding team member:", error);
    res
      .status(500)
      .json({
        message: "Server error while adding team member",
        error: error.message,
      });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    res.status(200).json({ message: "Teams fetched successfully", teams });
  } catch (error) {
    console.error("Error getting team members:", error);
    res
      .status(500)
      .json({
        message: "Server error while getting team members",
        error: error.message,
      });
  }
};

export const getTeamById = async(req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res
     .status(200)
     .json({ message: "Team member fetched successfully", team: teamMember });
  } catch (error) {
    console.error("Error getting team member:", error);
    res
     .status(500)
     .json({
        message: "Server error while getting team member",
        error: error.message,
      });
  }
}

export const updateTeam = async (req, res) => {
  try {
    const { name, role } = req.body;
    const teamMember = await Team.findById(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    let updatedImage = teamMember.image;
    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "team_images",
      });
      updatedImage = uploadResult.secure_url;
      fs.unlinkSync(req.file.path);
    }

    teamMember.name = name || teamMember.name;
    teamMember.role = role || teamMember.role;
    teamMember.image = updatedImage;

    await teamMember.save();

    res
      .status(200)
      .json({ message: "Team member updated successfully", team: teamMember });
  } catch (error) {
    console.error("Error updating team member:", error);
    res
      .status(500)
      .json({
        message: "Server error while updating team member",
        error: error.message,
      });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const teamMember = await Team.findByIdAndDelete(req.params.id);

    if (!teamMember) {
      return res.status(404).json({ message: "Team member not found" });
    }

    res.status(200).json({ message: "Team member deleted successfully" });
  } catch (error) {
    console.error("Error deleting team member:", error);
    res
      .status(500)
      .json({
        message: "Server error while deleting team member",
        error: error.message,
      });
  }
};
