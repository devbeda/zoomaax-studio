import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../baseUrl";
import axios from "axios";

function AddCasting() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("role", data.role);

      if (data.image[0]) {
        formData.append("image", data.image[0]); // Attach image file
      }

      const response = await axios.post(`${baseUrl}/addcasting`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        alert("Casting added successfully");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add casting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:h-[90vh] h-[80vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-4/5 bg-orange-300 p-6 rounded-md shadow-lg"
      >
        <h1 className="text-amber-700 py-2 border-b-2 border-amber-800 text-center text-2xl md:text-3xl font-semibold tracking-wider">
          Add New Casting
        </h1>

        <div className="flex flex-col justify-center items-center text-amber-900 mt-4 gap-3">
          <div className="w-[90%] flex flex-col gap-3">
            <div className="flex flex-col">
              <label>Name:</label>
              <input
                className="px-4 py-2 border border-gray-400 rounded-md focus:outline-orange-800"
                type="text"
                placeholder="Casting Name"
                {...register("name", { required: true })}
              />
              {errors.name && <p className="text-red-500 text-sm">Name is required</p>}
            </div>

            <div className="flex flex-col">
              <label>Role:</label>
              <input
                className="px-4 py-2 border border-gray-400 rounded-md focus:outline-orange-800"
                type="text"
                placeholder="Role"
                {...register("role", { required: true })}
              />
              {errors.role && <p className="text-red-500 text-sm">Role is required</p>}
            </div>

            <div className="flex flex-col">
              <label>Image:</label>
              <input
                className="px-2 py-1  rounded-md"
                type="file"
                {...register("image", { required: true })}
              />
              {errors.image && <p className="text-red-500 text-sm">Image is required</p>}
            </div>
          </div>

          <button
            className="w-[90%] border-2 px-4 py-2 hover:-translate-y-1 border-amber-900 active:bg-yellow-800 active:text-white duration"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Add Casting"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCasting;
