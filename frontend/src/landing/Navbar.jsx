import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Button from "../components/button"; // Import the Button component

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

  const handleClick = (action) => {
    console.log(action); // Placeholder for button click action
  };

  return (
    <header className="bg-white text-slate-500 px-8 py-4 shadow-sm fixed w-full ">
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
        <div className="hidden md:flex space-x-4 ">
          <Button
            label="Masuk"
            variant="greenSecondary"
            onClick={() => handleClick()}
          />
          <Button
            label="Daftar"
            variant="greenPrimary"
            onClick={() => handleClick()}
          />
        </div>

        {/* Tombol Toggle Menu untuk Mobile */}
        <button className="md:hidden text-emerald-500" onClick={toggleMenu}>
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Menu Dropdown untuk Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white text-slate-500  p-4">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-emerald-500 block">
                  {item.label}
                </a>
              </li>
            ))}
            <div />
            <div className="flex space-x-4">
              <Button
                className="w-full"
                label="Masuk"
                variant="greenSecondary"
                onClick={() => handleClick()}
              />

              <Button
                className="w-full"
                label="Daftar"
                variant="greenPrimary"
                onClick={() => handleClick()}
              />
            </div>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
