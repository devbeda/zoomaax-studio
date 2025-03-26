import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddEvent() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("eventName", data.eventName);
      formData.append("description", description);
      formData.append("date", data.date);
      formData.append("location", data.location);

      // Check if thumbnail_image exists before accessing index 0
      if (data.thumbnail_image && data.thumbnail_image.length > 0) {
        formData.append("thumbnail", data.thumbnail_image[0]);
      }

      const response = await axios.post(`${baseUrl}/uploadevent`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        alert("Event uploaded successfully!");
        reset(); // Clear form after successful upload
      }
    } catch (error) {
      console.error(error);
      alert("Failed to upload event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-4/5 h-auto  my-4 bg-orange-300">
        <h1 className="text-amber-700 py-2 border-b-2 border-amber-800 text-center text-2xl md:text-3xl font-semibold tracking-wider">
          Add New Event
        </h1>

        <div className="flex h-auto w-full flex-col justify-center items-center text-amber-900 py-3 gap-3">
          <div className="w-[90%] h-auto flex flex-col justify-center items-start gap-3">
            <div className="flex gap-1 items-center">
              <p className="text-sm sm:text-base">Event Name: </p>
              <input
                className="md:w-[18rem] px-4 py-2 outline-none focus:outline-orange-800"
                type="text"
                placeholder="Title"
                {...register("eventName", { required: true })}
              />
            </div>
            <div className="flex gap-1 items-center">
              <p>Image: </p>
              <input
                className="w-full"
                type="file"
                {...register("thumbnail_image", { required: true })}
              />
            </div>
            <div className="flex gap-1 items-center">
              <p>Date</p>
              <input
                type="date"
                className="focus:outline-orange-800"
                {...register("date", { required: true })}
              />
            </div>
            <div className="flex gap-1 items-center">
              <p>Location</p>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-orange-800"
                placeholder="Enter event location"
                {...register("location", { required: true })} // ✅ Register location
              />
            </div>

            <div className="w-[80%]">
              <p>Description</p>
            <ReactQuill
              className="w-full   px-4 py-2 outline-none bg-white focus:outline-orange-800"
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Description"
            />
            </div>
          </div>
          <button
            className="w-[90%] border-2 px-4 py-1 hover:-translate-y-1 border-amber-900 active:bg-yellow-800 active:text-white duration"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
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
                Uploading...
              </div>
            ) : (
              "Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEvent;
