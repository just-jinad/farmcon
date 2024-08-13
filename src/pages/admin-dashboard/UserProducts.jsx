import React, { useState, useEffect } from "react";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';


const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 8.1339,
    lng: 4.2436,
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwtToken"));
        const response = await axios.get(
          "http://localhost:8888/user/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching user products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="w-full">
          {/* Profile Header */}
          <div className="flex items-center">
            <div className="w-20 h-20">
              <img 
                src="https://i.pinimg.com/236x/14/12/38/141238d515d973036dcb44078901a002.jpg" 
                alt="Profile Picture" 
                className="rounded-full w-full h-full object-cover" 
              />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-primary">Replace with user name</h2>
              <p className="text-gray-600 text-sm">E-commerce Website</p>
              <p className="text-gray-600 text-sm">Selective free resources for designers @unblast.</p>
              <p className="text-gray-600 text-sm">Melbourne, Victoria, Australia</p>
              <button className="mt-2 bg-primary text-white py-1 px-4 rounded">
                Follow
              </button>
              <div className="mt-2 flex space-x-4 text-sm">
                <span><strong>371</strong> posts</span>
                <span><strong>14.4K</strong> followers</span>
                <span><strong>272</strong> following</span>
              </div>
            </div>
          </div>

          {/* Profile Highlights */}
          <div className="flex justify-around mt-6">
            {Array(4).fill("").map((_, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full mx-auto"></div>
                <span className="text-sm">Text 0{index + 1}</span>
              </div>
            ))}
          </div>

          {/* Profile Posts */}
          <div className="grid grid-cols-3 gap-2 mt-4">
            {products.map((product, index) => (
              <div key={index} className="aspect-square">
                <img
                  src={product.imagePath || 'placeholder-image-url'}
                  alt={product.productName}
                  className="w-full h-36 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>  
          {/* Google Map */}
    <div className="text-center mt-6">
  <section className="relative">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.113355594757!2d4.265083074775671!3d8.132853283590624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037991cc01139c9%3A0x4f6d72f0f58b9b80!2sOgbomosho%20Oyo!5e0!3m2!1sen!2sng!4v1691930295633!5m2!1sen!2sng"
      width="100%"
      height="450"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
    ></iframe>
  </section>
</div>


        </div>
      )}
    </div>
  );  
};

export default UserProducts;
