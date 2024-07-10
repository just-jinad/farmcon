// import Line from '../../components/charts/linechart/line'
import React, { useEffect, useState } from "react";
import Cards from "../../components/admin-sale-cards/cards";
import Options from "../../components/options/options";
import Bar from "../../components/charts/bar-graph/bar";
import { toast } from "react-toastify";

import axios from "axios";

// import { dateCards } from '../../dates/jummy'

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);

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
      setFormData({ ...formData, file: e.target.files[0] });
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
          Authorization: `Bearer ${token}`, // Include the token in the headers
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
        // Close modal after successful submission
        setModalOpen(false);
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast(error.response.data, { type: "error" });
    }
  };

  //   const toggleModal = () => {
  //     setModalOpen(!modalOpen);
  //   };

  //   const toggleSidebar = () => {
  //     setSidebarOpen(!sidebarOpen);
  //   };

  //   const closeSidebar = () => {
  //     setSidebarOpen(sidebarOpen);
  //   };

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
          <div className="ext-zinc-900 text-base font-medium leading-normal mb-8">
            Upload Product
          </div>
          <div className=" justify-start gap-2 flex flex-wrap">
            {/* {
                            dateCards.map(({ text, earn, percent, color }) => {
                                return (
                                    <div className={`grow shrink basis-0 h-[100px] p-3 bg-white rounded-sm shadow border-t-2 ${color} flex-col justify-start items-start gap-4 inline-flex`}>
                                        <div className="self-stretch text-zinc-500 text-xs font-medium leading-[18px]">{text}</div>
                                        <div className="self-stretch justify-start items-baseline gap-1 inline-flex">
                                            <div className="text-zinc-900 text-xl font-semibold leading-[30px]">${earn}</div>
                                            <div className="grow shrink basis-0 text-lime-500 text-xs font-normal leading-[18px]">+{percent}</div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <Line /> */}

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Take a moment to fill in product details ☘️
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
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

              <div class="flex items-center justify-center w-full">
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <input id="dropzone-file" 
                      name="file"      onChange={handleFileChange} type="file" class="hidden" />
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
