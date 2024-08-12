import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HashLoader from 'react-spinners/HashLoader';

const Marketing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('jwtToken'));
        const response = await axios.get('http://localhost:8888/products', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 min-h-screen">
      <div className="flex mb-6 gap-6 flex-wrap lg:flex-nowrap justify-between">
        <div className="w-full">
          {/* <Column /> */}
        </div>
        <div className="w-full">
          {/* <Pie /> */}
        </div>
      </div>
      <div className="w-full">
        {loading ? (
          <HashLoader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
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
