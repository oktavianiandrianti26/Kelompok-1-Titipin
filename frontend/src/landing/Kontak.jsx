import React, { useState } from "react";

function Kontak() {
  const [formData, setFormData] = useState({
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Pesan Anda telah terkirim");
  };

  return (
    <section className="p-8">
      <div className="text-center mt-10 mb-10">
        <h3 className="text-xl font-semibold text-slate-500 mb-4">Kontak</h3>
        <h1 className="text-3xl md:text-4xl font-bold text-emerald-500">
          Faq Belum Menjawab?
        </h1>
        <p className="my-4 text-slate-500 font-normal text-lg md:text-xl">
          Daftar atau Masuk Akun Anda pada platfrom ini untuk mengirim pesan
          pertanyaan
        </p>
      </div>
    </section>
  );
}

export default Kontak;
