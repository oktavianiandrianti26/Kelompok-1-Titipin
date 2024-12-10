import React from "react";
import Button from "../components/Button";
import titipinImage from "../assets/titipin1.png";

function Beranda() {
  const handleClick = () => {
    console.log("Titipin Sekarang button clicked!");
  };

  return (
    <section className="flex flex-col lg:flex-row items-center justify-between 2xl:px-64 lg:px-20 md:px-20 p-10 py-8 bg text-white">
      <div className="w-full lg:w-1/2 mb-8 lg:mb-0 mt-20 ">
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-500">
          Bingung titip barang? Titipin solusinya! Praktis, aman, dan cepat.
          Titip sekarang, beres tanpa ribet!
        </h1>
        <p className="my-4 text-slate-500 text-lg md:text-xl">
          Dengan Titipin, Anda bisa menitip barang dengan mudah dan tanpa
          khawatir. Kami hadir untuk memberikan layanan yang cepat, aman, dan
          terpercaya sesuai kebutuhan Anda!
        </p>
        <Button
          label="Titipin Sekarang"
          variant="greenPrimary"
          onClick={handleClick}
        />
      </div>
      <div className="w-full lg:w-1/2">
        <img src={titipinImage} alt="Hero" className="w-full h-auto" />
      </div>
    </section>
  );
}

export default Beranda;
