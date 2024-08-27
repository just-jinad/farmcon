import React, { useEffect, useState } from "react";
import Cards from "../../components/admin-sale-cards/cards";
import Options from "../../components/options/options";
import Bar from "../../components/charts/bar-graph/bar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadedImages, setUploadedImages] = useState([]); // Changed to array

  const [formData, setFormData] = useState({
    productName: "",
    productDescription: "",
    category: "",
    price: "",
    availability: "",
    unitPrice: "",
    minimumOrder: "",
    location: "",
    files: [], // Updated to an array
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); // Convert file list to array
    setFormData({ ...formData, files }); // Store all files in formData

    // Create URLs for the uploaded images
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setUploadedImages(imageUrls); // Update uploaded images state
  };

  const getToken = () => JSON.parse(localStorage.getItem("jwtToken"));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "files") {
        formData[key].forEach((file) => data.append("files", file)); // Append multiple files
      } else {
        data.append(key, formData[key]);
      }
    }

    try {
      const token = getToken(); // Retrieve the token
      const response = await axios.post(
        "https://myproject-backend-2jt1.onrender.com/upload",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response) {
        console.log(response.data.message);
        let message = response.data.status;
        if (message === 200) {
          toast.success("Product uploaded successfully", {
            position: "top-center",
          });
        } else {
          alert("does not match");
        }

        setTimeout(() => {
          setFormData({
            productName: "",
            productDescription: "",
            category: "",
            price: "",
            availability: "",
            unitPrice: "",
            minimumOrder: "",
            location: "",
            files: [], // Reset files after successful submission
          });
          setUploadedImages([]); // Clear uploaded images
          setModalOpen(false);
        }, 3000);
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
                placeholder="Corn"
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
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Category</option>
                <option value="Cereal Crops">Cereal Crops</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value=" Legumes"> Legumes</option>
                <option value=" Root and Tuber Crops">
                  {" "}
                  Root and Tuber Crops
                </option>
                <option value=" Nuts and Seeds"> Nuts and Seeds</option>
                <option value=" Livestock Products">Livestock Products</option>
                <option value=" Spices and Herbs">Spices and Herbs</option>
                <option value="  Beverage Crops"> Beverage Crops</option>
                <option value="  Oil Crops"> Oil Crops</option>
                <option value="  Fibrous Crops"> Fibrous Crops</option>
                <option value="  Aquaculture/Fishery Products">
                  {" "}
                  Aquaculture/Fishery Products
                </option>
              </select>
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
                placeholder="Describe your product"
                value={formData.productDescription}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="unitPrice"
                  className="block text-sm font-semibold text-teal-600"
                >
                  Unit Price
                </label>
                <input
                  id="unitPrice"
                  name="unitPrice"
                  placeholder="Price per unit (e.g., per kg, per bag)"
                  value={formData.unitPrice}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="number"
                />
              </div>

              <div>
                <label
                  htmlFor="minimumOrder"
                  className="block text-sm font-semibold text-teal-600"
                >
                  Minimum Order
                </label>
                <input
                  id="minimumOrder"
                  name="minimumOrder"
                  placeholder="The smallest amount a buyer can order"
                  value={formData.minimumOrder}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  type="number"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="availability"
                className="block text-sm font-semibold text-teal-600"
              >
                Availability
              </label>
              <select
                id="availability"
                name="availability"
                value={formData.availability}
                onChange={handleInputChange}
                className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="">Select Availability</option>
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
                <option value="Preorder">Preorder</option>
                {/* Add more availability options as needed */}
              </select>
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
                placeholder="Ogbomoso"
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
                Upload Images
              </label>
              <label
                htmlFor="dropzone-file"
                className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
              >
                <div className="space-y-1 text-center">
                  {uploadedImages.length > 0 ? (
                    <div className="flex flex-wrap justify-center">
                      {uploadedImages.map((imageUrl, index) => (
                        <img
                          key={index}
                          src={imageUrl}
                          alt={`Uploaded Product ${index + 1}`}
                          className="object-cover w-24 h-24 mx-2 mb-2"
                        />
                      ))}
                    </div>
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
                      Upload files
                      <input
                        id="dropzone-file"
                        name="files"
                        accept="image/*"
                        onChange={handleFileChange}
                        type="file"
                        multiple // Enable multiple file selection
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
