import React, { useEffect, useState } from "react";
import NewsCard from "./NewsCard";
import axios from "axios";
import { baseUrl } from "../../baseUrl";
import { useNavigate } from "react-router-dom";

function YourNews() {
  const [newss, setNews] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedNews = async () => {
      try {
        const response = await axios.get(`${baseUrl}/getallnews`);
        setNews(response.data.news);
        console.log(response.data.news);
      } catch (error) {
        console.error(
          "Cannot geting your news",
          error.response?.data || error.message
        );
      }
    };

    fetchedNews();
  }, []);

  console.log(newss);
  return (
    <div className="w-full h-[90vh] flex flex-col justify-center items-center">
      <div className="mb-3">
        <h1 className="text-xl text-amber-800 border-b-2 border-amber-800">
          Your News
        </h1>
      </div>
      <div className="h-[80vh] overflow-y-scroll flex flex-col items-center bg-orange-200  py-4">
        {newss.map((news, index) => (
          <div className="flex flex-col items-center w-[90%]" key={index} onClick={() => navigate(`/news/${news._id}`)}>
            <NewsCard key={index} news={news} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default YourNews;
