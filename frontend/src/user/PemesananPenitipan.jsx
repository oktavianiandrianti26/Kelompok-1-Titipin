import React, { useState } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";

const PemesananPenitipan = () => {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsiBarang: "",
    jumlahBarang: "",
    waktuMulai: "",
    waktuSelesai: "",
    alamatPenjemputan: "",
    tanggalPenjemputan: "",
    kontak: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarUser />
      <div className="flex-1">
        <HeaderUser />
        <div className="p-6 bg-gray-50 min-h-screen">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded p-6 space-y-4"
          >
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
              <label className="block text-gray-700">Deskripsi Barang</label>
              <input
                type="text"
                name="deskripsiBarang"
                value={formData.deskripsiBarang}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-[#d1fae5]"
              />
            </div>

            <div>
              <label className="block text-gray-700">Jumlah Barang</label>
              <input
                type="number"
                name="jumlahBarang"
                value={formData.jumlahBarang}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-[#d1fae5]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Waktu Mulai Penitipan</label>
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
              <label className="block text-gray-700">Waktu Selesai Penitipan</label>
              <input
                type="date"
                name="waktuSelesai"
                value={formData.waktuSelesai}
                onChange={handleChange}
                className="w-full border rounded p-2 bg-[#d1fae5]"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700">Alamat Penjemputan</label>
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
              <label className="block text-gray-700">Tanggal Penjemputan</label>
              <input
                type="date"
                name="tanggalPenjemputan"
                value={formData.tanggalPenjemputan}
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

            <div className="flex justify-between items-center">
              <button
                type="button"
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Lakukan Pembayaran
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PemesananPenitipan;
