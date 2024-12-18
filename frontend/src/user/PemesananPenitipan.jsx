import React, { useState, useEffect } from "react";
import axios from "axios";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { useNavigate } from "react-router-dom";

const loadSnap = () => {
  return new Promise((resolve, reject) => {
    if (window.snap) {
      resolve(window.snap); // Snap SDK sudah dimuat
    } else {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "YOUR_CLIENT_KEY"); // Ganti dengan Client Key Midtrans Anda
      script.onload = () => resolve(window.snap);
      script.onerror = () => reject(new Error("Gagal memuat Midtrans Snap."));
      document.body.appendChild(script);
    }
  });
};

const PemesananPenitipanCheckout = () => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi_barang: "",
    jumlah_barang: "",
    waktuMulai: "",
    waktuSelesai: "",
    alamatPenjemputan: "",
    kontak: "",
  });
  const [harga, setHarga] = useState(0);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Ambil userId dari localStorage saat pertama kali komponen dimuat
  React.useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  // Fungsi untuk menangani perubahan input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update harga berdasarkan jumlah barang
    if (name === "jumlah_barang") {
      const jumlah = parseInt(value, 10);
      setHarga(
        jumlah === 1
          ? 5000
          : jumlah === 2
          ? 10000
          : jumlah > 2
          ? jumlah * 5000
          : 0
      );
    }
  };

  // Fungsi untuk validasi form
  const validateForm = () => {
    if (!formData.nama || !formData.alamatPenjemputan || !formData.kontak) {
      setError("Semua data penitip harus diisi.");
      return false;
    }
    if (!formData.jumlah_barang || formData.jumlah_barang <= 0) {
      setError("Jumlah barang harus lebih dari 0.");
      return false;
    }
    if (!formData.waktuMulai || !formData.waktuSelesai) {
      setError("Tanggal waktu mulai dan selesai harus diisi.");
      return false;
    }
    return true;
  };

  // Fungsi handleSubmit untuk memproses form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validasi form
    if (!validateForm()) return;

    const barangData = {
      deskripsi_barang: formData.deskripsi_barang,
      jumlah_barang: formData.jumlah_barang,
      harga: harga,
    };

    const transactionData = {
      alamatPenjemputan: formData.alamatPenjemputan,
      kontak: formData.kontak,
      nama: formData.nama,
      duration: {
        startDate: formData.waktuMulai,
        endDate: formData.waktuSelesai,
      },
      jarak_jemput: 10, // Gantilah ini dengan nilai yang sesuai
      total_biaya_jemput: harga, // kalkulasi biaya jemput (gratis ongkir = harga barang)
    };

    try {
      // Mendapatkan token dari localStorage
      const token = localStorage.getItem("userToken");

      // Kirim data barang ke API backend
      const barangResponse = await fetch("http://localhost:3000/api/barang", {
        method: "POST", // Menggunakan POST karena kita mengirimkan data
        headers: {
          Authorization: `Bearer ${token}`, // Menambahkan token JWT
          "Content-Type": "application/json", // Menentukan format data yang dikirim
        },
        body: JSON.stringify(barangData), // Mengirimkan data barang dalam format JSON
      });

      if (!barangResponse.ok) {
        throw new Error("Gagal menambahkan barang.");
      }

      // Kirim data transaksi ke API backend
      const transactionResponse = await fetch(
        "http://localhost:3000/api/transactions",
        {
          method: "POST", // Menggunakan POST karena kita mengirimkan transaksi
          headers: {
            Authorization: `Bearer ${token}`, // Menambahkan token JWT
            "Content-Type": "application/json", // Menentukan format data yang dikirim
          },
          body: JSON.stringify(transactionData), // Mengirimkan data transaksi dalam format JSON
        }
      );

      if (!transactionResponse.ok) {
        throw new Error("Gagal membuat transaksi.");
      }

      const transactionDataResponse = await transactionResponse.json();
      console.log("Response Transaksi:", transactionDataResponse);

      // Kirim data pembayaran untuk Midtrans
      const paymentData = {
        amount: harga, // Set amount to harga
        email: formData.kontak, // Assuming 'kontak' is used as email
        phone: formData.kontak,
        name: formData.nama,
        user_id: userId,
      };

      // Kirim request pembayaran ke backend untuk mendapatkan token
      const responsePayment = await axios.post(
        "http://localhost:3000/api/user/payment",
        paymentData
      );

      if (responsePayment.data.token) {
        // Pastikan Snap SDK sudah dimuat sebelum memulai pembayaran
        loadSnap()
          .then(() => {
            window.snap.pay(responsePayment.data.token, {
              onSuccess: function (result) {
                console.log("Payment Success:", result);
                setSuccess("Pembayaran berhasil!");
                navigate("/pemesananpenitipan");
              },
              onPending: function (result) {
                console.log("Payment Pending:", result);
                setSuccess("Pembayaran tertunda.");
              },
              onError: function (result) {
                console.log("Payment Error:", result);
                setError("Pembayaran gagal.");
              },
              onClose: function () {
                console.log("Payment window closed");
                setSuccess("Anda menutup jendela pembayaran.");
              },
            });
          })
          .catch((error) => {
            console.error("Failed to load Snap SDK:", error);
            setError("Pembayaran gagal. Coba lagi nanti.");
          });
      } else {
        setError("Token tidak tersedia.");
      }

      setFormData({
        nama: "",
        deskripsi_barang: "",
        jumlah_barang: "",
        waktuMulai: "",
        waktuSelesai: "",
        alamatPenjemputan: "",
        kontak: "",
      });
      setHarga(0);
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      setError(error.message || "Terjadi kesalahan saat membuat pemesanan.");
    }
  };

  return (
    <div className="flex min-h-screen">
      <SidebarUser />
      <div className="flex-1">
        <HeaderUser />
        <div className="p-6 min-h-screen">
          <div className="mb-6 text-left">
            <h1 className="text-2xl font-bold text-gray-700">
              Checkout Pemesanan Penitipan
            </h1>
            <p className="text-gray-600">
              Pastikan semua data sudah benar sebelum melanjutkan pembayaran.
            </p>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded p-6 space-y-6"
          >
            {/* Data Penitip */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Penitip
              </h2>
              <div>
                <label className="block text-gray-700">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">
                  Alamat Penjemputan
                </label>
                <input
                  type="text"
                  name="alamatPenjemputan"
                  value={formData.alamatPenjemputan}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Informasi Kontak</label>
                <input
                  type="text"
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
            </div>

            {/* Data Barang */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Barang
              </h2>
              <div>
                <label className="block text-gray-700">Jumlah Barang</label>
                <input
                  type="number"
                  name="jumlah_barang"
                  value={formData.jumlah_barang}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Deskripsi Barang</label>
                <input
                  type="text"
                  name="deskripsi_barang"
                  value={formData.deskripsi_barang}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                />
              </div>
            </div>

            {/* Data Waktu */}
            <div className="rounded-lg p-6 space-y-4 border border-emerald-500">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Data Waktu
              </h2>
              <div>
                <label className="block text-gray-700">Waktu Mulai</label>
                <input
                  type="date"
                  name="waktuMulai"
                  value={formData.waktuMulai}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700">Waktu Selesai</label>
                <input
                  type="date"
                  name="waktuSelesai"
                  value={formData.waktuSelesai}
                  onChange={handleChange}
                  className="w-full border rounded p-2 bg-[#d1fae5]"
                  required
                />
              </div>
            </div>

            {/* Total Harga */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-gray-700">
                Total Harga
              </h2>
              <p className="font-semibold text-lg text-gray-700">Rp. {harga}</p>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600"
              >
                Bayar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PemesananPenitipanCheckout;
