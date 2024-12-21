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
          "https://api-titipin.vocasia-fsjs-c.fun/api/admin/riwayat"
        );
        console.log(response.data);
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
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-0 bg-white">
          <HeaderRiwayatPenitipan />
        </div>

        <div className="w-full max-w-full rounded-lg p-5">
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="border border-emerald-500 rounded-lg p-4 bg-white shadow-md"
              >
                {/* Data Transaksi (responsif dengan Flexbox) */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Image Barang */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      Gambar Barang
                    </p>
                    <img
                      src={"https://api-titipin.vocasia-fsjs-c.fun/uploads/" + item.fileBarang}
                      alt={item.deskripsi_barang}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                  </div>

                  {/* Nomor Transaksi */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      No Penitipan
                    </p>
                    <p>TITIPIN-0{item.nomor_riwayat}</p>
                  </div>

                  {/* Tanggal Transaksi */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Tanggal</p>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>

                  {/* Informasi Pengguna */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Pengguna</p>
                    <p>{item.user_id?.name || "Nama tidak tersedia"}</p>
                    <p className="text-sm text-gray-600">
                      {item.user_id?.email || "Email tidak tersedia"}
                    </p>
                  </div>

                  {/* Barang */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Barang</p>
                    <p>
                      Jumlah: {item.jumlah_barang || "Tidak tersedia"}
                      <br />
                      Deskripsi: {item.deskripsi_barang || "Tidak tersedia"}
                    </p>
                  </div>

                  {/* Total Harga */}
                  {/* <div>
                    <p className="text-sm font-bold text-gray-700">Total</p>
                    <p>Rp. {item.harga || "Rp. 0"}</p>
                  </div> */}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex justify-end items-center space-x-2">
            {Array.from(
              { length: Math.ceil(transactions.length / itemsPerPage) },
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

export default RiwayatPenitipan;
