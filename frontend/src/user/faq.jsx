import React, { useState } from "react";
import SidebarUser from "../components/SidebarUser";
import HeaderUser from "../components/HeaderUser";

const FAQPage = () => {
    const [expandedQuestion, setExpandedQuestion] = useState(null);
    const [message, setMessage] = useState(""); // Input for feedback message
    const [token] = useState(localStorage.getItem("token")); // Token from login

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
    ];

    const handleToggle = (index) => {
        setExpandedQuestion(expandedQuestion === index ? null : index);
    };

    const handleSendFeedback = async () => {
        try {
            // Mengambil token dari localStorage
            const token = localStorage.getItem("userToken");
            console.log('Token yang ditemukan:', token);
            
            // Jika token tidak ada, beri peringatan
            if (!token) {
                alert('Token tidak ditemukan. Anda perlu login terlebih dahulu.');
                return;
            }
    
            // Mengirim permintaan dengan token yang diambil
            const response = await fetch("http://localhost:3000/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,  // Token yang diambil dari localStorage
                },
                body: JSON.stringify({ isi_feedback: message }),
            });
    
            // Menangani respons server
            if (!response.ok) {
                const errorMessage = await response.text();  // Ambil body respons dalam format teks jika bukan JSON
                throw new Error(`Kesalahan Server: ${errorMessage}`);
            }
    
            const result = await response.json();
            alert("Pertanyaan berhasil dikirim!");
            setMessage(""); // Reset input pesan
        } catch (error) {
            console.error("Kesalahan:", error);
            alert(`Gagal mengirimkan pertanyaan: ${error.message}`);
        }
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

                        <div className="bg-white p-6 shadow-lg rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Punya pertanyaan lain?</h2>
                            <textarea
                                className="w-full border p-3 rounded-lg focus:ring-green-500 focus:border-green-500"
                                rows="4"
                                placeholder="Tulis pertanyaan Anda di sini"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <button
                                onClick={handleSendFeedback}
                                className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                            >
                                Kirim Pertanyaan
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FAQPage;
