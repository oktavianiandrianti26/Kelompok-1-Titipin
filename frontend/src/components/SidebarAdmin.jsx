import { useState } from "react";
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

function SidebarAdmin() {
  return (
    <>
      <Sidebar>
        <SidebarItem
          icon={<FiGrid />}
          text="Dashboard"
          route="/admin/dashboard"
          active={location.pathname === "/admin/dashboard"}
        />
        <SidebarItem
          icon={<FiUsers />}
          text="Pengguna"
          route="/ManajemenPengguna"
          active={location.pathname === "/ManajemenPengguna"}
        />
        <SidebarItem
          icon={<FiPackage />}
          text="Penitipan"
          route="/ManajemenPenitipanBarang"
          active={location.pathname === "/ManajemenPenitipanBarang"}
        />
        <SidebarItem
          icon={<FiCreditCard />}
          text="Pembayaran"
          route="/ManajemenPembayaran"
          active={location.pathname === "/ManajemenPembayaran"}
        />
        <SidebarItem
          icon={<FiFile />}
          text="Riwayat"
          route="/admin/RiwayatPenitipan"
          active={location.pathname === "/admin/RiwayatPenitipan"}
        />
        <SidebarItem
          icon={<FiThumbsUp />}
          text="Ulasan"
          route="/UlasanPengguna"
          active={location.pathname === "/UlasanPengguna"}
        />
        <SidebarItem
          icon={<FiBell />}
          text="Notifikasi"
          route="/PengaturanNotifikasi"
          active={location.pathname === "/PengaturanNotifikasi"}
        />
        <SidebarItem
          icon={<FiMessageSquare />}
          text="Chat"
          route="/SupportChat"
          active={location.pathname === "/SupportChat"}
        />
        <SidebarItem
          icon={<FiHome />}
          text="Beranda"
          beranda
          route="/admin/dashboard"
          active={location.pathname === "/admin/dashboard"}
        />
        <SidebarItem
          icon={<FiLogOut />}
          text="Keluar"
          keluar
          route="/admin/dashboard"
          active={location.pathname === "/admin/dashboard"}
        />
      </Sidebar>
    </>
  );
}

export default SidebarAdmin;
