import React, { useState } from 'react';
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from '../components/Button';

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "Andi Pratama",
    email: "andipratama@gmail.com",
    phone: "08123456789",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSave = () => {
    console.log("Data disimpan:", userData);
  };

  const handleCancel = () => {
    console.log("Perubahan dibatalkan");
  };

  return (
    <div className="flex h-screen">
      <SidebarUser />

      <div className="flex-1 p-6">
        <HeaderUser />

        <div className="mt-8">
          <div className="border-2 border-green-600 p-6 rounded-lg">
            <div className="flex justify-center">
              <img
                src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
                alt="Profile"
                className="h-32 w-32 rounded-full"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
