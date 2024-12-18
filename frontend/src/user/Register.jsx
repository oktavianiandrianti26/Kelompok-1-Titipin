import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomImage from '../assets/form.png';
import { Buttons } from "../components/Button";
import axios from 'axios'; // Import axios

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok');
      return;
    }
    if (!isChecked) {
      alert('Harap setujui syarat dan ketentuan');
      return;
    }

    // Membuat objek data untuk dikirim ke backend
    const userData = {
      name,
      email,
      phone,
      password,
      konfirmasi_password: confirmPassword,
    };

    try {
      // Mengirim data ke backend menggunakan axios
      const response = await axios.post('http://localhost:3000/api/user/register', userData);
      console.log(response.data); // Menampilkan respon dari backend

      if (response.data) {
        alert('Pendaftaran berhasil');
        navigate('/Login'); // Redirect ke halaman login setelah berhasil
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan, coba lagi nanti');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg flex w-full max-w-4xl">
        <div className="w-2/3 bg-gray-300 flex items-center justify-center rounded-l-lg">
          <img
            src={RoomImage}
            alt="Placeholder"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-1/3 p-6 relative">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Nama</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="masukkan nama anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="masukkan email anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nomor Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="masukkan nomor hp anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="masukkan password anda"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="masukkan konfirmasi password anda"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className="mr-2"
              />
              <span className="text-gray-700">Setujui syarat dan ketentuan</span>
            </div>
            {Buttons.login(handleSubmit)
            
          }
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
