import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const contentTypes = [
  "web series",
  "serial",
  "music video",
  "movie",
  "reality show",
  "sports",
  "short film",
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

function AddContent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
 

  const onSubmit = async (data) => {
    event.preventDefault(); // Prevent form refresh
    console.log(data);
    
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", description);
      formData.append("date", data.date);
      formData.append("status", data.status);
      formData.append("type", data.type);
      formData.append("videoUrl", data.videoUrl);
      formData.append("language", data.language);

      // Append  genres as arrays
      data.genres.forEach((genre) => formData.append("genres[]", genre));

      if (data.thumbnail[0]) {
        formData.append("thumbnail", data.thumbnail[0]);
      }
      if (data.video[0]) {
        formData.append("video", data.video[0]);
      }
      if (data.images.length > 0) {
        Array.from(data.images).forEach((img) =>
          formData.append("images", img)
        );
      }

      const response = await axios.post(`${baseUrl}/uploadcontent`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Content uploaded successfully!");
        reset();
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto py-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 bg-orange-300 rounded-lg  p-6"
      >
        <h1 className="text-amber-700 py-2 border-b-2 border-amber-800 text-center text-2xl font-semibold tracking-wider">
          Add New Content
        </h1>

        <div className="flex flex-col gap-4 mt-4 text-amber-900">
          <div className="flex flex-col">
            <label>Title:</label>
            <input
              className="px-4 py-2 rounded-md outline-none focus:outline-orange-800"
              type="text"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">Title is required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Video URL (YouTube link):</label>
            <input
              className="px-4 rounded-md py-2 outline-none"
              type="text"
              {...register("videoUrl")}
            />
          </div>

          <div className="flex flex-col">
            <label>Upload Video:</label>
            <input className="px-4 rounded-md py-2" type="file" {...register("video")} />
          </div>

          <div className="flex flex-col">
            <label>Publish Date:</label>
            <input
              type="date"
              className="focus:outline-orange-800 rounded-md px-4 py-2"
              {...register("date", { required: true })}
            />
            {errors.date && (
              <p className="text-red-500 text-sm">Date is required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Thumbnail Image:</label>
            <input type="file" {...register("thumbnail", { required: true })} />
            {errors.thumbnail && (
              <p className="text-red-500 rounded-md text-sm">Thumbnail is required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Additional Images:</label>
            <input type="file" multiple {...register("images")} />
          </div>

          <div className="flex flex-col">
            <label>Type:</label>
            <select
              className="outline-none rounded-md px-2 py-1"
              {...register("type", { required: true })}
            >
              {contentTypes.map((type) => (
                <option key={type} value={type}>
                  {type.replace("_", " ")}
                </option>
              ))}
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">Type is required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Languages:</label>
            <input
              type="text"
              placeholder="Ex: Odia"
              {...register("language", { required: true })}
              className="px-2 py-1 outline-none rounded-md"
            />
            {errors.languages && (
              <p className="text-red-500 text-sm">Languages are required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Genres:</label>
            <select className="rounded-md  outline-none" {...register("genres")} multiple>
              {genresList.map((genre) => (
                <option className="px-2 py-1 rounded-md " key={genre} value={genre}>
                  {genre.replace("_", " ")}
                </option>
              ))}
            </select>
            {errors.genres && (
              <p className="text-red-500 text-sm">Genres are required.</p>
            )}
          </div>

          <div className="flex flex-col">
            <label>Status:</label>
            <select className="rounded-md outline-none" {...register("status", { required: true })}>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            {errors.status && (
              <p className="text-red-500 text-sm">Status is required.</p>
            )}
          </div>

          <div className="flex flex-col  ">
            <label>Description:</label>
           
            <ReactQuill
            className="bg-white text-black rounded-md"
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Description..."
            />
            
            {errors.description && (
              <p className="text-red-500 text-sm">Description is required.</p>
            )}
          </div>

          <button
            className="w-full bg-amber-700 text-white py-2 mt-4 hover:bg-amber-800 transition"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddContent;
