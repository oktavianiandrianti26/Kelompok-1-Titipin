import React, { useState } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";

const FAQPage = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);

    const questions = [
        {
            question: "Apa itu Titipin?",
            answer: "Titipin adalah platform layanan penitipan barang yang aman dan terpercaya.",
        },
        {
            question: "Berapa lama barang bisa disimpan oleh Titipin?",
            answer: "Barang dapat disimpan selama maksimal 30 hari, tergantung paket yang dipilih.",
        },
        {
            question: "Apa perbedaan Titipin dengan jasa penitipan lainnya?",
            answer: "Titipin menawarkan layanan penitipan dengan teknologi modern dan asuransi barang.",
        },
        {
            question: "Berapa biaya layanan Titipin?",
            answer: "Biaya layanan mulai dari Rp50.000 per hari, tergantung ukuran dan jenis barang.",
        },
        {
            question: "Apakah Titipin Aman?",
            answer: "Ya, kami menjamin keamanan barang dengan pengawasan 24/7 dan asuransi.",
        },
        {
            question: "Apakah saya bisa mengantar ke Titipin?",
            answer: "Ya, Anda dapat langsung mengantar barang ke lokasi Titipin terdekat.",
        },
    ];

    const handleToggle = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <SidebarUser />

            {/* Konten Utama */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header>
                    <HeaderUser />
                </header>

                {/* Konten FAQ */}
                <main className="flex-1 p-4 overflow-y-auto">
                    <div className="w-full max-w-screen-lg mx-auto">
                        {/* Daftar Pertanyaan */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {questions.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-[#d1fae5] border border-gray-200 rounded-lg shadow-sm"
                                >
                                    <div
                                        className="flex justify-between items-center p-4 cursor-pointer hover:bg-green-100 transition-colors"
                                        onClick={() => handleToggle(index)}
                                    >
                                        <span className="font-semibold text-gray-800 flex-1 mr-4">
                                            {item.question}
                                        </span>
                                        <span className="text-gray-500">
                                            {expandedQuestion === index ? (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M4.5 15l7.5-7.5 7.5 7.5"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={2}
                                                    stroke="currentColor"
                                                    className="w-5 h-5"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                                                    />
                                                </svg>
                                            )}
                                        </span>
                                    </div>

                                    {/* Dropdown Jawaban */}
                                    <div 
                                        className={`px-4 pb-4 text-gray-700 transition-all duration-300 ease-in-out ${
                                            expandedQuestion === index 
                                                ? 'max-h-screen opacity-100' 
                                                : 'max-h-0 opacity-0 overflow-hidden'
                                        }`}
                                    >
                                        {item.answer}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Support Chat */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800">
                                Support Chat
                            </h3>
                            <textarea
                                placeholder="Ketik pesan yang ingin Anda tanyakan di sini"
                                className="w-full border border-gray-300 rounded-md p-3 mb-4 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                                rows="4"
                            ></textarea>
                            <div className="flex justify-end space-x-4">
                                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                                    Abaikan
                                </button>
                                <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
                                    Kirim
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQPage;