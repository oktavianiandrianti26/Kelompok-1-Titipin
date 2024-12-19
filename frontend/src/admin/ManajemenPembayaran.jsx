import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderManajemenPembayaran } from "../components/HeaderAdmin";

const ManajemenPembayaran = ({ showHeader = true, showSidebar = true }) => {
  const [payments, setPayments] = useState([]); // State untuk menyimpan data pembayaran
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman saat ini
  const itemsPerPage = 6; // Jumlah item per halaman

  // Mengambil data pembayaran dari backend
  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/payments"
        );
        setPayments(response.data); // Menyimpan data pembayaran ke state
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };
    fetchPayments();
  }, []);

  // Logika untuk pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Mengubah halaman saat ini
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {showSidebar && <SidebarAdmin />}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        {showHeader && (
          <div className="flex justify-between items-center p-0 bg-white">
            <HeaderManajemenPembayaran />
          </div>
        )}

        <div className="w-full max-w-full rounded-lg p-5">
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <div
                key={item._id} // Menggunakan ID unik dari pembayaran
                className="border border-emerald-500 rounded-lg p-4 bg-white shadow-md"
              >
                {/* Data pembayaran */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Nomor Transaksi */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      No Pembayaran
                    </p>
                    <p>{item.no_transaksi}</p>
                  </div>

                  {/* Tanggal Pembayaran */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Tanggal</p>
                    <p>
                      {new Date(item.tanggal_pembayaran).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Informasi Pengguna */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Pengguna</p>
                    <p>{item.user_id?.name || "Nama tidak tersedia"}</p>
                    <p className="text-sm text-gray-600">
                      {item.user_id?.email || "Email tidak tersedia"}
                    </p>
                  </div>

                  {/* Total Pembayaran */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Total</p>
                    <p>
                      Rp.{" "}
                      {item.jumlah_bayar.toLocaleString() || "Tidak tersedia"}
                    </p>
                  </div>

                  {/* Status Pembayaran */}
                  <div>
                    <p className="text-sm font-bold text-gray-700 mb-2">
                      Status
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        item.status_pembayaran === "completed"
                          ? "bg-emerald-500"
                          : item.status_pembayaran === "pending"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.status_pembayaran || "Tidak tersedia"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center space-x-2">
            {Array.from(
              { length: Math.ceil(payments.length / itemsPerPage) },
              (_, i) => i + 1
            ).map((page) => (
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
  );
};

export default ManajemenPembayaran;
