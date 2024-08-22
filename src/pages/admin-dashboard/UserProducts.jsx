import React, { useState, useEffect } from "react";
import axios from "axios";
import BeatLoader from "react-spinners/BeatLoader";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader for button loader

const UserProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [modalLoading, setModalLoading] = useState(false); // Loading state for modal form

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("jwtToken"));
        const response = await axios.get(
          "https://myproject-backend-2jt1.onrender.com/user/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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

  const handleDeleteProduct = async (productId) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      try {
        const token = JSON.parse(localStorage.getItem("jwtToken"));
        await axios.delete(`https://myproject-backend-2jt1.onrender.com/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(products.filter((product) => product.id !== productId));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEditProduct = (productId) => {
    // Redirect to edit page or open modal for editing
    console.log(`Edit product ${productId}`);
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setModalLoading(true); // Set loading to true when submitting
    const updatedProfile = {
      bio,
      location,
      profilePicture,
    };

    try {
      const token = JSON.parse(localStorage.getItem("jwtToken"));
      await axios.put(
        "https://myproject-backend-2jt1.onrender.com/user/updateProfile",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProfile(updatedProfile);
      setModalOpen(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setModalLoading(false); // Set loading to false after the update
    }
  };

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
             <BeatLoader color="#036672" />
         
        </div>
      ) : (
        <div className="w-full bg-white p-3">
          {/* Profile Header */}
          <div className="flex items-center">
            <div className="w-20 h-20">
              <img
                src={
                  profile.profilePicture ||
                  "https://i.pinimg.com/236x/14/12/38/141238d515d973036dcb44078901a002.jpg"
                }
                alt="Profile Picture"
                className="rounded-full w-full h-full object-cover"
              />
            </div>
            <div className="ml-4">
              <h2 className="text-xl font-bold text-primary">
                {profile.first_name || "Loading..."}
              </h2>
              <p className="text-gray-600 text-sm">
                {profile.bio || "Industrial Farmer and Entrepreneur"}
              </p>
              <p className="text-gray-600 text-sm">
                {profile.location || "Ogbomoso, Oyo State, Nigeria"}
              </p>
              <div className="mt-2 flex space-x-4 text-sm">
                <span>
                  <strong>371</strong> posts
                </span>
                <span>
                  <strong>14.4K</strong> followers
                </span>
                <span>
                  <strong>272</strong> following
                </span>
              </div>
              <button
                className="mt-2 bg-teal-600 text-white py-1 px-4 rounded"
                onClick={() => setModalOpen(true)} // Open modal
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Profile Posts */}
          <div className="grid grid-cols-3 gap-4 mt-10 mb-14">
            {products.map((product, index) => (
              <div key={index} className="relative p-1">
                <img
                  src={product.imagePath || "placeholder-image-url"}
                  alt={product.productName}
                  className="h-36 w-full rounded-lg object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-50 transition-all flex justify-center items-center gap-4 opacity-0 hover:opacity-100">
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Delete
                  </button>
                </div>
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
                      onClick={() => setModalOpen(false)} // Close modal
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-teal-600 text-white py-1 px-4 rounded flex items-center justify-center"
                      disabled={modalLoading} // Disable button while loading
                    >
                      {modalLoading ? (
                        <ClipLoader color="#ffffff" size={20} />
                      ) : (
                        "Save"
                      )}
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3922.113355594757!2d4.265083074775671!3d8.132853283590624!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1037991cc01139c9%3A0x4f6d72f0f58b9b80!2sOgbomosho!5e0!3m2!1sen!2sng!4v1692541192171!5m2!1sen!2sng"
                className="rounded-lg h-96 w-full"
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
