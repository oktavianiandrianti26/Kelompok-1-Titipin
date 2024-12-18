import React, { useEffect, useState } from "react";
import SidebarAdmin from "../components/SidebarAdmin";
import { HeaderSupportChat } from "../components/HeaderAdmin";

const SupportChat = () => {
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessages, setReplyMessages] = useState({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const token = localStorage.getItem("adminToken");

        if (!token) {
          alert("Sesi telah habis. Silakan login ulang.");
          window.location.href = "/login";
          return;
        }

        const response = await fetch("http://localhost:3000/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Sesi telah habis. Silakan login ulang.");
            window.location.href = "/login";
          }
          throw new Error("Gagal mengambil data feedback");
        }

        const result = await response.json();
        setChatData(result.data);
      } catch (error) {
        console.error("Error:", error.message);
        alert("Terjadi kesalahan saat mengambil data feedback.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleReplyChange = (id, message) => {
    setReplyMessages({ ...replyMessages, [id]: message });
  };

  const handleReply = async (id) => {
    try {
      const token = localStorage.getItem("adminToken");
      const replyMessage = replyMessages[id];

      if (!replyMessage || replyMessage.trim() === "") {
        alert("Balasan tidak boleh kosong.");
        return;
      }

      const response = await fetch(
        `http://localhost:3000/api/feedback/${id}/reply`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ admin_reply: replyMessage }),
        }
      );

      if (!response.ok) {
        throw new Error("Gagal mengirim balasan");
      }

      alert("Balasan berhasil dikirim");
      window.location.reload(); // Refresh halaman untuk memperbarui status
    } catch (error) {
      console.error("Error:", error.message);
      alert("Terjadi kesalahan saat mengirim balasan.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex min-h-screen">
      <SidebarAdmin />
      <div className="flex-1 flex flex-col">
        <HeaderSupportChat title="Support Chat" />
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4">
            Anda dapat membalas pesan yang dikirimkan pengguna.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chatData.map((chat) => (
              <div
                key={chat.review_id}
                className="border border-emerald-500 rounded-lg p-4 shadow-sm"
              >
                <div className="mb-2">
                  <p className="font-medium">{chat.user_id.name}</p>
                  <p className="text-sm text-gray-500">{chat.user_id.email}</p>
                </div>
                <p className="mb-4">{chat.isi_feedback}</p>
                {chat.admin_reply ? (
                  <p className="bg-gray-200 text-sm p-2 rounded">
                    Balasan: {chat.admin_reply}
                  </p>
                ) : (
                  <>
                    <textarea
                      placeholder="Ketik balasan Anda di sini"
                      className="w-full border border-gray-300 rounded-lg p-2 mb-4 focus:outline-none focus:ring focus:ring-green-500"
                      onChange={(e) =>
                        handleReplyChange(chat.review_id, e.target.value)
                      }
                    />
                    <button
                      onClick={() => handleReply(chat.review_id)}
                      className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                      Kirim
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
