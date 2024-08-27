// ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import { useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-6 min-h-screen">
      {loading ? (
        <div className="flex justify-center items-center">
          <BeatLoader color="#036672" />
        </div>
      ) : (
        <div>
          <a href="/" className="text-blue-500 flex items-center mb-4">
            <FaArrowLeft className="mr-2" /> Back to Products
          </a>
          {product && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">{product.productName}</h2>
              <p className="text-gray-500 mb-4">{product.productDescription}</p>
              <div className="mb-4">
                {JSON.parse(product.imagePath).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Image ${idx + 1}`}
                    className="w-full max-h-64 object-cover rounded-lg mb-2"
                  />
                ))}
              </div>
              <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
              <p className="text-gray-500 mb-2">Location: {product.location}</p>
              <p className="text-gray-500 mb-2">Availability: {product.availability}</p>
              <p className="text-gray-500 mb-2">Phone: {product.phone_number}</p>
              <p className="text-gray-500 mb-2">User ID: {product.user_id}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 transition-all duration-200"
              >
                Chat with Seller
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
