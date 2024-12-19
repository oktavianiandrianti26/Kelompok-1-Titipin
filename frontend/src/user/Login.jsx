import React, { useState, useEffect } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from "../components/Button";
import profilImage from "../assets/profil.png";
import axios from "axios";
import { FaEdit } from "react-icons/fa"; // Mengimpor ikon pensil

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    profileImageUrl: "",
  });
  const [error, setError] = useState(null); // Menambahkan state error untuk menangani error
  const [successMessage, setSuccessMessage] = useState("");
  const [imageFile, setImageFile] = useState(null); // Menambahkan state untuk menyimpan file gambar

  // Ambil data profil pengguna saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setError("Token tidak ditemukan");
          console.log("Token tidak ditemukan");
        } else {
          // Mengirim permintaan GET ke API
          const response = await axios.get(
            "http://localhost:3000/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Menyimpan data yang didapat ke state userData
          setUserData({
            name: response.data.data.name,
            email: response.data.data.email,
            phone: response.data.data.phone,
            profileImageUrl: response.data.data.profileImageUrl,
          });

          console.log(response.data); // Menampilkan data profil
        }
      } catch (error) {
        setError("Gagal mengambil data profil");
        console.error("Gagal mengambil data profil: ", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
  
      const formData = new FormData();
      formData.append("profileImage", file);
  
      try {
        const response = await axios.post(
          "http://localhost:3000/api/user/profile/upload", // URL lengkap
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
  
        // Menggabungkan URL relatif dengan base URL backend
        const fullImageUrl = `http://localhost:3000${response.data.profileImageUrl}`;
  
        // Mengupdate state dengan URL lengkap gambar
        setUserData({
          ...userData,
          profileImageUrl: fullImageUrl,
        });
        setSuccessMessage("Foto profil berhasil diperbarui!");
      } catch (err) {
        setError("Gagal mengunggah gambar.");
      }
    }
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Token tidak ditemukan");
        return;
      }

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      if (imageFile) {
        formData.append("profileImage", imageFile); // Menambahkan file gambar ke formData
      }

      const response = await axios.put(
        "http://localhost:3000/api/user/edit-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Mengatur header untuk multipart form
          },
        }
      );

      // Jika berhasil, tampilkan pesan sukses
      setSuccessMessage("Profil berhasil diperbarui!");
      setError("");
      console.log("Profil berhasil diperbarui:", response.data);
    } catch (error) {
      console.error(
        "Terjadi kesalahan:",
        error.response?.data?.message || error.message
      );
      setError("Gagal memperbarui profil");
    }
  };

  const handleCancel = () => {
    // Mengarahkan pengguna kembali ke halaman sebelumnya
    window.history.back();
  };

  return (
    <div className="flex min-h-screen">
      <SidebarUser />

      <div className="flex-1 p-6">
        <HeaderUser />

        <div className="mt-8">
          <div className="border-2 border-green-600 p-6 rounded-lg">
            <div className="flex justify-center relative">
            <img
  src={`http://localhost:3000${userData.profileImageUrl}`} // Use userData.profileImageUrl instead of profileImageUrl
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
