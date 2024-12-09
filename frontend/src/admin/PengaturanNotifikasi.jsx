import React  from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import {HeaderPengirimanNotifikasi } from "../components/HeaderAdmin";
import { Buttons } from "../components/Button";

  const handleSubmit= () => {
    console.log("Notifikasi dikirim!");
  };
  const handleBatal = () => {
    alert("Batal ditekan!");
  };

const PengaturanNotifikasi = () => {
  return (
    <div className="flex h-screen">
      <SidebarAdmin />

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-1 p-6">
      <HeaderPengirimanNotifikasi />
      
          <div className="border border-emerald-500 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Pengiriman Notifikasi
            </h2>
            <p className="text-gray-600 mb-4">
              Kirimkan pesan kepada user melalui notifikasi.
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Pengguna
              </label>
              <input
                type="text"
                value="andipratama@gmail.com, budinara@gmail.com"
                className="w-full p-2 rounded-lg bg-green-100 border border-green-200"
                readOnly
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Pesan Yang Ingin Dikirimkan
              </label>
              <textarea
                className="w-full p-2 rounded-lg bg-green-100 border border-green-200"
                rows="3"
                readOnly
              >
                Selamat Ulang Tahun untuk Kamu pengguna setia Titipin
              </textarea>
            </div>
            <div className="flex justify-end space-x-4">
            {Buttons.batal(handleBatal)}
            {Buttons.kirimNotifikasi(handleSubmit)}
            </div>
          </div>
        
      </main>
    </div>
  );
};

export default PengaturanNotifikasi;
