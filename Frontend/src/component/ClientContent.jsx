import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url.js";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineSpeakerWave } from "react-icons/hi2";
import DOMPurify from "dompurify";

function ClientContent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getcontent/${id}`);
        console.log("API Response:", response.data); // Debugging

        if (!response.data?.content) {
          console.error("No content received from API");
          return;
        }

        setContent(response.data.content);
      } catch (error) {
        console.error("Error fetching content:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContent();
  }, [id]);

  // Function to check if the video is a YouTube link
  const isYouTubeLink = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };

  // Function to convert YouTube link into an embeddable format
  const getYouTubeEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname === "youtu.be") {
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
      if (urlObj.hostname.includes("youtube.com")) {
        return `https://www.youtube.com/embed/${urlObj.searchParams.get("v")}`;
      }
    } catch (error) {
      console.error("Invalid URL format", error);
    }
    return url;
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (!content)
    return <p className="text-center text-red-500">Content not found!</p>;

  return (
    <div className="min-h-[90vh] px-5 pt-16 flex items-start bg-black">
      <div className="w-full h-full flex flex-col p-4 items-start">
        <h1 className="text-2xl text-center w-full  md:text-4xl font-bold text-orange-400 mb-8 font-sideheading-font tracking-wider">
          {content.title}
        </h1>

        {/* Video Section */}
        {content.video || content.videoUrl ? (
          <div className="mt-4 w-full flex flex-col gap-3  items-center justify-center">
            {
              content.videoUrl && (
                <iframe
              className="w-auto md:w-3/4 h-auto md:h-[550px]"
              src={getYouTubeEmbedUrl(content.videoUrl)}
              title="YouTube Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
              )
            }

            <video controls className="w-full md:w-3/4">
              <source src={content.video} type="video/mp4" />
            </video>
          </div>
        ) : (
          // Show Thumbnail if Video is Missing
          content.thumbnail && (
            <div className="mt-4 w-full flex items-center justify-center">
              <img
                src={content.thumbnail}
                alt="Thumbnail"
                className="h-[300px] md:h-[450px] object-cover"
              />
            </div>
          )
        )}

        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content.description),
          }}
          className="text-white text-lg md:text-xl"
        ></div>

        <p className="flex justify-center items-center gap-1 text-sm text-gray-400">
          Language:{" "}
          <span className="text-customHoverOrange">{content.language}</span>
          <HiOutlineSpeakerWave />
        </p>
        <p className="text-sm font-para2-font text-gray-400">
          Published on:{" "}
          <span className="text-customHoverOrange">
            {new Date(content.date).toLocaleDateString()}
          </span>
        </p>

        {/* Genres Section */}
        {content.genres?.length > 0 && (
          <p className="text-sm text-gray-300">
            Genre:{" "}
            <span className="text-customHoverOrange">
              {content.genres.join(", ")}
            </span>
          </p>
        )}

        {/* Images Section */}
        {content.images?.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {content.images.map((img, index) => (
              <img
                key={index}
                src={img}
                className="h-24 md:h-32 object-cover rounded"
                alt={`Content ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientContent;
