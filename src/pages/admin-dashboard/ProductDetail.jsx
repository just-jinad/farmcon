import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track current image index

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const response = await axios.get(`https://myproject-backend-2jt1.onrender.com/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleRotateImage = () => {
    if (product && product.imagePath) {
      const images = JSON.parse(product.imagePath);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#036672" />
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8 grid grid-cols-2 gap-10">
          {/* Left Section: Image Viewer */}
          <div className="space-y-6">
            <div className="relative">
              {product && product.imagePath && (
                <img
                  src={JSON.parse(product.imagePath)[currentImageIndex]} // Display the current image
                  alt={`Product Image ${currentImageIndex + 1}`}
                  className="w-full h-96 object-cover rounded-lg shadow-md"
                />
              )}
              {/* Rotate Feature */}
              <div className="absolute top-full transform -translate-y-10 left-1/2 -translate-x-1/2">
                <button
                  onClick={handleRotateImage}
                  className="bg-white text-sm font-semibold text-gray-700 py-1 px-4 rounded-full shadow-lg"
                >
                  Rotate
                </button>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4">
              {product &&
                product.imagePath &&
                JSON.parse(product.imagePath).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg shadow-md ${
                      currentImageIndex === idx ? 'ring-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setCurrentImageIndex(idx)} // Clicking thumbnail changes the main image
                  />
                ))}
            </div>
          </div>

          {/* Right Section: Product Details */}
          <div className="space-y-6">
            {/* Product Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{product?.productName}</h2>
              <p className="text-yellow-500 text-sm mt-2">
                ★ ★ ★ ★ ★ <span className="text-gray-500">(10 Reviews)</span>
              </p>
            </div>

            {/* Product Description */}
            <p className="text-gray-600 leading-relaxed">
              Premium & comfortable memory foam with a strong structure built with teakwood, it feels amazing.
            </p>

            {/* Price and Quantity Selector */}
            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-gray-900">${product?.price?.toFixed(2)}</p>
              <div className="flex items-center border rounded-lg px-3 py-1">
                <span className="text-sm font-semibold">Qty: </span>
                <input
                  type="number"
                  min="1"
                  defaultValue="1"
                  className="w-12 ml-2 text-center border-none focus:outline-none"
                />
              </div>
            </div>

            {/* Availability and Contact */}
            <p className="text-gray-500">Location: {product?.location}</p>
            <p className="text-gray-500">Availability: {product?.availability}</p>

            {/* Buttons */}
            <div className="flex space-x-4">
              <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-200">
                Chat with Seller
              </button>
              <button className="bg-gray-300 text-black px-6 py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring focus:ring-gray-200 transition-all duration-200">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
