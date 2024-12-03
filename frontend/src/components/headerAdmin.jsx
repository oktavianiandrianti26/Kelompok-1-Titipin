import React from "react";

const HeaderAdmin = () => {
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

export default HeaderAdmin;
