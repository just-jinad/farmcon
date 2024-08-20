import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';
import { FaRegCopy } from "react-icons/fa6";

const Marketing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copyStatus, setCopyStatus] = useState({}); // To track copy status for each product

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const response = await axios.get('http://localhost:8888/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
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

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopyStatus({ ...copyStatus, [id]: 'Copied!' });
        setTimeout(() => setCopyStatus({ ...copyStatus, [id]: '' }), 2000); // Clear message after 2 seconds
      })
      .catch((err) => console.error('Failed to copy: ', err));
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-lg">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full py-2 pl-10 pr-4 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
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
          <button className="absolute right-0 top-0 mt-2 mr-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none">
            Search
          </button>
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <div className="flex justify-center items-center">
            <HashLoader />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
              >
                <img
                  alt={product.productName}
                  src={product.imagePath}
                  className="shadow-lg rounded-full mx-auto"
                  style={{ maxWidth: '120px' }}
                />
                <div className="pt-6 text-center">
                  <h5 className="text-xl font-bold">{product.productName}</h5>
                  <p className="mt-1 text-sm text-gray-500 uppercase font-semibold">
                    {product.category}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">{product.description}</p>
                  <p className="mt-2 text-lg font-bold text-gray-800">${product.price.toFixed(2)}</p>
                  <p className="mt-2 text-sm text-gray-500">Location: {product.location}</p>
                  <p className="mt-2 text-sm text-gray-500">Availability: {product.availability}</p>
                  
                  <div className="flex items-center text-center">
                    <p className="mt-2 text-sm text-gray-500">Phone: {product.phone_number}</p>
                    <button
                      onClick={() => copyToClipboard(product.phone_number, `phone-${index}`)}
                      className="ml-2 text-blue-600"
                    >
                     <FaRegCopy className='text-gray-500'/>
                    </button>
                    {copyStatus[`phone-${index}`] && (
                      <span className="ml-2 text-green-500">{copyStatus[`phone-${index}`]}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center">
                    <p className="mt-2 text-sm text-gray-500">user_ID: {product.user_id}</p>
                    <button
                      onClick={() => copyToClipboard(product.user_id, `user-${index}`)}
                      className="ml-2 text-blue-600"
                    >
                    <FaRegCopy className='text-gray-500' />
                    </button>
                    {copyStatus[`user-${index}`] && (
                      <span className="ml-2 text-green-500">{copyStatus[`user-${index}`]}</span>
                    )}
                  </div>

                  <div className="mt-6 flex justify-center gap-2">
                    <button
                      className="bg-red-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none"
                      type="button"
                    >
                      <i className="fab fa-google"></i>
                    </button>
                    <button
                      className="bg-blue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none"
                      type="button"
                    >
                      <i className="fab fa-facebook-f"></i>
                    </button>
                    <button
                      className="bg-green-500 text-white w-8 h-8 rounded-full outline-none focus:outline-none"
                      type="button"
                    >
                      <i className="fab fa-whatsapp"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketing;
