import React, { useState, useEffect } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderRiwayatPenitipan } from "../components/HeaderAdmin";
import axios from "axios";

const RiwayatPenitipan = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/riwayat"
          // Jika diperlukan otentikasi, Anda dapat menambahkan headers, contoh:
          // { headers: { Authorization: `Bearer ${your_token}` } }
        );
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactionHistory();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-0 bg-white">
          <HeaderRiwayatPenitipan />
        </div>

        {/* Konten */}
        <div className="bg-white rounded-lg p-5 flex-grow">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-emerald-500">
              <thead className="bg-white">
                <tr className="text-gray-600">
                  <th
                    colSpan="6"
                    className="p-3 border border-emerald-500 text-left text-xl font-semibold text-gray-900"
                  >
                    Daftar Pengguna
                  </th>
                </tr>
                <tr className="text-gray-800 border-b border-emerald-500">
                  <th className="p-3 text-left bg-white">Nomor</th>
                  <th className="p-3 text-left bg-white">Tanggal</th>
                  <th className="p-3 text-left bg-white">Pengguna</th>
                  <th className="p-3 text-left bg-white"> Barang</th>
                  <th className="p-3 text-left bg-white">Total</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={index}
                    className="bg-white text-gray-800 border-b border-emerald-500"
                  >
                    <td className="p-3 text-left">{item._id}</td>
                    <td className="p-3 text-left whitespace-nowrap">
                      <span className="bg-emerald-100 text-gray-800 px-3 py-1 rounded-md font-semibold">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            item.user_id?.foto ||
                            "https://via.placeholder.com/40"
                          }
                          // Import Foto dari user
                          alt="Foto Pengguna"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-semibold text-black-800">
                            {item.user_id?.name || "Data tidak tersedia"}
                          </p>
                          <p className="text-gray-700">
                            {item.user_id?.email || "Data tidak tersedia"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 whitespace-pre-line">
                      <span className="font-semibold text-gray-800">
                        Berat Barang:{" "}
                      </span>
                      {item.barang_id?.jumlah_barang || "Data tidak tersedia"}
                      <br />
                      <span className="font-semibold text-gray-800">
                        Deskripsi:{" "}
                      </span>
                      {item.barang_id?.deskripsi_barang ||
                        "Data tidak tersedia"}{" "}
                      <br />
                      <span className="font-semibold text-gray-800">
                        Alamat:{" "}
                      </span>
                      {item.titik_alamat || "Data tidak tersedia"}
                    </td>
                    <td className="p-3 border-r border-emerald-500 whitespace-nowrap">
                      <span className="text-gray-800 px-3 py-1 rounded-md">
                        {item.total_biaya || "Rp. 0"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="6" className="p-3">
                    {/* Pagination */}
                    <div className="flex justify-end items-center space-x-2">
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          className={`w-8 h-8 ${
                            currentPage === page
                              ? "bg-emerald-700"
                              : "bg-emerald-500"
                          } text-white rounded-full`}
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiwayatPenitipan;
