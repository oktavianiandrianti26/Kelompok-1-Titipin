import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

function Faq() {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      question: "Apa itu Titipin?",
      answer: "Penyedia Layanan Penitipan Barang Teraman dan Terbaik.",
    },
    {
      question: "Apa perbedaan Titipin dengan jasa penitipan lainnya?",
      answer: "Titipin memiliki layanan antar jemput barang.",
    },
    {
      question: "Apakah Titipin Aman?",
      answer: "Sangat Aman, karena menjaga barang anda adalah prioritas kami",
    },
    {
      question: "Berapa lama barang bisa disimpan oleh Titipin?",
      answer: "bervariasi mulai dari 1 hari hingga 6 bulan",
    },
    {
      question: "Berapa biaya layanan Titipin?",
      answer: "biaya layanan dititipin tergantung jumlah barang",
    },
    {
      question: "Apakah barang yang telah selesai dititipin bisa diantar?",
      answer: "Bisa. Titipin memberikan layanan antar jemput barang",
    },
  ];

  const toggleFAQ = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section className="items-center justify-between 2xl:px-64 lg:px-20 md:px-20 p-10 py-10 my-16 bg-emerald-500 ">
      <div className="text-center mt-10 mb-10">
        <h3 className="text-xl font-semibold text-white mb-4 ">
          Frequently Asked Question
        </h3>
        <h1 className="text-3xl md:text-4xl font-bold text-white">
          Anda Memiliki Pertanyaan?
        </h1>
        <p className="my-4 text-white font-normal text-lg md:text-xl">
          Berikut adalah beberapa jawaban yang mungkin dapat membantu Anda.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:gap-8">
        {/* Left Column */}
        <div>
          {faqs.slice(0, 3).map((faq, index) => (
            <div
              key={index}
              className=" p-4 bg-slate-50 my-3 rounded-lg justify-center"
            >
              <div
                className="flex justify-between cursor-pointer "
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <span>
                  {open === index ? (
                    <FiChevronUp className="text-xl" />
                  ) : (
                    <FiChevronDown className="text-xl" />
                  )}
                </span>
              </div>
              {open === index && <p className="mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div>
          {faqs.slice(3).map((faq, index) => (
            <div
              key={index + 3}
              className=" p-4 bg-slate-50 my-3 rounded-lg justify-center"
            >
              <div
                className="flex justify-between cursor-pointer"
                onClick={() => toggleFAQ(index + 3)}
              >
                <h3 className="font-semibold">{faq.question}</h3>
                <span>
                  {open === index + 3 ? (
                    <FiChevronUp className="text-xl" />
                  ) : (
                    <FiChevronDown className="text-xl" />
                  )}
                </span>
              </div>
              {open === index + 3 && <p className="mt-2">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Faq;
