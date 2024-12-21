import React, { useState } from "react";
import axios from "axios";

const Checkout = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nama, setNama] = useState("");
  const [userId, setUserId] = useState("");

  // Function to dynamically load the Midtrans Snap script
  const loadSnap = () => {
    return new Promise((resolve, reject) => {
      if (window.snap) {
        resolve(window.snap); // Snap SDK is already loaded
      } else {
        const script = document.createElement("script");
        script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
        script.setAttribute("data-client-key", "YOUR_CLIENT_KEY"); // Ganti dengan Midtrans Client Key Anda
        script.onload = () => resolve(window.snap);
        script.onerror = () =>
          reject(new Error("Failed to load Midtrans Snap."));
        document.body.appendChild(script);
      }
    });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data to be sent to the backend
      const paymentData = {
        amount: parseFloat(amount),
        email,
        phone,
        name: nama,
        user_id: userId, // Kirim user_id ke backend
      };

      // Send POST request to the backend to create a payment transaction
      const response = await axios.post(
        "https://api-titipin.vocasia-fsjs-c.fun/api/user/payment",
        paymentData
      );

      console.log("Backend Response:", response.data); // Debugging log

      // Check if the backend provides a Snap Token
      if (response.data.token) {
        // Ensure Snap SDK is loaded before calling `pay`
        loadSnap()
          .then(() => {
            window.snap.pay(response.data.token, {
              onSuccess: function (result) {
                console.log("Payment Success:", result);
                alert("Payment Success");
              },
              onPending: function (result) {
                console.log("Payment Pending:", result);
                alert("Payment Pending");
              },
              onError: function (result) {
                console.log("Payment Error:", result);
                alert("Payment Error");
              },
              onClose: function () {
                console.log("Payment window closed");
                alert("You closed the payment popup.");
              },
            });
          })
          .catch((error) => {
            console.error("Failed to load Snap SDK:", error);
            alert("Payment could not be processed. Please try again later.");
          });
      } else {
        console.error("Snap Token not provided by backend.");
        alert("Unable to process payment. Please try again.");
      }
    } catch (error) {
      console.error("Error creating payment:", error);
      alert("An error occurred while creating the payment. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block text-lg font-medium">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="nama" className="block text-lg font-medium">
            Nama
          </label>
          <input
            type="text"
            id="nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-lg font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-lg font-medium">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label htmlFor="userId" className="block text-lg font-medium">
            User ID
          </label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md"
        >
          Pay
        </button>
      </form>
    </div>
  );
};

export default Checkout;
