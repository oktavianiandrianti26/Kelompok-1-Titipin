import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
//admin
//import ManajemenPembayaran from "./admin/ManajemenPembayaran";
//import ManajemenPengguna from "./admin/ManajemenPengguna"
import DashboardAdmin from "./admin/Dashboard"
//import ManajemenPenitipanBarang from "./admin/ManajemenPenitipanBarang"
//import PengaturanNotifikasi from "./admin/PengaturanNotifikasi"
//import SupportChat from "./admin/SupportChat"
//import UlasanPengguna from "./admin/UlasanPengguna"
//import RiwayatPenitipan from "./admin/RiwayatPenitipan"

//User//
import Login from "./user/Login";
import Register from "./user/Register"; 
import DashboardUser from "./user/dashboard";
import PengambilanBarang from "./user/PengambilanBarang";
import Notifikasi from "./user/Notifikasi";
import RiwayatPenitipan from "./user/RiwayatPenitipan";
import Chat from "./user/faq";
import Landing from './landing/LandingPage';
import EditProfile from './user/EditProfile';
import PemesananPenitipan from "./user/PemesananPenitipan";
import PemantauanBarang from "./user/PemantauanBarang";
// import Checkout from "./user/checkout";

        //<Route path="/ManajemenPembayaran" element={<ManajemenPembayaran />}/>
        //<Route path="/ManajemenPengguna" element={<ManajemenPengguna />}/>
        //<Route path="/ManajemenPenitipanBarang" element={<ManajemenPenitipanBarang />}/>
        //<Route path="/PengaturanNotifikasi" element={<PengaturanNotifikasi />}/>
        //<Route path="/SupportChat" element={<SupportChat />}/>
        //<Route path="/UlasanPengguna" element={<UlasanPengguna />}/>
        //<Route path="/RiwayatPenitipan" element={<RiwayatPenitipan />}/>



function App() {
  return (
    <BrowserRouter>
    
        <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/dashboard" element={<DashboardUser />} />
        <Route path="/PemesananPenitipan" element={<PemesananPenitipan />} />
        <Route path="/PengambilanBarang" element={<PengambilanBarang />} />
        <Route path="/Notifikasi" element={<Notifikasi />} />
        <Route path="/RiwayatPenitipan" element={<RiwayatPenitipan />} />
        <Route path="/faq" element={<Chat />} />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/PemantauanBarang" element={<PemantauanBarang />} />
        {/* <Route path="/checkout" element={<Checkout />} /> */}

        <Route path="/admin/dashboard" element={<DashboardAdmin />}/>
        
        </Routes>
    </BrowserRouter>
  );
}
export default App;
