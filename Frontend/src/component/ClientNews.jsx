import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../Url.js";
import { useParams, useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";

function ClientNews() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getnews/${id}`);
        setNews(response.data.news);
      } catch (error) {
        console.error("Error fetching news:", error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  console.log(news);
  

  if (loading) return <p className="text-center">Loading...</p>;
  if (!news) return <p className="text-center text-white">News not found!</p>;

  return (
    <div className=" pt-[8rem] min-h-[90vh] px-6 flex items-start bg-black">
      <div className="w-full h-full flex flex-col p-4 items-start">
        <h1 className="text-2xl w-full text-center md:text-4xl font-bold text-orange-400 mb-8">
          {news.title}
        </h1>
        <div className="w-full mt-2 mb-2 ml-4 flex overflow-x-scroll items-center justify-center  gap-4">
          {news.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              className="h-24 md:h-32"
              alt={`News ${index + 1}`}
            />
          ))}
        </div>
        <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(news.description),
        }}
        className="text-white text-lg md:text-xl"
      ></div>        <p className="text-sm text-customOrange ml-4 mt-3">
          Last Update:{" "}
          <span className="text-gray-300">
            {new Date(news.updatedAt).toLocaleDateString()}
          </span>
        </p>
      </div>
    </div>
  );
}

export default ClientNews;
