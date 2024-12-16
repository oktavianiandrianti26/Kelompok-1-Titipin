import React, { useState } from "react";
import RoomImage from '../assets/form.png';
import { Link, useNavigate } from "react-router-dom";
import { Buttons } from "../components/Button";
import axios from "axios";

// Komponen ToggleSwitch


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false); // state untuk checkbox "Remember me"
  const navigate = useNavigate(); 

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCheckboxChange = () => setIsChecked(!isChecked); // toggle checkbox state

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Tentukan endpoint berdasarkan email atau logika lainnya
      let endpoint = email.includes('admin') ? 'http://localhost:3000/api/admin/login' : 'http://localhost:3000/api/user/login';
  
      // Kirim permintaan login ke server
      const response = await axios.post(endpoint, {
        email,
        password,
      });
  
      console.log("Response data:", response.data);
  
      if (response.status === 200) {
        // Ambil token dan role dari response
        const token = response.data.data.token;
        const role = response.data.data.role;
        const userId = response.data.data.user.id;
  
        // Menyimpan token dan role ke localStorage
        localStorage.setItem('userToken', token);
        localStorage.setItem('role', role);  
        localStorage.setItem('userEmail', email); 
        localStorage.setItem('userId', userId);
  
        alert("Login berhasil!");
  
        // Arahkan pengguna ke dashboard yang sesuai berdasarkan role
        if (role === 'admin') {
          navigate("/admin/dashboard");  // Jika admin, arahkan ke dashboard admin
        } else if (role === 'user') {
          navigate("/user/dashboard");  // Jika user, arahkan ke dashboard pengguna
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

          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Masuk</h2>

          {/* Google Sign-in Button */}
          <div className="flex items-center justify-center">
          <button
            className="flex items-center justify-center mb-4 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 "
            onClick={() => alert("Google Sign-in clicked")}
          >
            <div className="px-4 py-3  ">
              <svg className="h-6 w-6" viewBox="0 0 40 40">
                {/* Icon Google */}
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.045 27.2142 24.3525 30 20 30C14.4775 30 10 25.5225 10 20C10 14.4775 14.4775 9.99999 20 9.99999C22.5492 9.99999 24.8683 10.9617 26.6342 12.5325L31.3483 7.81833C28.3717 5.04416 24.39 3.33333 20 3.33333C10.7958 3.33333 3.33335 10.7958 3.33335 20C3.33335 29.2042 10.7958 36.6667 20 36.6667C29.2042 36.6667 36.6667 29.2042 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#FFC107"
                />
                <path
                  d="M5.25497 12.2425L10.7308 16.2583C12.2125 12.59 15.8008 9.99999 20 9.99999C22.5491 9.99999 24.8683 10.9617 26.6341 12.5325L31.3483 7.81833C28.3716 5.04416 24.39 3.33333 20 3.33333C13.5983 3.33333 8.04663 6.94749 5.25497 12.2425Z"
                  fill="#FF3D00"
                />
                <path
                  d="M20 36.6667C24.305 36.6667 28.2167 35.0192 31.1742 32.34L26.0159 27.975C24.3425 29.2425 22.2625 30 20 30C15.665 30 11.9842 27.2359 10.5975 23.3784L5.16254 27.5659C7.92087 32.9634 13.5225 36.6667 20 36.6667Z"
                  fill="#4CAF50"
                />
                <path
                  d="M36.3425 16.7358H35V16.6667H20V23.3333H29.4192C28.7592 25.1975 27.56 26.805 26.0133 27.9758C26.0142 27.975 26.015 27.975 26.0158 27.9742L31.1742 32.3392C30.8092 32.6708 36.6667 28.3333 36.6667 20C36.6667 18.8825 36.5517 17.7917 36.3425 16.7358Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <h1 className="px-4 py-3 w-5/6 text-center font-bold">Sign in with Google</h1>
          </button>
        </div>
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
                placeholder="admintitipin@gmail.com"
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
                placeholder="***************"
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
                <p className="text-sm">Belum punya akun? <Link to="/register" className="text-blue-500">Daftar di sini</Link></p>
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
