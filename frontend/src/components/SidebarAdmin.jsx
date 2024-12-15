import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Sidebar, SidebarItem } from "./sidebar";
import {
  FiBell,
  FiCreditCard,
  FiFile,
  FiGrid,
  FiHome,
  FiLogOut,
  FiMessageSquare,
  FiPackage,
  FiThumbsUp,
  FiUsers,
} from "react-icons/fi";

const SidebarAdmin = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate

  // Fungsi untuk menangani klik pada item sidebar
  const handleVisitClick = (route) => {
    navigate(route); // Arahkan ke halaman sesuai dengan route yang diberikan
  };




  return (
    <>
      <Sidebar>
        <SidebarItem icon={<FiGrid />} text="Dashboard" route="/" />
        <SidebarItem icon={<FiUsers />} text="Pengguna" route="/ManajemenPengguna" onClick={() => handleVisitClick('/ManajemenPengguna')}/>
        <SidebarItem icon={<FiPackage />} text="Penitipan" route="/ManajemenPenitipanBarang"/>
        <SidebarItem icon={<FiCreditCard />} text="Pembayaran" route="/ManajemenPembayaran" />
        <SidebarItem icon={<FiFile />} text="Riwayat" route="/RiwayatPenitipan" />
        <SidebarItem icon={<FiThumbsUp />} text="Ulasan" route="/UlasanPengguna"/>
        <SidebarItem icon={<FiBell />} text="Notifikasi" route="/PengaturanNotifikasi"/>
        <SidebarItem icon={<FiMessageSquare />} text="Chat" route="/SupportChat"/>
        <SidebarItem icon={<FiHome />} text="Beranda" beranda />
        <SidebarItem icon={<FiLogOut />} text="Keluar" keluar />
      </Sidebar>
    </>
  );
}

export default SidebarAdmin;
