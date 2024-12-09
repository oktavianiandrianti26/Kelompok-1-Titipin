import React from 'react';
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from '../components/Button';

const EditProfile = () => {
  const handleVisitClick = () => {
    console.log('Button clicked');
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
              <div className="bg-green-100 text-gray-500 p-3 mt-2 rounded-lg">
                Andi Pratama
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700">Email</label>
              <div className="bg-green-100 text-gray-500 p-3 mt-2 rounded-lg">
                andipratama@gmail.com
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-gray-700">Nomor Telepon</label>
              <div className="bg-green-100 text-gray-500 p-3 mt-2 rounded-lg">
                08123456789
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-4">
              {Buttons.batal(handleVisitClick)}
              {Buttons.simpan(handleVisitClick)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
