import React, { useState } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from "../components/Button";

const RiwayatPenitipan = () => {
  const data = [
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1`,
      total: "Rp. 20.000",
      ulasan: "",
    },
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1`,
      total: "Rp. 20.000",
      ulasan: "",
    },
    {
      nomor: "0001",
      tanggal: "12-12-2024",
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nAlamat: maps.com/jl-alam-no-1`,
      total: "Rp. 20.000",
      ulasan: "Pengiriman Tepat waktu dan aman",
    },
    // Data lainnya...
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex h-screen">
      <SidebarUser />
      <div className="flex-grow flex flex-col">
        <div className="flex justify-between items-center p-0 bg-white">
          <HeaderUser />
        </div>
        <div className="bg-white rounded-lg p-5 flex-grow">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-emerald-500 rounded-md">
              <thead>
                <tr className="bg-Neutral-50 text-gray-600">
                  <th
                    colSpan="5"
                    className="p-3 border-b border-emerald-500 text-left text-xl font-semibold text-gray-900"
                  >
                    Riwayat Penitipan
                  </th>
                </tr>
                <tr className="bg-Neutral-50 text-gray-800">
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
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } text-gray-800 border-b border-emerald-500`}
                  >
                    <td className="p-3 border-l border-emerald-500 text-gray-800">{item.nomor}</td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="bg-emerald-100 text-gray-800 px-3 py-1 rounded-md font-semibold">
                        {item.tanggal}
                      </span>
                    </td>
                    <td className="p-3 whitespace-pre-line">
                    <span className="font-semibold text-gray-800">Jumlah Barang:</span>{" "}
                      {item.deskripsi.split("\n")[0].split(": ")[1]} 
                      <br />                      
                      <span className="font-semibold text-gray-800">Deskripsi:</span> {item.deskripsi.split("\n")[1]}<br />
                      <span className="font-semibold text-gray-800">Alamat:</span> {item.deskripsi.split("\n")[2]}
                    </td>
                    <td className="p-3 whitespace-nowrap">
                      <span className="font-semibold text-gray-800">
                        {item.total}
                      </span>
                    </td>
                    <td className="p-3 border-r border-emerald-500">
                      {item.ulasan ? (
                        <span className="px-6 py-3 bg-emerald-100 text-lg text-gray-800 rounded-md">
                          {item.ulasan}
                        </span>
                      ) : (
                        <div className="flex flex-col items-start space-y-2">
                          <input
                            type="text"
                            placeholder="Ketik Ulasan Anda"
                            className="px-4 py-2 border border-emerald-500 bg-emerald-100 rounded-md text-lg w-full"
                          />
                          <div className="flex justify-end w-full">
                            {Buttons.kirimUlasan(() => console.log("Ulasan dikirim"))}
                          </div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="p-3">
                    {/* Pagination */}
                    <div className="flex justify-end items-center space-x-2 ml-auto">
                      {[1, 2, 3].map((page) => (
                        <button
                          key={page}
                          className={`w-8 h-8 ${currentPage === page ? "bg-emerald-700" : "bg-emerald-500"} text-white rounded-full`}
                          onClick={() => handlePageChange(page)}
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
