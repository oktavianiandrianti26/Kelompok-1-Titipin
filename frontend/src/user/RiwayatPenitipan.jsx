import React, { useState, useEffect } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import axios from "axios";

const RiwayatPenitipan = () => {
  const [transactions, setTransactions] = useState([]); // State untuk menyimpan data transaksi
  const [currentPage, setCurrentPage] = useState(1); // State untuk halaman pagination
  const itemsPerPage = 4; // Jumlah item per halaman
  const [review, setReview] = useState({}); // State untuk menyimpan ulasan

  // Fungsi untuk mengambil data riwayat transaksi dari backend
  useEffect(() => {
    const fetchTransactionHistory = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/user/riwayat/${localStorage.getItem(
            "userId"
          )}`
        );
        setTransactions(response.data);
      } catch (err) {
        console.error("Error fetching transactions:", err);
      }
    };

    fetchTransactionHistory();
  }, []);

  // Fungsi untuk mengirim ulasan ke backend
  const handleReviewSubmit = async (transactionId) => {
    try {
      const ulasan = review[transactionId];
      if (!ulasan) return;
      await axios.put(
        `http://localhost:3000/api/user/riwayat/${transactionId}`,
        {
          ulasan,
        }
      );

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
    <div className="flex min-h-screen">
      <SidebarUser />
      <div className="flex-grow flex flex-col">
        <HeaderUser />
        <div className="w-full max-w-full rounded-lg p-5">
          <div className="grid grid-cols-1 gap-4">
            {currentItems.map((item) => (
              <div
                key={item._id}
                className="border border-emerald-500 rounded-lg p-4 bg-white shadow-md"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Nomor */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">
                      Nomor Penitipan
                    </p>
                    <p>TITIPIN-0{item.nomor_riwayat}</p>
                  </div>

                  {/* Tanggal Transaksi */}
                  <div>
                    <p className="text-sm font-bold text-gray-700">Tanggal</p>
                    <p>{new Date(item.createdAt).toLocaleDateString()}</p>
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

                  {/* Ulasan */}
                  <div className="flex flex-col items-start">
                    {item.ulasan ? (
                      <span className="px-3 py-1 bg-emerald-100 rounded-md">
                        {item.ulasan}
                      </span>
                    ) : (
                      <div>
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
                  </div>
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
                onClick={() => setCurrentPage(page)}
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
