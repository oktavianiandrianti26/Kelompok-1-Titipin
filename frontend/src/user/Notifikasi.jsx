import React from "react";
import SidebarUser from "../components/SidebarUser";

const notifikasi = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <SidebarUser />

      {/* Main Content */}
      <main className="flex-1 p-8">
      <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Selamat Datang</h1>
        <p className="text-base font-normal text-gray-500">
        Anda dapat melihat notifikasi pemesanan disini Anda
        </p>
      </div>
      </header>
            <div className="border border-green-500 rounded-lg">
                <div className="flex justify-between items-center p-4 border-b border-green-500">
                    <h2 className="text-lg font-semibold">Notifikasi</h2>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="p-4">
                    <table className="w-full text-left">
                        <thead>
                            <tr>
                                <th className="py-2 border-b border-green-500">Tanggal</th>
                                <th className="py-2 border-b border-green-500">Barang</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="py-2">
                                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                        12 - 12 - 2024
                                    </div>
                                </td>
                                <td className="py-2 border-b border-green-500">Pembayaran Berhasil Dilakukan</td>
                            </tr>
                            <tr>
                                <td className="py-2">
                                    <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
                                        12 - 12 - 2024
                                    </div>
                                </td>
                                <td className="py-2">
                                    <span className="font-semibold">Peringatan</span> masa penitipan anda sisa 3 hari segera konfirmasi masa penitipan pada menu "pengambilan barang"
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        
      </main>
    </div>
  );
};

export default notifikasi;
