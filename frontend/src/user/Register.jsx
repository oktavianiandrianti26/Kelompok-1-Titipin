import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RoomImage from '../assets/form.png';
import { Buttons } from "../components/Button";

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok');
      return;
    }
    if (!isChecked) {
      alert('Harap setujui syarat dan ketentuan');
      return;
    }

    // Mengarahkan ke halaman login setelah berhasil
    navigate('/');
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
                placeholder="admintitipin"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="admintitipin@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Nomor Telepon</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="08111111000"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="***************"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Konfirmasi Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 rounded bg-green-100"
                placeholder="***************"
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
