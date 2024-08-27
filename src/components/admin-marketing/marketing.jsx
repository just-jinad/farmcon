// Marketing.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BeatLoader from 'react-spinners/BeatLoader';
import { Link } from 'react-router-dom';

const Marketing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const response = await axios.get('https://myproject-backend-2jt1.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
        
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.productName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full py-3 pl-12 pr-4 text-gray-700 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring focus:border-blue-400 transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.35 4.35a1 1 0 01-1.414 1.414l-4.35-4.35zm-4.9 2.18a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <BeatLoader color="#036672" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => {
              let images = [];
              try {
                images = JSON.parse(product.imagePath);
              } catch (error) {
                console.error('Error parsing imagePath:', error);
              }

              return (
                <Link
                  key={index}
                  to={`/products/${product.product_id}`}
                  className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center cursor-pointer"
                >
                  <img
                    alt={product.productName}
                    src={images[0] || ''}
                    className="shadow-lg rounded-full mx-auto"
                    style={{ maxWidth: '120px' }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">{product.productName}</h5>
                    <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                      {product.category}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">{product.productDescription}</p>
                    <p className="mt-2 text-lg font-bold text-gray-800">${product.price.toFixed(2)}</p>
                    <p className="mt-2 text-sm text-gray-500">Location: {product.location}</p>
                    <p className="mt-2 text-sm text-gray-500">Availability: {product.availability}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketing;
