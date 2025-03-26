import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../baseUrl";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function AddNews() {
  const [message, setMessage] = useState(""); // For success/error messages
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data, event) => {
    event.preventDefault(); // Prevent form refresh
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", description);

      // Get file input manually
      const imageInput = document.querySelector('input[type="file"]');
      if (imageInput && imageInput.files.length > 0) {
        for (let i = 0; i < imageInput.files.length; i++) {
          formData.append("images", imageInput.files[i]);
        }
      }

      const response = await axios.post(`${baseUrl}/uploadnews`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.data); // Debugging

      if (response.status === 201) {
        alert(" News Added Successfully!");
      } else {
        alert(" Error Adding News");
      }
    } catch (error) {
      console.error("Upload Error:", error);
      setMessage("❌ Error Adding News");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 h-auto bg-orange-300 p-5 rounded-lg mt-4"
      >
        <h1 className="text-amber-700 py-2 border-b-2 border-amber-800 text-center text-2xl md:text-3xl font-semibold tracking-wider">
          Add New News
        </h1>

        {/* Show Message */}
        {message && (
          <p className="text-center mt-3 text-lg font-semibold text-green-700 bg-green-100 p-2 rounded-md">
            {message}
          </p>
        )}

        <div className="flex flex-col justify-center mt-4 items-center text-amber-900 gap-3">
          <div className="w-[90%] h-auto flex flex-col items-start gap-3">
            <div className="flex gap-1 items-center">
              <p className="text-sm sm:text-base">NEWS Title: </p>
              <input
                className="md:w-[18rem] px-4 py-2 outline-none focus:outline-orange-800"
                type="text"
                placeholder="Title"
                {...register("title", { required: true })}
              />
            </div>
            {errors.title && <p className="text-red-600">Title is required</p>}

            <div className="flex gap-1 items-center">
              <p>Images:</p>
              <input type="file" multiple />
            </div>

            <ReactQuill
              className="w-full px-4 py-2 outline-none bg-white focus:outline-orange-800"
              theme="snow"
              value={description}
              onChange={setDescription}
              placeholder="Description"
            />
            {errors.description && (
              <p className="text-red-600">Description is required</p>
            )}
          </div>

          <button
            type="submit"
            className="w-[90%] border-2 px-4 py-1 hover:-translate-y-1 border-amber-900 active:bg-yellow-800 active:text-white duration-200 flex items-center justify-center"
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

export default AddNews;
