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
      const response = await axios.post("http://localhost:8888/upload", data, {
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

      <div className="">
        <Cards />
      </div>
      <div className="flex gap-4 flex-wrap">
        <div className=" p-6 w-full my-4 lg:w-[64%] bg-white rounded-xl">
          <div className="ext-zinc-900 text-base text-center font-medium leading-normal mb-8">
            Upload Product
          </div>
          <div className=" justify-start gap-2 flex flex-wrap">
            <h3 className="text-xl text-end font-semibold text-gray-900 dark:text-white">
              ☘️  Take a moment to fill in product details ☘️
            </h3>
          </div>
          <div className="p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="productName"
                  className="text-sm font-semibold text-gray-600"
                >
                  Product Name
                </label>
                <input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                  type="text"
                />
              </div>

              <div className="">
                <label
                  htmlFor="category"
                  className="text-sm font-semibold text-gray-600"
                >
                  Category
                </label>
                <input
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                  type="text"
                />
              </div>

              <div className="md:col-span-2">
                <label
                  htmlFor="productDescription"
                  className="text-sm font-semibold text-gray-600"
                >
                  Product Description
                </label>
                <textarea
                  id="productDescription"
                  name="productDescription"
                  value={formData.productDescription}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                ></textarea>
              </div>

              <div className="">
                <label
                  htmlFor="price"
                  className="text-sm font-semibold text-gray-600"
                >
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                  type="text"
                />
              </div>

              <div className="">
                <label
                  htmlFor="availability"
                  className="text-sm font-semibold text-gray-600"
                >
                  Availability
                </label>
                <input
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 px-3 py-2"
                  type="text"
                />
              </div>

              <div className="">
                <label
                  htmlFor="location"
                  className="text-sm font-semibold text-gray-600"
                >
                  Location
                </label>
                <input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="block w-full rounded border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 "
                  type="text"
                />
              </div>

              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadedImage ? (
                      <img
                        src={uploadedImage}
                        alt="Uploaded Product"
                        className="object-cover w-24 h-24"
                      />
                    ) : (
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    )}
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    name="file"
                    onChange={handleFileChange}
                    type="file"
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded"
              >
                Submit
              </button>

              <button
                data-modal-hide="default-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Cancel Upload
              </button>
            </div>
          </div>
        </div>
        <div className=" p-6 w-full my-4 lg:w-1/3 bg-white rounded-xl">
          <Bar />
        </div>
      </div>
    </div>
  );
};

export default Main;
