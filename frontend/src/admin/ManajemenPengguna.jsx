import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderManajemenPengguna } from "../components/HeaderAdmin";
import profilImage from "../assets/profil.png";
import axios from "axios";

const ManajemenPengguna = () => {
  const [users, setUsers] = useState([]); // State untuk menyimpan data pengguna
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Mengambil data pengguna dari API saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/users"
        );
        setUsers(response.data.data); // Menyimpan data pengguna di state
      } catch (error) {
        console.error("Terjadi kesalahan saat mengambil data pengguna:", error);
      }
    };

    fetchUsers(); // Memanggil fungsi untuk mengambil data pengguna
  }, []); // Efek ini hanya dijalankan sekali saat komponen pertama kali dimuat

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const currentUsers = users.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Menentukan rentang halaman untuk ditampilkan (misalnya halaman 1, 2, 3)
  const paginationRange = [1, 2, 3];

  return (
    <div className="flex min-h-screen">
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
                  <tr key={user._id} className="border-b border-green-600">
                    <td className="px-4 py-2">
                      <div className="flex items-center space-x-2">
                        <img
                          src={profilImage}
                          alt={user.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div>
                          <span className="block font-semibold">
                            {user.name}
                          </span>
                          <span className="block text-gray-500">
                            {user.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{user.phone}</td>
                    <td className="px-4 py-2">{user.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-end items-center space-x-2 mt-4">
              {/* Pagination */}
              {paginationRange.map((page) => (
                <button
                  key={page}
                  className={`w-8 h-8 ${
                    currentPage === page ? "bg-emerald-700" : "bg-emerald-500"
                  } text-white rounded-full`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManajemenPengguna;
