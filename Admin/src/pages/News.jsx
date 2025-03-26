import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../baseUrl";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

function News() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [oldImages, setOldImages] = useState([]); // Store existing images
  const [newImages, setNewImages] = useState([]);
  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getnews/${id}`);
        setNews(response.data.news);
        setUpdatedTitle(response.data.news.title);
        setUpdatedDescription(response.data.news.description);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseUrl}/deletenews/${id}`);
      alert("News deleted successfully");
      navigate("/"); // Redirect to home or another page
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news");
    }
  };

  const handleUpdate = async () => {
    setUpdateLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", updatedTitle);
      formData.append("description", updatedDescription);

      oldImages.forEach((image) => {
        formData.append("oldImages", image); // Append images to FormData
      });

      newImages.forEach((image) => {
        formData.append("newImages", image);
      });

      await axios.put(`${baseUrl}/updatenews/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("News updated successfully");
      setIsEditing(false);
      window.location.reload();
    } catch (error) {
      console.error("Error updating news:", error);
      alert("Failed to update news");
    } finally {
      setUpdateLoading(false);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!news) return <p className="text-center text-red-500">News not found!</p>;

  return (
    <div className=" min-h-[90vh] w-full flex items-start justify-center bg-orange-100">
      <div className="w-[50%] h-full flex flex-col p-4 items-start">
        {isEditing ? (
          <div className="w-full">
            <div>
              <p>Title</p>
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p>Description</p>
              <ReactQuill
                value={updatedDescription}
                onChange={ setUpdatedDescription}
                className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Description"
                modules={quillModules}
                formats={quillFormats}
                theme="snow"
              />
            </div>
            <div>
              <p>Images (optional)</p>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setNewImages([...newImages, ...Array.from(e.target.files)])
                }
              />
            </div>

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded-md"
            >
              {updateLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
                    />
                  </svg>
                  Updateing...
                </div>
              ) : (
                "Save Changes"
              )}
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
            <h1 className="text-2xl md:text-4xl font-bold text-amber-800 mb-8">
              {news.title}
            </h1>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(news.description) }} className="text-gray-700"></div>
            <p className="text-xs text-gray-500 ml-4">
              Published on: {new Date(news.createdAt).toLocaleDateString()}
            </p>
          </>
        )}

        <div className="mt-4 ml-4 grid grid-flow-col grid-cols-4 gap-4">
          {news.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              className="h-24 md:h-32"
              alt={`News ${index + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default News;
