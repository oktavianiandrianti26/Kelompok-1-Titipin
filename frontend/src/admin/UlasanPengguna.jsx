import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderUlasanPengguna } from "../components/HeaderAdmin";
import axios from "axios";

const UlasanPengguna = () => {
  const [reviews, setReviews] = useState([]);

  // Fungsi untuk mengambil data ulasan
  const fetchReviews = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/admin/ulasan");
      setReviews(response.data);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Fungsi untuk mengirim balasan dan notifikasi
  const handleReplyAndNotify = async (id, userId, ulasan) => {
    const balasanTextarea = document.getElementById(`balasan-${id}`); // Ambil elemen textarea
    const balasan = balasanTextarea.value; // Ambil nilai balasan

    if (!balasan) {
      alert("Balasan tidak boleh kosong!");
      return;
    }

    try {
      // Kirim balasan ke backend
      const replyResponse = await axios.put(`http://localhost:3000/api/admin/ulasan/${id}`, { balasan });
      console.log(replyResponse.data.message);

      // Kirim notifikasi ke backend
      const notificationPayload = {
        balasan,
        ulasan,
        user_id: userId,
      };
      const notifyResponse = await axios.post(
        `http://localhost:3000/api/user/notifications/push-notifications`,
        notificationPayload,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(notifyResponse.data.message);

      // Tampilkan pesan sukses
      alert("Balasan dan notifikasi berhasil dikirim.");

      // Kosongkan textarea setelah berhasil
      balasanTextarea.value = "";

      // Ambil ulasan lagi untuk memperbarui tampilan
      fetchReviews();
    } catch (err) {
      console.error("Error replying or sending notification:", err);
      alert("Terjadi kesalahan saat mengirim balasan atau notifikasi.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SidebarAdmin />

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <HeaderUlasanPengguna />
        <div className="p-4 sm:p-6 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="border border-emerald-500 rounded-lg p-4 bg-white shadow-md"
              >
                {/* Informasi Pengguna */}
                <div className="mb-2">
                  <p className="font-medium text-gray-700">
                    {review.user_id?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {review.user_id?.email || "N/A"}
                  </p>
                </div>

                {/* Ulasan dan Balasan */}
                <p className="mb-4 text-gray-600">Ulasan: {review.ulasan}</p>
                <p className="mb-4 text-gray-600">Balasan: {review.balasan || "Belum ada balasan"}</p>

                {/* Textarea untuk Balasan */}
                <textarea
                  id={`balasan-${review._id}`} // Set ID unik untuk setiap textarea
                  placeholder="Ketik balasan Anda di sini"
                  className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-green-500"
                  style={{ backgroundColor: "#d1fae5" }}
                />

                {/* Tombol Aksi */}
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      handleReplyAndNotify(review._id, review.user_id._id, review.ulasan)
                    }
                    className="w-full bg-green-500 text-white text-sm px-4 py-2 rounded-lg hover:bg-green-600 transition"
                  >
                    Kirim Balasan dan Notifikasi
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UlasanPengguna;
