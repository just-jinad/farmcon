import React, { useEffect, useState } from "react";
import Cards from "../../components/admin-sale-cards/cards";
import Options from "../../components/options/options";
import Bar from "../../components/charts/bar-graph/bar";
import { toast } from "react-toastify";
import axios from "axios";

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    price: "",
    availability: "",
    location: "",
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, file });

    // Create a URL for the uploaded image
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  const getToken = () => JSON.parse(localStorage.getItem("jwtToken"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const token = getToken(); // Retrieve the token
      const response = await axios.post("https://myproject-backend-2jt1.onrender.com/upload", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response) {
        console.log(response.data.message);
        toast(response.data.message, { type: "success" });
        setFormData({
          productName: "",
          productDescription: "",
          category: "",
          price: "",
          availability: "",
          location: "",
          file: null,
        });
        setUploadedImage(null); // Clear the uploaded image state
        // Close modal after successful submission
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast(error.response.data, { type: "error" });
    }
  };

  return (
    <div className="p-6 mb-6 bg-slate-50 min-h-screen">
      <div className="">
        <Options />
      </div>

      <div className="mb-2">
        <Cards />
      </div>

      <div className="flex flex-wrap lg:flex-nowrap gap-6 mt-7">
        <div className="w-full lg:w-2/3 bg-white rounded-xl p-6 md:p-8">
          <h2 className="text-xl font-semibold uppercase text-teal-700 text-center mb-6 md:mb-8">
            Upload Product
          </h2>
          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-semibold text-teal-600"
              >
                Product Name
              </label>
              <input
                id="productName"
                name="productName"
                value={formData.productName}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-teal-600"
              >
                Category
              </label>
              <input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="productDescription"
                className="block text-sm font-semibold text-teal-600"
              >
                Product Description
              </label>
              <textarea
                id="productDescription"
                name="productDescription"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div>
              <label
                htmlFor="price"
                className="block text-sm font-semibold text-teal-600"
              >
                Price
              </label>
              <input
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-semibold text-teal-600"
              >
                Availability
              </label>
              <input
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-teal-600"
              >
                Location
              </label>
              <input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                type="text"
              />
            </div>

            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="dropzone-file"
                className="block text-sm font-semibold  text-teal-600"
              >
                Upload Image
              </label>
              <label
                htmlFor="dropzone-file"
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              >
                <div className="space-y-1 text-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded Product"
                      className="object-cover w-24 h-24 mx-auto"
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20m-2-4l-6-6M30 3v10h10M14 22l4 4m0 0l4-4m-4 4v10"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="flex text-sm text-teal-600">
                    <span className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                      Upload a file
                      <input
                        id="dropzone-file"
                        name="file"
                        onChange={handleFileChange}
                        type="file"
                        className="sr-only"
                      />
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG, or GIF</p>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-between">
            <button
              onClick={handleSubmit}
              className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Submit
            </button>

            <button
              data-modal-hide="default-modal"
              type="button"
              className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 hover:text-white bg-white hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel Upload
            </button>
          </div>
        </div>

        <div className="w-full lg:w-1/3 bg-white rounded-xl p-6 md:p-8">
          <Bar />
        </div>
      </div>
    </div>
  );
};

export default Main;
