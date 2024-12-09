import React from "react";
import {
  FiUserPlus,
  FiPackage,
  FiEdit,
  FiFileText,
  FiCreditCard,
  FiTruck,
} from "react-icons/fi";

function CaraNitipin() {
  const steps = [
    {
      icon: <FiUserPlus />,
      title: "1. Daftar Akun/Login",
      description:
        "Langkah pertama anda hanya perlu melakukan daftar jika belum memiliki akun, atau masuk jika anda telah memiliki akun Titipin",
    },
    {
      icon: <FiPackage />,
      title: "2. Titipin Barang",
      description:
        "Setelah Anda masuk maka anda sudah dapat melakukan Titipin Barang dengan menekan tombol “Titipin Sekarang”",
    },
    {
      icon: <FiEdit />,
      title: "3. Pengisian Data",
      description:
        "Anda akan diminta untuk mengisi formulir untuk Titipin barang. Lakukan pengisian sesuai Formulir",
    },
    {
      icon: <FiFileText />,
      title: "4. Kalkulasi Harga",
      description:
        "Sistem akan melakukan kalkulasi harga yang perlu anda bayar untuk dapat menikmati layanan Titipin.",
    },
    {
      icon: <FiCreditCard />,
      title: "5. Pembayaran",
      description:
        "Lakukan pembayaran, jika sudah maka tim Titipin akan menuju ke lokasi untuk menjemput barang",
    },
    {
      icon: <FiTruck />,
      title: "6. Pengembalian atau Perpanjangan masa Titipin",
      description:
        "Langkah Terakhir anda dapat memilih untuk melakukan pengembalian atau perpanjangan masa titipin",
    },
  ];

  return (
    <section className="items-center justify-between 2xl:px-64 lg:px-20 md:px-20 p-10 py-8 bg text-emerald-500">
      <div className="text-center mt-10 mb-20">
        <h3 className="text-xl font-semibold text-emerald-500 mb-4 ">
          Cara Nitipin
        </h3>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-500">
          Kami Siap Membantu Menjaga <br /> Barang Yang Anda Titipin
        </h1>
        <p className="my-4 text-slate-500 font-normal text-lg md:text-xl">
          Titip barang jadi super mudah! Ikuti langkah sederhana berikut, <br />
          dan dalam hitungan menit, barang Anda aman dalam genggaman kami.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        <div className="flex flex-col items-center">
          {steps.slice(0, 3).map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-center mb-8 lg:flex-row lg:items-start"
            >
              <div className="text-4xl mb-4 lg:mb-0 lg:mr-4 p-4 rounded-full bg-emerald-100">
                {step.icon}
              </div>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className=" text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center">
          {steps.slice(3).map((step, index) => (
            <div
              key={index + 3}
              className="flex flex-col items-center mb-8 lg:flex-row lg:items-start"
            >
              <div className="text-4xl mb-4 lg:mb-0 lg:mr-4 p-4 rounded-full bg-emerald-100">
                {step.icon}
              </div>
              <div>
                <h3 className="font-semibold">{step.title}</h3>
                <p className=" text-slate-500">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaraNitipin;
