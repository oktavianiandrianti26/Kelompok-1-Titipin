import React, {useEffect, useState} from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";

const Notifikasi = () => {
  const [notifikasi, setNotifikasi] = useState([]);

  useEffect(() => {
    // Fungsi untuk mengambil notifikasi dari API
    const fetchNotifikasi = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/user/notifications/get-notifications",{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("userToken")}`, // Menambahkan token di header
          },
        });
        const data = await response.json();

        if (response.ok) {
          setNotifikasi(data.notifications);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Terjadi kesalahan saat mengambil notifikasi.");
      }
    };

    fetchNotifikasi(); // Panggil fungsi saat komponen dimuat
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar Component */}
      <SidebarUser/>

      {/* Main Content */}
      <main className="flex-1 p-3">
        <HeaderUser/>

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
                <th className="py-2 border-b border-green-500">Balasan</th>
                <th className="py-2 border-b border-green-500">Ulasan</th>
                {/* <th className="py-2 border-b border-green-500">Pesan</th> */}
              </tr>
              </thead>
              <tbody>
              {notifikasi.length > 0 ? (
                notifikasi.map((notif, index) => (
                  <tr key={index}>
                    <td className="py-2">
                      <div className="inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full">
                        {new Date(notif.updatedAt.substring(0,10)).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="py-2 border-b border-green-500">{notif.balasan}</td>

                    <td className="py-2 border-b border-green-500">{notif.ulasan}</td>

                    {/* <td className="py-2 border-b border-green-500">{notif.message}</td> */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-2 text-center">
                    Tidak ada notifikasi.
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifikasi;
