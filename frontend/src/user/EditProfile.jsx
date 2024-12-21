import React, { useState, useEffect } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from "../components/Button";
import defaultImage from "../assets/profil.png";
import axios from "axios";
import { FaEdit } from "react-icons/fa";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImageUrl: "",
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Token tidak ditemukan");
        return;
      }

      const response = await axios.get(
        "https://api-titipin.vocasia-fsjs-c.fun/api/user/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const profileData = response.data.data;
      setUserData({
        name: profileData.name,
        email: profileData.email,
        phone: profileData.phone,
        profileImageUrl: profileData.profileImageUrl,
      });
    } catch (error) {
      setError("Gagal mengambil data profil");
      console.error("Gagal mengambil data profil: ", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        "https://api-titipin.vocasia-fsjs-c.fun/api/user/profile/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.profileImageUrl) {
        setUserData((prev) => ({
          ...prev,
          profileImageUrl: response.data.profileImageUrl,
        }));
        setSuccessMessage("Foto Profile diupload, silahkan klik simpan");
      }
    } catch (err) {
      setError("Gagal mengunggah gambar.");
      console.error("Error uploading image:", err);
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Token tidak ditemukan");
        return;
      }

      // Send only the necessary data for profile update
      const response = await axios.put(
        "https://api-titipin.vocasia-fsjs-c.fun/api/user/edit-profile",
        {
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setSuccessMessage("Profil berhasil diperbarui!");
        setError("");
        // Refresh data after successful update
        await fetchUserData();
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error.response?.data?.message || "Gagal memperbarui profil");
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  const getImageUrl = (profileImageUrl) => {
    if (!profileImageUrl) return defaultImage;
    return profileImageUrl.startsWith("http")
      ? profileImageUrl
      : `https://api-titipin.vocasia-fsjs-c.fun${profileImageUrl}`;
  };

  return (
    <div className="flex min-h-screen">
      <SidebarUser />

      <div className="flex-1 p-6">
        <HeaderUser />

        <div className="mt-8">
          <div className="border-2 border-emerald-600 p-6 rounded-lg">
            <div className="flex justify-center relative">
              <img
                src={getImageUrl(userData.profileImageUrl)}
                alt="Profile"
                className="h-32 w-32 rounded-full object-cover border border-gray-300"
              />

              <label
                htmlFor="profileImage"
                className="absolute bottom-0 right-0 bg-green-500 p-2 rounded-full cursor-pointer"
              >
                <FaEdit className="text-white" />
              </label>
              <input
                type="file"
                id="profileImage"
                onChange={handleImageChange}
                className="hidden"
                accept="image/*"
              />
            </div>

            <div className="mt-6">
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                className="bg-green-100 text-gray-700 p-3 mt-2 rounded-lg w-full"
              />
            </div>

            <div className="mt-6">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="bg-green-100 text-gray-700 p-3 mt-2 rounded-lg w-full"
              />
            </div>

            <div className="mt-6">
              <label className="block text-gray-700">Nomor Telepon</label>
              <input
                type="text"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                className="bg-green-100 text-gray-700 p-3 mt-2 rounded-lg w-full"
              />
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {Buttons.batal(handleCancel)}
              {Buttons.simpan(handleSave)}
            </div>

            {successMessage && (
              <p className="mt-4 text-green-600">{successMessage}</p>
            )}
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
