import React, { useState, useEffect } from "react";
import axios from "axios";
import HeaderUser from "../components/HeaderUser";
import SidebarUser from "../components/SidebarUser";
import { Buttons } from "../components/Button"; // Pastikan Buttons sudah diimport dengan benar

const PengambilanBarang = () => {
  const [barang, setBarang] = useState([]); // State untuk data barang
  const [formState, setFormState] = useState({
    tambahWaktu: null,
    waktuTambahan: 0, // Tambahan waktu (dalam hari)
    harga: 0, // Total harga
  });
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [itemsPerPage] = useState(1); // Barang per halaman

  const token = localStorage.getItem("userToken");

  // Mengambil data barang dari API
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/barang", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBarang(response.data.data); // Menyimpan data yang diterima ke state barang
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchBarang();
  }, [token]);

  // Handle klik tambah waktu
  const handleTambahWaktuClick = (id_barang) => {
    setFormState((prevState) => ({
      ...prevState,
      tambahWaktu: prevState.tambahWaktu === id_barang ? null : id_barang,
    }));
  };

  // Handle perubahan input tanggal
  const handleWaktuChange = (e) => {
    const tanggalBaru = new Date(e.target.value);
    const tanggalAwal = new Date(); // Tanggal sekarang

    // Menghitung selisih hari antara tanggal awal dan tanggal yang dipilih
    const selisihHari = Math.ceil(
      (tanggalBaru - tanggalAwal) / (1000 * 3600 * 24)
    );

    // Perhitungan harga berdasarkan selisih hari
    const hargaPerHari = 5000; // Harga per hari
    const totalHarga = selisihHari * hargaPerHari;

    setFormState((prevState) => ({
      ...prevState,
      waktuTambahan: selisihHari,
      harga: totalHarga,
    }));
  };

  // Handle klik batal
  const handleBatalClick = () => {
    setFormState({
      tambahWaktu: null,
      waktuTambahan: 0,
      harga: 0,
    });
  };

  // Handle klik lakukan pembayaran
  const handleLakukanPembayaranClick = () => {
    console.log("Lakukan Pembayaran clicked, Total Harga: Rp", formState.harga);
  };

  // Menghitung data barang yang ditampilkan sesuai dengan halaman
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = barang.slice(indexOfFirstItem, indexOfLastItem);

  // Handle perubahan halaman
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex min-h-screen">
      <SidebarUser />
      <div className="flex flex-col w-full">
        <HeaderUser />

        {/* Konten Pengambilan */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-slate-600">
            Pengambilan Barang
          </h2>
          <p className="text-base my-2 text-slate-500">
            Lakukan isian form di bawah ini dengan data yang benar untuk
            memproses pengambilan barang.
          </p>

          {/* Generate Konten Dinamis Berdasarkan Data Barang */}
          {currentItems.map((item) => (
            <div
              key={item.id_barang}
              className="border-2 border-emerald-500 rounded-lg my-4"
            >
              <div className="border-b-2 border-emerald-500">
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-slate-500">
                    Informasi Barang - ID Barang: {item.id_barang}
                  </h2>
                </div>
              </div>
              <div className="p-4">
                <p className="font-semibold text-slate-600">
                  Jumlah Barang:{" "}
                  <span className="font-normal">{item.jumlah_barang}</span>
                </p>
                <p className="font-semibold text-slate-600">
                  Deskripsi:{" "}
                  <span className="font-normal">{item.deskripsi_barang}</span>
                </p>
              </div>
              <div className="border-t-2 border-emerald-500 p-4 flex gap-4 justify-end">
                {Buttons.tambahWaktu(() =>
                  handleTambahWaktuClick(item.id_barang)
                )}
              </div>

              {/* Form Tambah Waktu */}
              {formState.tambahWaktu === item.id_barang && (
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-slate-600">
                    Tambah Waktu untuk ID Penitipan: {item.id_barang}
                  </h3>
                  <input
                    type="date"
                    className="border-none rounded w-full px-2 py-1 bg-emerald-100"
                    onChange={handleWaktuChange}
                  />
                  {/* Display the total price */}
                  <div className="text-right mt-4 text-slate-600 text-lg">
                    <p className="font-normal">
                      Total Harga:{" "}
                      <span className="font-semibold">
                        Rp {formState.harga.toLocaleString() || 0}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex gap-4 justify-end">
                    {Buttons.batal(handleBatalClick)}
                    {Buttons.lakukanPembayaran(handleLakukanPembayaranClick)}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Pagination Buttons */}
          <div className="flex justify-end items-center space-x-2 ml-auto">
            {[...Array(Math.ceil(barang.length / itemsPerPage))].map(
              (_, index) => (
                <button
                  key={index + 1}
                  className={`w-8 h-8 ${
                    currentPage === index + 1
                      ? "bg-emerald-700"
                      : "bg-emerald-500"
                  } text-white rounded-full`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PengambilanBarang;
