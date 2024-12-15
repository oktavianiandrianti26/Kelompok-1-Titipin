import { useState } from "react";
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

function SidebarUser() {
  return (
    <>
      <Sidebar>
        <SidebarItem icon={<FiGrid />} text="Dashboard" route="/user/dashboard" active={location.pathname === "/user/dashboard"} />
        <SidebarItem icon={<FiPackage />} text="Penitipan" route="/PemesananPenitipan" active={location.pathname === "/PemesananPenitipan"} />
        <SidebarItem icon={<FiTruck />} text="Pengembalian" route="/PengambilanBarang" active={location.pathname === "/PengambilanBarang"} />
        <SidebarItem icon={<FiEye />} text="Status" route="/PemantauanBarang" active={location.pathname === "/PemantauanBarang"} />
        <SidebarItem icon={<FiFile />} text="Riwayat" route="/RiwayatPenitipan" active={location.pathname === "/RiwayatPenitipan"} />
        <SidebarItem icon={<FiBell />} text="Notifikasi" route="/Notifikasi" active={location.pathname === "/Notifikasi"} />
        <SidebarItem icon={<FiMessageSquare />} text="Chat" route="/faq" active={location.pathname === "/faq"} />
        <SidebarItem icon={<FiUser />} text="Profil" route="/EditProfile" active={location.pathname === "/EditProfile"} />
        <SidebarItem icon={<FiHome />} text="Beranda" beranda  />
        <SidebarItem icon={<FiLogOut />} text="Keluar" keluar   />
      </Sidebar>
    </>
  );
}

export default SidebarUser;


