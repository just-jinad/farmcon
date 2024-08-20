import React, { useState, useEffect } from "react";
import axios from "axios";
import HashLoader from 'react-spinners/HashLoader';

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

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
        console.log(response);
        const data = response.data;

        setProfile({
          profilePicture: data[0]?.profilePicture,
          first_name: data[0]?.first_name,
          bio: data[0]?.bio,
          location: data[0]?.location,
        });
        setBio(data[0]?.bio || "");
        setLocation(data[0]?.location || "");
        setProfilePicture(data[0]?.profilePicture || "");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching user products and profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedProfile = {
      bio,
      location,
      profilePicture,
    };

    try {
      const token = JSON.parse(localStorage.getItem("jwtToken"));
      await axios.put("http://localhost:8888/user/updateProfile", updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProfile(updatedProfile);
      setModalOpen(false); 
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <HashLoader color="#36d7b7" />
        </div>
      ) : (
        <div className="w-full bg-white p-3">
          {/* Profile Header */}
          <div className="flex items-center">
            <div className="w-20 h-20">
              <img 
                src={profile.profilePicture || "https://i.pinimg.com/236x/14/12/38/141238d515d973036dcb44078901a002.jpg"} 
                alt="Profile Picture" 
                className="rounded-full w-full h-full object-cover" 
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-primary">{profile.first_name || "Jinad Tope"}</h2>
              <p className="text-gray-600 text-sm">{profile.bio || "Industrial Farmer and Entrepreneur"}</p>
              <p className="text-gray-600 text-sm">{profile.location || "Ogbomoso, Oyo State, Nigeria"}</p>
              <p className="text-gray-600 text-sm">Selective free resources for farmers @farmCOn.</p>
              <div className="mt-2 flex space-x-4 text-sm">
                <span><strong>371</strong> posts</span>
                <span><strong>14.4K</strong> followers</span>
                <span><strong>272</strong> following</span>
              </div>
              <button 
                className="mt-2 bg-teal-600 text-white py-1 px-4 rounded"
                onClick={() => setModalOpen(true)}  // Open modal
              >
                Edit Profile

              </button>
            </div>
          </div>

          {/* Profile Posts */}
          <div className="grid grid-cols-3 gap-2 mt-10">
  {products.map((product, index) => (
    <div key={index} className="p-1">
      <img
        src={product.imagePath || 'placeholder-image-url'}
        alt={product.productName}
        className="h-36 w-full rounded-lg object-cover"
      />
    </div>
  ))}
</div>




          {/* Modal */}
          {modalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg w-1/3">
                <h2 className="text-lg font-bold mb-4">Edit Profile</h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="mb-4">
                    <label className="block text-sm">Bio</label>
                    <textarea 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)} 
                      className="w-full p-2 border rounded"
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm">Location</label>
                    <input 
                      type="text" 
                      value={location} 
                      onChange={(e) => setLocation(e.target.value)} 
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm">Profile Picture URL</label>
                    <input 
                      type="text" 
                      value={profilePicture} 
                      onChange={(e) => setProfilePicture(e.target.value)} 
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button 
                      type="button" 
                      className="mr-2 bg-gray-400 text-white py-1 px-4 rounded" 
                      onClick={() => setModalOpen(false)}  // Close modal
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="bg-teal-600 text-white py-1 px-4 rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}


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
