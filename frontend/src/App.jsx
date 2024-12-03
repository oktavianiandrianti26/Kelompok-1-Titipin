import { useState } from "react";
import "./App.css";
import { Sidebar, SidebarItem } from "./components/sidebar";
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

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Sidebar>
        <SidebarItem icon={<FiGrid />} text="Dashboard" route="/" />
        <SidebarItem icon={<FiUsers />} text="Pengguna" />
        <SidebarItem icon={<FiPackage />} text="Penitipan" />
        <SidebarItem icon={<FiCreditCard />} text="Pembayaran" />
        <SidebarItem icon={<FiFile />} text="Riwayat" active />
        <SidebarItem icon={<FiThumbsUp />} text="Ulasan" />
        <SidebarItem icon={<FiBell />} text="Notifikasi" />
        <SidebarItem icon={<FiMessageSquare />} text="Chat" />
        <SidebarItem icon={<FiHome />} text="Beranda" beranda />
        <SidebarItem icon={<FiLogOut />} text="Keluar" keluar />
      </Sidebar>
    </>
  );
}

export default App;
