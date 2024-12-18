import React, { useState, useEffect } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import axios from "axios";

const PemantauanBarang = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const [error, setError] = useState(null);

  

  // Mendapatkan token dari localStorage
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setError("Tidak ada token, silakan login terlebih dahulu.");
        return;
      }

      try {
        // Pastikan token benar dan ditambahkan dengan benar ke header
        const response = await axios.get("http://localhost:3000/api/barang", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        

        setData(response.data.data);
        console.log(response)
      } catch (error) {
        // Penanganan error jika terjadi 401 Unauthorized
        if (error.response && error.response.status === 401) {
          setError("Token tidak valid atau sesi sudah kedaluwarsa. Silakan login ulang.");
        } else {
          setError("Terjadi kesalahan saat mengambil data.");
        }
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

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
            {/* Tabel */}
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
                {error ? (
                  <tr>
                    <td colSpan="1" className="p-3 text-center text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => {
                    return (
                      <tr
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } text-gray-600 border-b border-emerald-500`}
                      >
                        <td className="p-3 border-l border-emerald-500 whitespace-pre-line">
                          <span className="font-semibold text-gray-800">
                          jumlah_barang:
                          </span>{" "}
                          <span className="text-gray-700">
                            {item.jumlah_barang}
                          </span>
                          <br />
                          <span className="font-semibold text-gray-800">
                          deskripsi:
                          </span>{" "}
                          <span className="text-gray-800">
                            {item.deskripsi_barang}
                          </span>
                          <br />
                        </td>
                      </tr>
                    );
                  })
                )}
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
