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
        <SidebarItem icon={<FiGrid />} text="Dashboard" route="/" />
        <SidebarItem icon={<FiPackage />} text="Penitipan" />
        <SidebarItem icon={<FiTruck />} text="Pengembalian" />
        <SidebarItem icon={<FiEye />} text="Status" active />
        <SidebarItem icon={<FiFile />} text="Riwayat" />
        <SidebarItem icon={<FiBell />} text="Notifikasi" />
        <SidebarItem icon={<FiMessageSquare />} text="Chat" />
        <SidebarItem icon={<FiUser />} text="Profil" />
        <SidebarItem icon={<FiHome />} text="Beranda" beranda />
        <SidebarItem icon={<FiLogOut />} text="Keluar" keluar />
      </Sidebar>
    </>
  );
}

export default SidebarUser;
