import React from "react";
import titipinImage from "../assets/titipin2.png";

function Tentang() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between 2xl:px-64 lg:px-20 md:px-20 p-10 py-8 bg text-white bg-emerald-500">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 mt-20 ">
        <img src={titipinImage} alt="About" className="w-full h-auto" />
      </div>
      <div className="w-full lg:w-1/2 lg:pl-8">
        <h3 className="text-xl font-semibold text-white mb-4">Tentang Kami</h3>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Titipin Solusi Yang Tepat untuk penitipan dan perawatan barang Anda
        </h1>
        <p className="my-4 text-white font-normal text-lg md:text-xl">
          Percayakan barang Anda kepada kami! Dengan layanan profesional,
          keamanan terjamin, dan perawatan maksimal, kami memastikan setiap
          barang Anda tetap aman dan terawat hingga kembali ke tangan Anda.
        </p>
      </div>
    </section>
  );
}

export default Tentang;
