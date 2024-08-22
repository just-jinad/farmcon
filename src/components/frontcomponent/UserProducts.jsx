import React, { useState, useEffect } from "react";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';
import SideBar from "../pages/SideBar";

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwtToken"));
        const response = await axios.get(
          "https://myproject-backend-2jt1.onrender.comuser/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);   
        }, 5000);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          {/* <ClimbingBoxLoader color="#36d7b7" /> */}
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <>
        <SideBar/>
        <div className="p-3 sm:ml-64">

          <div className="">
            <div className="mb-4">
        <div>
          <h2 className="text-3xl font-bold mb-6">My Products</h2>
          <div className="grid grid-cols-3 gap-3">
            {products.map((product) => (
              <div key={product.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                  <img
                    className="rounded-t-lg w-full h-48 object-cover"
                    src={product.imagePath}
                    alt={product.productName}
                  />
                </a>
                <div className="px-3 pb-5">
                  <a href="#">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {product.productName}
                    </h5>
                    <p className="text-gray-700 dark:text-gray-400">{product.productDescription}</p>
                  </a>
                  <div className="flex items-center mt-2.5 mb-5">
                    <div className="flex items-center space-x-1 rtl:space-x-reverse">
                      {[...Array(5)].map((_, index) => (
                        <svg
                          key={index}
                          className={`w-4 h-4 ${index < 4 ? "text-yellow-300" : "text-gray-200 dark:text-gray-600"}`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      ))}
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center  justify-between">
                    {/* <span className="text-3xl font-bold text-gray-900 dark:text-white">${product.price}</span> */}
                    <a
                      href="#"
                      className="text-white w-full bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                    >
                      View in market
                    </a>
                  </div>
                </div>
              </div>
            ))}
            </div>
          </div>
                
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default UserProducts;
