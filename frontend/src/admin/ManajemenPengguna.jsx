import React, { useState } from 'react';
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderManajemenPengguna } from "../components/HeaderAdmin";

const ManajemenPengguna = () => {
  const [users] = useState([
    { id: 1, name: "Andi Pratama", email: "andipratama@gmail.com", phone: "08123456789" },
    { id: 2, name: "Jonatan Malik", email: "malikjohn@gmail.com", phone: "0812345678910" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex">
      <SidebarAdmin />

       <div className="flex-1 p-6">
        <HeaderManajemenPengguna />

        <div className="mt-8">
          <div className="border-2 border-green-600 rounded-lg p-6">
            <div className="flex justify-between items-center border-b-2 border-green-600 pb-2">
              <h2 className="text-xl font-bold">Daftar Pengguna</h2>
            </div>

            <table className="mt-6 w-full table-auto">
              <thead>
                <tr className="border-b-2 border-green-600">
                  <th className="px-4 py-2 text-left">Pengguna</th>
                  <th className="px-4 py-2 text-left">Nomor Telepon</th>
                  <th className="px-4 py-2 text-left">Alamat Email</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr key={user.id} className="border-b border-green-600">
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <span className="block font-semibold">{user.name}</span>
                          <span className="block text-gray-500">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end mt-4 space-x-2">
              <button
                onClick={() => handlePageChange(1)}
                className={`w-8 h-8 rounded-full flex justify-center items-center ${
                  currentPage === 1 ? "bg-green-700 text-white" : "bg-green-500  text-white"
                }`}
              >
                1
              </button>

              <button
                onClick={() => handlePageChange(2)}
                className={`w-8 h-8 rounded-full flex justify-center items-center ${
                  currentPage === 2 ? "bg-green-700 text-white" : "bg-green-500  text-white"
                }`}
              >
                2
              </button>

              <button
                onClick={() => handlePageChange(3)}
                className={`w-8 h-8 rounded-full flex justify-center items-center ${
                  currentPage === 3 ? "bg-green-700 text-white" : "bg-green-500  text-white"
                }`}
              >
                3
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengguna;
