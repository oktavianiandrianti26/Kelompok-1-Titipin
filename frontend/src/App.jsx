

import React from "react";
import { HeaderAdmin, HeaderManajemenPengguna, HeaderManajemenPenitipanBarang, HeaderManajemenPembayaran, HeaderRiwayatPenitipan, HeaderUlasanPengguna, HeaderPengirimanNotifikasi, HeaderSupportChat} 
from "./components/headerAdmin"; 

const App = () => {
  return (
    <div>
      {/* Menampilkan Header Admin */}
      <HeaderAdmin />

      {/* Menampilkan Header ManajemenPengguna */}
      <HeaderManajemenPengguna />

      {/* Menampilkan Header ManajemenPentipanBarang */}
      <HeaderManajemenPenitipanBarang />

      {/* Menampilkan Header Manajemen Pembayaran */}
      <HeaderManajemenPembayaran />

      {/* Menampilkan Hader Riwayat Penitipan */}
      <HeaderRiwayatPenitipan />

      {/* Menampilkan Header Ulasan Pengguna*/}
      <HeaderUlasanPengguna />

      {/* Menampilkan Header Pengiriman Notifikasi*/}
      <HeaderPengirimanNotifikasi />

       {/* Menampilkan Header Support Chat*/}
       <HeaderSupportChat />
    </div>
  );
};



export default App;
