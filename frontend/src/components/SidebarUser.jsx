import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarItem } from "./sidebar";
import {
  FiBell,
  FiCreditCard,
  FiEye,
  FiFile,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMenu,
  FiMessageSquare,
  FiPackage,
  FiThumbsUp,
  FiTruck,
  FiUser,
  FiUsers,
} from "react-icons/fi";

const SidebarUser = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk menangani klik pada item sidebar
  const handleVisitClick = (route) => {
    navigate(route); // Arahkan ke halaman sesuai dengan route yang diberikan
  };



  return (
    <>
      <Sidebar>
        <SidebarItem icon={<FiGrid />} text="Dashboard" route="/dashboard"/>
        <SidebarItem icon={<FiPackage />} text="Penitipan" route="/PemesananPenitipan" onClick={() => handleVisitClick('/PemesananPenitipan')}/>
        <SidebarItem icon={<FiTruck />} text="Pengembalian" route="/PengambilanBarang"/>
        <SidebarItem icon={<FiEye />} text="Status" route="/PemantauanBarang" />
        <SidebarItem icon={<FiFile />} text="Riwayat" route="/RiwayatPenitipan"/>
        <SidebarItem icon={<FiBell />} text="Notifikasi" route="/Notifikasi"/>
        <SidebarItem icon={<FiMessageSquare />} text="Chat" route="/Faq"/>
        <SidebarItem icon={<FiUser />} text="Profil" route="/EditProfile"/>
        <SidebarItem icon={<FiHome />} text="Beranda" beranda route="/"/>
        <SidebarItem icon={<FiLogOut />} text="Keluar" keluar route="/Login"/>
      </Sidebar>
    </>
  );
}

export default SidebarUser;
