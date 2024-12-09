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
          Kirimkan pertanyaan Anda pada form di bawah ini untuk mendapatkan
          jawaban dari Titipin
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-2 space-y-4 max-w-lg mx-auto">
        <div className="flex items-center border border-emerald-500 rounded ">
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tulis Pertanyaan Anda disini"
            className="flex-1 p-1 justify-center resize-none items-center rounded-lg focus:outline-none overflow-y-hidden"
            required
          />
          <button
            type="submit"
            className="bg-emerald-500 text-white py-4 px-3 rounded"
          >
            Kirim Pesan
          </button>
        </div>
      </form>
    </section>
  );
}

export default Kontak;
