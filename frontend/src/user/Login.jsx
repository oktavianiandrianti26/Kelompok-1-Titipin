import React, { useState } from "react";
import RoomImage from "../assets/form.png";
import { Link, useNavigate } from "react-router-dom";
import { Buttons } from "../components/Button";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked, setIsChecked] = useState(false); // state untuk checkbox "Remember me"
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCheckboxChange = () => setIsChecked(!isChecked); // toggle checkbox state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Tentukan endpoint berdasarkan email atau logika lainnya
      let endpoint = email.includes("admin")
        ? "http://localhost:3000/api/admin/login"
        : "http://localhost:3000/api/user/login";

      // Kirim permintaan login ke server
      const response = await axios.post(endpoint, {
        email,
        password,
      });

      console.log("Response data:", response.data);

      if (response.status === 200) {
        const token = response.data.data.token;
        const role = response.data.data.role;

        // Menyimpan data ke localStorage berdasarkan role
        if (role === "admin") {
          localStorage.setItem("adminToken", token); // Menyimpan token admin
          localStorage.setItem("role", role); // Menyimpan role (admin)
          localStorage.setItem("adminEmail", email); // Menyimpan email admin
        } else if (role === "user") {
          const userId = response.data.data.user.id; // Dapatkan userId untuk user
          localStorage.setItem("userToken", token); // Menyimpan token user
          localStorage.setItem("role", role); // Menyimpan role (user)
          localStorage.setItem("userEmail", email); // Menyimpan email user
          localStorage.setItem("userId", userId); // Menyimpan userId
        }

        alert("Login berhasil!");

        // Arahkan pengguna ke dashboard yang sesuai berdasarkan role
        if (role === "admin") {
          navigate("/admin/dashboard"); // Jika admin, arahkan ke dashboard admin
        } else if (role === "user") {
          navigate("/user/dashboard"); // Jika user, arahkan ke dashboard pengguna
        }
      } else {
        alert("Login gagal! Periksa email dan password Anda.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Terjadi kesalahan saat login. Silakan coba lagi.");
    }
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex overflow-hidden   max-w-6xl  w-full">
        {/* Bagian Gambar */}
        <div className="hidden md:block w-1/2">
          <img
            src={RoomImage}
            alt="Room with Boxes"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bagian Form */}
        <div className="w-full md:w-1/2 p-8 relative">
          <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Masuk
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            {/* Input Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="masukkan email anda"
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            {/* Input Password */}
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="masukkan password anda"
                className="w-full px-4 py-2 mt-1 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                className="form-checkbox text-gray-600"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </div>
            {/* Link ke halaman Register */}
            <div className="mt-4 text-center">
              <p className="text-sm">
                Belum punya akun?{" "}
                <Link to="/register" className="text-blue-500">
                  Daftar di sini
                </Link>
              </p>
            </div>
            {/* Submit Button */}
            {Buttons.login(handleSubmit)}
          </form>

          {/* Dekorasi Bawah */}
          <div className="flex items-center justify-center mt-4 space-x-2">
            <span className="block w-16 h-1 bg-gray-200 rounded"></span>
            <span className="block w-4 h-1 bg-gray-400 rounded"></span>
            <span className="block w-4 h-1 bg-gray-200 rounded"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;