import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Buttons } from "../components/Button";

// Data untuk menu
const menuItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang", href: "#tentang" },
  { label: "Cara Nitipin", href: "#cara-nitipin" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontak", href: "#kontak" },
];

const Navbar = () => {
  // State untuk toggle menu di mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi untuk handle click pada tombol
  const handleClick = (action) => {
    console.log(`${action} button clicked!`); // Placeholder untuk action
  };

  return (
    <header className="bg-white text-slate-500 px-8 py-4 shadow-sm fixed w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold text-emerald-500">Titipin</h1>
          <nav>
            <ul className="hidden md:flex space-x-6">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-emerald-500 text-base font-semibold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Tombol Daftar dan Masuk */}
        <div className="hidden md:flex space-x-4">
          {/* Click disesuaikan dengan kebutuhan */}
          {Buttons.login(() => handleClick("Masuk"))}
          {Buttons.daftar(() => handleClick("Daftar"))}
        </div>

        {/* Tombol Toggle Menu untuk Mobile */}
        <button className="md:hidden text-emerald-500" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-slate-500 p-4">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-emerald-500 block">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Tombol Masuk dan Daftar untuk Mobile */}
          <div className="flex space-x-4">
            {/* Click disesuaikan dengan kebutuhan */}
            {Buttons.login(() => handleClick("Masuk"))}
            {Buttons.daftar(() => handleClick("Daftar"))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
