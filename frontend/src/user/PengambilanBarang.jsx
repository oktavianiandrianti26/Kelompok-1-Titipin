import React, { useState } from "react";
import HeaderUser from "../components/HeaderUser";
import SidebarUser from "../components/SidebarUser";
import { Buttons } from "../components/button"; // Sesuaikan dengan path file button.jsx

const PengambilanBarang = () => {
  // Data barang dengan ID penitipan, jumlah barang, dan deskripsi
  const [barang] = useState([
    {
      idPenitipan: 101,
      jumlahBarang: 3,
      deskripsi: "Vas Bunga, Koper, dan Bola Basket",
    },
    {
      idPenitipan: 102,
      jumlahBarang: 2,
      deskripsi: "Gitar Akustik dan Helm",
    },
  ]);

  // State untuk menyimpan ID barang yang sedang dalam mode form
  const [formState, setFormState] = useState({
    tambahWaktu: null,
    prosesPengambilan: null,
  });

  const handleTambahWaktuClick = (idPenitipan) => {
    setFormState((prevState) => ({
      ...prevState,
      tambahWaktu: prevState.tambahWaktu === idPenitipan ? null : idPenitipan,
      prosesPengambilan: null, // Tutup form proses pengambilan
    }));
  };

  const handleProsesPengambilanClick = (idPenitipan) => {
    setFormState((prevState) => ({
      ...prevState,
      prosesPengambilan:
        prevState.prosesPengambilan === idPenitipan ? null : idPenitipan,
      tambahWaktu: null, // Tutup form tambah waktu
    }));
  };

  const handleBatalClick = () => {
    setFormState({
      tambahWaktu: null,
      prosesPengambilan: null,
    });
  };

  const handleKirimLokasiClick = () => {
    console.log("Kirim Lokasi");
  };

  const handleLakukanPembayaranClick = () => {
    console.log("Lakukan Pembayaran clicked");
  };

  return (
    <div className="flex h-screen">
      <SidebarUser />
      <div className="flex flex-col w-full">
        <HeaderUser />

        {/* Konten Pengembalian */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-600">
            Pengembalian Barang
          </h2>
          <p className="text-base my-2 text-slate-500">
            Lakukan isian form di bawah ini dengan data yang benar untuk
            memproses pengembalian barang.
          </p>

          {/* Generate Konten Dinamis Berdasarkan Data Barang */}
          {barang.map((item) => (
            <div
              key={item.idPenitipan}
              className="border-2 border-emerald-500 rounded-lg my-4"
            >
              <div className="border-b-2 border-emerald-500">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-500">
                    Informasi Barang - ID Penitipan: {item.idPenitipan}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-600">
                  Jumlah Barang:{" "}
                  <span className="font-normal">{item.jumlahBarang}</span>
                </p>
                <p className="font-semibold text-slate-600">
                  Deskripsi:{" "}
                  <span className="font-normal">{item.deskripsi}</span>
                </p>
              </div>
              <div className="border-t-2 border-emerald-500 p-4 flex gap-4 justify-end">
                {Buttons.tambahWaktu(() =>
                  handleTambahWaktuClick(item.idPenitipan)
                )}
                {Buttons.prosesPengambilan(() =>
                  handleProsesPengambilanClick(item.idPenitipan)
                )}
              </div>

              {/* Form Tambah Waktu */}
              {formState.tambahWaktu === item.idPenitipan && (
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-slate-600">
                    Tambah Waktu untuk ID Penitipan: {item.idPenitipan}
                  </h3>
                  <input
                    type="date"
                    className="border-none rounded w-full px-2 py-1 bg-emerald-100"
                  />
                  <div className="mt-4 flex gap-4 justify-end">
                    {Buttons.batal(handleBatalClick)}
                    {Buttons.lakukanPembayaran(handleLakukanPembayaranClick)}
                  </div>
                </div>
              )}

              {/* Form Proses Pengambilan */}
              {formState.prosesPengambilan === item.idPenitipan && (
                <div className="p-4 text-slate-600">
                  <h3 className="text-lg font-semibold mb-2 ">
                    Proses Pengambilan untuk ID Penitipan: {item.idPenitipan}
                  </h3>
                  <div className="mb-2">
                    <label className="block font-medium">
                      Link Google Maps:
                    </label>
                    <input
                      type="url"
                      placeholder="Masukkan link Google Maps"
                      className="border-none rounded w-full px-2 py-1 bg-emerald-100"
                    />
                  </div>
                  <div>
                    <label className="block font-medium">Nomor HP:</label>
                    <input
                      type="tel"
                      placeholder="Masukkan nomor HP"
                      className="border-none rounded w-full px-2 py-1 bg-emerald-100"
                    />
                  </div>
                  <div className="mt-4 flex gap-4 justify-end">
                    {Buttons.batal(handleBatalClick)}
                    {Buttons.kirimLokasi(handleKirimLokasiClick)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PengambilanBarang;
