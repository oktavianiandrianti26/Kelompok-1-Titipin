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
            answer: "Biaya layanan mulai dari Rp5.000 per hari, tergantung ukuran dan jenis barang.",
        },
        {
            question: "Apakah Titipin Aman?",
            answer: "Ya, kami menjamin keamanan barang dengan pengawasan 24/7 dan asuransi.",
        },
    ];

    const handleToggle = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    return (
        <div className="flex min-h-screen">
            <SidebarUser />
            <div className="flex-1 flex flex-col">
                <HeaderUser />
                <main className="flex-1 p-6">
                    <div className="max-w-screen-lg mx-auto">
                        <h1 className="text-2xl font-semibold mb-6">Frequently Asked Questions (FAQ)</h1>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {questions.map((item, index) => (
                                <div key={index} className="bg-green-50 border border-gray-300 rounded-lg p-4">
                                    <div
                                        className="cursor-pointer flex justify-between items-center"
                                        onClick={() => handleToggle(index)}
                                    >
                                        <span className="font-semibold">{item.question}</span>
                                        <span>
                                            {expandedQuestion === index ? "▼" : "▲"}
                                        </span>
                                    </div>
                                    {expandedQuestion === index && <p className="mt-2">{item.answer}</p>}
                                </div>
                            ))}
                        </div>

                        <div className="bg-white p-6 shadow-lg rounded-lg flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Punya Pertanyaan Lain?</h2>
                            <a
                                href="https://wa.me/6285524433892"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                <img
                                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                                    alt="WhatsApp"
                                    className="w-6 h-6 mr-2"
                                />
                                Hubungi Kami di WhatsApp
                            </a>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQPage;
