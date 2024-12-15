import React, { useState, useEffect } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from "../components/Button";
import axios from "axios";

const RiwayatPenitipan = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [review, setReview] = useState({});

  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/riwayat/675b4b9840b0c8bb139cfc08`
        );
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactionHistory();
  }, []);

  const handleReviewSubmit = async (transactionId) => {
    try {
      const ulasan = review[transactionId];
      if (!ulasan) return;
          // Ambil data riwayat transaksi berdasarkan transactionId dari API
      await axios.put(`http://localhost:3000/api/user/riwayat/${transactionId}`, {
        ulasan,
      });

      alert("Ulasan berhasil dikirim!");
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction._id === transactionId
            ? { ...transaction, ulasan }
            : transaction
        )
      );
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex h-screen">
      <SidebarUser />
      <div className="flex-grow flex flex-col">
        <HeaderUser />
        <div className="bg-white rounded-lg p-5 flex-grow">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-emerald-500 rounded-md">
              <thead>
                {/* Judul Utama */}
                <tr>
                  <th
                    colSpan="5"
                    className="p-4 border-b border-emerald-500 text-left text-xl font-semibold text-gray-900"
                  >
                    Riwayat Penitipan
                  </th>
                </tr>
                {/* Header Kolom */}
                <tr className="bg-gray-50 text-gray-800">
                  <th className="p-3 border-l border-emerald-500 text-left">Nomor</th>
                  <th className="p-3 text-left">Tanggal</th>
                  <th className="p-3 text-left">Barang</th>
                  <th className="p-3 text-left">Total</th>
                  <th className="p-3 border-r border-emerald-500 text-left">Ulasan</th>
                </tr>
                <tr>
                  <td colSpan="5">
                    <hr className="border-t-2 border-emerald-500" />
                  </td>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } text-gray-800 border-b border-emerald-500`}
                  >
                    {/* Nomor */}
                    <td className="p-3 border-l border-emerald-500">{item._id}</td>
                    {/* Tanggal */}
                    <td className="p-3">
                      <span className="bg-emerald-100 px-3 py-1 rounded-md font-semibold">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    {/* Barang */}
                    <td className="p-3 whitespace-pre-line">
                      {/* Menampilkan jumlah barang, deskripsi, dan alamat */}
                      <div>
                        <span className="font-semibold text-gray-800">
                          Berat Barang: {""}
                        </span>
                        {item.barang_id?.berat || "Data tidak tersedia"}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Deskripsi: {""}
                        </span>
                        {item.barang_id?.deskripsi || "Data tidak tersedia"}{" "}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Alamat: {""}
                        </span>
                        {item.titik_alamat || "Data tidak tersedia"}
                      </div>
                    </td>
                    {/* Total */}
                    <td className="p-3 font-semibold">{item.total_biaya}</td>
                    {/* Ulasan */}
                    <td className="p-3 border-r border-emerald-500">
                      {item.ulasan ? (
                        <span className="px-3 py-1 bg-emerald-100 rounded-md">
                          {item.ulasan}
                        </span>
                      ) : (
                        <div className="flex flex-col items-start">
                          <input
                            type="text"
                            placeholder="Ketik ulasan"
                            value={review[item._id] || ""}
                            onChange={(e) =>
                              setReview({
                                ...review,
                                [item._id]: e.target.value,
                              })
                            }
                            className="px-3 py-2 border border-emerald-500 rounded-md w-full"
                          />
                          <button
                            onClick={() => handleReviewSubmit(item._id)}
                            className="mt-2 px-4 py-2 bg-emerald-500 text-white rounded-md"
                          >
                            Kirim Ulasan
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              {/* Pagination */}
              <tfoot>
                <tr>
                  <td colSpan="5" className="p-3">
                    <div className="flex justify-end space-x-2">
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 ${
                            currentPage === page
                              ? "bg-emerald-700 text-white"
                              : "bg-emerald-500 text-white"
                          } rounded-full`}
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
