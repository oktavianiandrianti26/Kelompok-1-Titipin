import React, { useState } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";

const PemantauanBarang = () => {
  const data = [
    {
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nStatus: Dalam Penjemputan`,
    },
    {
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nStatus: Dalam Penitipan`,
    },
    {
      deskripsi: `Jumlah Barang: 3\nDeskripsi: Barang adalah Vas Bunga, Koper, dan Bola Basket\nStatus: Dalam Pengantaran`,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getStatusClass = (status) => {
    if (status === "Dalam Penjemputan" || status === "Dalam Pengantaran") {
      return "text-yellow-600 bg-yellow-100 p-2 rounded-lg";  
    }
    if (status === "Dalam Penitipan") {
      return "text-emerald-500 bg-emerald-100 p-2 rounded-lg";  
    }
    return "";
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
            {/* Tabel*/}
            <table className="w-full border-collapse border border-emerald-500 rounded-md">
              <thead>
                <tr className="bg-Neutral-50 text-gray-600">
                  <th
                    colSpan="1"
                    className="p-3 border-b border-emerald-500 text-left text-xl font-semibold text-gray-900"
                  >
                    Pemantauan Barang
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => {
                  const status = item.deskripsi.split("\n")[2].split(":")[1].trim();
                  return (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } text-gray-600 border-b border-emerald-500`}
                    >
                      <td className="p-3 border-l border-emerald-500 whitespace-pre-line">
                        <span className="font-semibold text-gray-800">
                          Jumlah Barang:
                        </span>{" "}
                        <span className="text-gray-700">{item.deskripsi.split("\n")[0].split(":")[1].trim()}</span>
                        <br />
                        <span className="font-semibold text-gray-800">
                          Deskripsi:
                        </span>{" "}
                        <span className="text-gray-800">{item.deskripsi.split("\n")[1].split(":")[1].trim()}</span>
                        <br />
                        <div className="mt-6 mb-4">  
                          <span className={getStatusClass(status)}>{status}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="1" className="p-3">
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

export default PemantauanBarang;
