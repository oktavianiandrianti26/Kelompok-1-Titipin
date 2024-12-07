import React from "react";
import Chart from "../components/Chart";
import ManajemenPembayaran from "../admin/ManajemenPembayaran ";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderAdmin } from "../components/headerAdmin";

// Data Pendapatan
const pendapatanData = [
  { name: "Week 1", total: 1900000 },
  { name: "Week 2", total: 400000 },
  { name: "Week 3", total: 500000 },
  { name: "Week 4", total: 500000 },
  { name: "Week 5", total: 500000 },
];

// Data Jumlah Barang
const jumlahBarangData = [
  { name: "Week 1", total: 100 },
  { name: "Week 2", total: 50 },
  { name: "Week 3", total: 75 },
  { name: "Week 4", total: 80 },
  { name: "Week 5", total: 60 },
];

function Dashboard() {
  return (
    <div className="flex">
      {/* Sidebar and main content */}
      <SidebarAdmin />
      <div className="p-8 flex flex-col w-full">
        {/* Header */}
        <HeaderAdmin />

        {/* Charts Section */}
        <div className="flex space-x-4 mb-6">
          <Chart data={pendapatanData} isPendapatan={true} />
          <Chart data={jumlahBarangData} isPendapatan={false} />
        </div>

        {/* Manajemen Pembayaran */}
        <ManajemenPembayaran showHeader={false} showSidebar={false} />
      </div>
    </div>
  );
}

export default Dashboard;
