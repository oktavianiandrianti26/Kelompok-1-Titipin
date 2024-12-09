import React from "react";

export const HeaderAdmin = () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Selamat Datang, Admin</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan manajemen dan monitoring melalui Dashboard
        </p>
      </div>
    </header>
  );
};

export const HeaderManajemenPengguna = () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Manajemen Pengguna</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan manajemen pengguna
        </p>
      </div>
    </header>
  );
};

export const HeaderManajemenPenitipanBarang= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Manajemen Penitipan Barang</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan manajemen penitipan barang
        </p>
      </div>
    </header>
  );
};

export const HeaderManajemenPembayaran= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Manajemen Pembayaran</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan manajemen pembayaran
        </p>
      </div>
    </header>
  );
};

export const HeaderRiwayatPenitipan= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Riwayat Penitipan</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan manajemen pengguna
        </p>
      </div>
    </header>
  );
};

export const HeaderUlasanPengguna= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Ulasan Pengguna</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melihat dan membalas ulasan pada menu ini
        </p>
      </div>
    </header>
  );
};

export const HeaderPengirimanNotifikasi= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Pengiriman Notifikasi</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan mengirimkan notikasi pada user
        </p>
      </div>
    </header>
  );
};

export const HeaderSupportChat= () => {
  return (
    <header className="bg-white">
      <div className="py-4 px-4 md:px-6">
        <h1 className="text-4xl font-semibold text-gray-600">Support Chat</h1>
        <p className="text-base font-normal text-gray-500">
          Anda dapat melakukan membalas pesan yang dikirimkan pengguna
        </p>
      </div>
    </header>
  );
};

export default HeaderAdmin;

