import React from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";
import { Buttons } from '../components/Button'; 
import titipinImage from '../assets/titipin3.png';

const Dashboard = () => {
  const handleVisitClick = () => {;
  };

  return (
    <div className="flex h-screen">
      <SidebarUser />

      <div className="flex-1 bg-gray-100">
        <HeaderUser />

        <div className="p-6">
          <img
            src={titipinImage} 
            alt="Ilustrasi Titipin"
            className="w-full h-80 object-cover rounded-lg mb-6"
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Tentang Titipin
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Titipin adalah layanan jasa penitipan barang yang praktis, aman, dan
            terpercaya. Kami menyediakan solusi fleksibel bagi Anda yang
            membutuhkan tempat penitipan barang sementara, dengan tambahan
            layanan jemput dan antar langsung ke lokasi Anda.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Dengan harga terjangkau, layanan kami dirancang untuk mempermudah
            kebutuhan logistik Anda, baik untuk barang kecil, besar, maupun
            dalam jumlah banyak. Tim profesional kami akan memastikan barang
            Anda tetap aman selama dalam penyimpanan maupun pengiriman.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Titipin cocok untuk individu maupun bisnis yang membutuhkan layanan
            penitipan dan pengantaran yang cepat dan tanpa ribet. Percayakan
            kebutuhan penitipan barang Anda kepada kami, kapan pun dan di mana
            pun Anda butuhkan!
          </p>

          {Buttons.kunjungiTitipin(handleVisitClick)} 
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
