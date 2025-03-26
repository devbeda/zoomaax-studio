import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Quill styles

const quillModules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike"],
    [{ align: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "list",
  "bullet",
  "bold",
  "italic",
  "underline",
  "strike",
  "align",
  "link",
  "image",
];

const contentTypes = [
  "web_series",
  "serial",
  "music_video",
  "movie",
  "reality_show",
  "sports",
  "short_film",
];
const genresList = [
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "music",
  "mystery",
  "romance",
  "science_fiction",
  "tv_movie",
  "thriller",
  "war",
  "western",
];
const statuses = ["past", "running", "upcoming"];

function Content() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  // Form Fields
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedType, setUpdatedType] = useState("");
  const [updatedStatus, setUpdatedStatus] = useState("");
  const [updatedLanguages, setUpdatedLanguages] = useState("");
  const [updatedGenres, setUpdatedGenres] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [oldVideo, setOldVideo] = useState("");
  const [newVideo, setNewVideo] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcontent/${id}`);
        if (!response.data || !response.data.content) {
          console.error("No content received from API");
          return;
        }
        console.log(response);

        const data = response.data.content;
        setContent(data);
        setUpdatedTitle(data.title);
        setUpdatedDescription(data.description);
        setUpdatedType(data.type);
        setUpdatedStatus(data.status);
        setUpdatedLanguages(data.language.split(",").map(lang => lang.trim()));        
        setOldImages(data.Images || []);
        setOldVideo(data.video || "");
        setVideoUrl(data.videoUrl || "");
      } catch (error) {
        console.error("Error fetching content:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);
  console.log(content);

  const extractYouTubeID = (url) => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/))([^?&]+)/
    );
    return match ? match[1] : null;
  };

  const videoId = extractYouTubeID(videoUrl);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this content?"))
      return;
    try {
      const response = await axios.delete(`${baseUrl}/deletecontent/${id}`);
      if (response.status === 200) {
        alert("Content deleted successfully!");
        navigate("/");
      } else {
        alert("Failed to delete content.");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      alert("Failed to delete content.");
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", updatedTitle);
      formData.append("description", updatedDescription);
      formData.append("type", updatedType);
      formData.append("status", updatedStatus);
      formData.append("videoUrl", videoUrl);

      // Append languages and genres
      updatedLanguages
        .split(",")
        .forEach((lang) => formData.append("languages[]", lang.trim()));
      updatedGenres.forEach((genre) => formData.append("genres[]", genre));

      // Append old images
      oldImages.forEach((image) => {
        formData.append("oldImages", image);
      });

      // Append new images
      newImages.forEach((image) => {
        formData.append("images", image);
      });

      // Append new video if selected
      if (newVideo) {
        formData.append("video", newVideo);
      }

      const response = await axios.put(
        `${baseUrl}/updatecontent/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.status === 200) {
        alert("Content updated successfully!");
        setIsEditing(false);
        window.location.reload();
      } else {
        alert("Failed to update content.");
      }
    } catch (error) {
      console.error("Error updating content:", error);
      alert("Failed to update content.");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!content)
    return <p className="text-center text-red-500">Content not found!</p>;

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-orange-100">
      <div className="w-[50%] h-full flex flex-col p-4 items-start">
        {isEditing ? (
          <div className="w-full flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <p>Title:</p>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Title"
              />
            </div>

            <div className="flex items-center gap-2">
              <p>Description:</p>
              <ReactQuill
                value={updatedDescription}
                onChange={setUpdatedDescription}
                className="w-full mt-2 px-4 py-2 border border-gray-300 bg-white rounded-md"
                placeholder="Description"
                modules={quillModules}
                formats={quillFormats}
                theme="snow"
              />
            </div>

            <div className="flex items-center gap-2">
              <p>Type: </p>
              <select
                value={updatedType}
                onChange={(e) => setUpdatedType(e.target.value)}
                className="w-full px-4 py-2 border"
              >
                {contentTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <p>Status: </p>
              <select
                value={updatedStatus}
                onChange={(e) => setUpdatedStatus(e.target.value)}
                className="w-full px-4 py-2 border"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <p>Language: </p>
              <input
                type="text"
                value={updatedLanguages}
                onChange={(e) => setUpdatedLanguages(e.target.value)}
                className="w-full px-4 py-2 border"
                placeholder="Ex: Odia"
              />
            </div>

            <div className="flex items-center gap-2">
              <p>Genre:</p>
              <select
                multiple
                value={updatedGenres}
                onChange={(e) =>
                  setUpdatedGenres(
                    [...e.target.selectedOptions].map((o) => o.value)
                  )
                }
                className="w-full px-4 py-2 border"
              >
                {genresList.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <p>VideoUrl:</p>
              <input
                type="text"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2 border"
                placeholder="YouTube Video URL"
              />
            </div>

            <div className="flex items-center gap-2 ">
              <p>Video File:</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setNewVideo(e.target.files[0])}
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
            >
              {updateLoading ? "Updating..." : "Save Changes"}
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="ml-2 text-red-500"
            >
              Cancel
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-amber-800 mb-8">
              {content.title}
            </h1>
            <div className="flex justify-center items-center gap-1">
              <h3>Language: </h3>
              <p>{content.language}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content.description) }} className="text-gray-700"></div>

            {videoId && (
              <iframe
                className="mt-4"
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${videoId}`}
                frameBorder="0"
                allowFullScreen
              ></iframe>
            )}

            {oldVideo && (
              <video className="mt-4" width="560" controls>
                <source src={oldVideo} type="video/mp4" />
              </video>
            )}

            <div className="flex">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 ml-4"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Content;
