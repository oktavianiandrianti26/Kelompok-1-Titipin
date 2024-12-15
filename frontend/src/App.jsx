import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
//admin
import ManajemenPembayaran from "./admin/ManajemenPembayaran";
import ManajemenPengguna from "./admin/ManajemenPengguna";
import DashboardAdmin from "./admin/Dashboard";
import ManajemenPenitipanBarang from "./admin/ManajemenPenitipanBarang";
import PengaturanNotifikasi from "./admin/PengaturanNotifikasi";
import SupportChat from "./admin/SupportChat";
import UlasanPengguna from "./admin/UlasanPengguna";
import RiwayatPenitipanAdmin from "./admin/RiwayatPenitipan";

//User//
import Login from "./user/Login";
import Register from "./user/Register";
import DashboardUser from "./user/dashboard";
import PengambilanBarang from "./user/PengambilanBarang";
import Notifikasi from "./user/Notifikasi";
import RiwayatPenitipanUser from "./user/RiwayatPenitipan";
import Chat from "./user/faq";
import Landing from "./landing/LandingPage";
import EditProfile from "./user/EditProfile";
import PemesananPenitipan from "./user/PemesananPenitipan";
import PemantauanBarang from "./user/PemantauanBarang";
import Checkout from "./user/Checkout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Universal */}
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        {/* Midtrans Test Payment */}
        <Route path="/checkout" element={<Checkout />} />
        {/* User */}
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/PemesananPenitipan" element={<PemesananPenitipan />} />
        <Route path="/PengambilanBarang" element={<PengambilanBarang />} />
        <Route path="/Notifikasi" element={<Notifikasi />} />
        <Route path="/RiwayatPenitipan" element={<RiwayatPenitipanUser />} />
        <Route path="/faq" element={<Chat />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/PemantauanBarang" element={<PemantauanBarang />} />
        {/* Admin */}
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
        <Route path="/ManajemenPembayaran" element={<ManajemenPembayaran />} />
        <Route path="/ManajemenPengguna" element={<ManajemenPengguna />} />
        <Route
          path="/ManajemenPenitipanBarang"
          element={<ManajemenPenitipanBarang />}
        />
        <Route
          path="/PengaturanNotifikasi"
          element={<PengaturanNotifikasi />}
        />
        <Route path="/SupportChat" element={<SupportChat />} />
        <Route path="/UlasanPengguna" element={<UlasanPengguna />} />
        <Route
          path="/admin/RiwayatPenitipan"
          element={<RiwayatPenitipanAdmin />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
