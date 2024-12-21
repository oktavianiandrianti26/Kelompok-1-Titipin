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
      let endpoint = email.includes("admin")
        ? "https://api-titipin.vocasia-fsjs-c.fun/api/admin/login"
        : "https://api-titipin.vocasia-fsjs-c.fun/api/user/login";

      const response = await axios.post(endpoint, {
        email,
        password,
      });

      if (response.status === 200) {
        const token = response.data.data.token;
        const role = response.data.data.role;

        if (role === "admin") {
          localStorage.setItem("adminToken", token);
          localStorage.setItem("role", role);
          localStorage.setItem("adminEmail", email);
        } else if (role === "user") {
          const userId = response.data.data.user.id;
          localStorage.setItem("userToken", token);
          localStorage.setItem("role", role);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userId", userId);
        }

        alert("Login berhasil!");

        if (role === "admin") {
          navigate("/admin/dashboard");
        } else if (role === "user") {
          navigate("/user/dashboard");
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
      <div className="bg-white shadow-[0_10px_25px_rgba(0,0,0,0.3),10px_10px_30px_rgba(0,0,0,0.2)] rounded-lg flex flex-col md:flex-row overflow-hidden max-w-5xl w-full h-auto">
        {/* Bagian Gambar */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={RoomImage}
            alt="Room with Boxes"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Bagian Form */}
        <div className="w-full md:w-1/2 p-12 relative flex flex-col justify-center h-full">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Masuk
          </h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Input Email */}
            <div>
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
                placeholder="Masukkan email anda"
                className="w-full px-5 py-3 mt-1 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={email}
                onChange={handleEmailChange}
              />
            </div>

            {/* Input Password */}
            <div>
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
                placeholder="Masukkan password anda"
                className="w-full px-5 py-3 mt-1 border rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-gray-600"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="ml-2 text-gray-700">Remember me</span>
            </div>

            {/* Submit Button */}
            <div>{Buttons.login(handleSubmit)}</div>
          </form>

          {/* Link ke halaman Register */}
          <div className="mt-4 text-center">
            <p className="text-sm">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-500">
                Daftar di sini
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
