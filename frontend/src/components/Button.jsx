import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label, variant, onClick, type = 'button', className = '' }) => {
  const baseStyles = 'px-4 py-2 rounded font-medium focus:outline-none transition';
  const variants = {
    greenPrimary: 'bg-emerald-500 text-white hover:bg-emerald-600',
    greenSecondary: 'bg-emerald-50 text-emerald-500 hover:bg-emerald-100',
    redPrimary: 'bg-red-500 text-white hover:bg-red-600',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant] || ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['greenPrimary', 'greenSecondary', 'redPrimary']).isRequired,
  onClick: PropTypes.func.isRequired, // ensure onClick is required
  type: PropTypes.string,
  className: PropTypes.string,
};

export const Buttons = {
  login: (onClick) => <Button label="Masuk" variant="greenPrimary" onClick={onClick} />,
  abaikan: (onClick) => <Button label="Abaikan" variant="greenSecondary" onClick={onClick} />,
  kirimUlasan: (onClick) => <Button label="Kirim" variant="greenPrimary" onClick={onClick} />,
  batal: (onClick) => <Button label="Batal" variant="redPrimary" onClick={onClick} />,
  kirimNotifikasi: (onClick) => <Button label="Kirim Notifikasi" variant="greenPrimary" onClick={onClick} />,
  daftar: (onClick) => <Button label="Daftar" variant="greenPrimary" onClick={onClick} />,
  kunjungiTitipin: (onClick) => <Button label="Kunjungi Titipin" variant="greenPrimary" onClick={onClick} />,
  lakukanPembayaran: (onClick) => <Button label="Lakukan Pembayaran" variant="greenPrimary" onClick={onClick} />,
  kirimLokasi: (onClick) => <Button label="Kirim Lokasi" variant="greenPrimary" onClick={onClick} />,
  tambahWaktu: (onClick) => <Button label="Tambah Waktu" variant="greenSecondary" onClick={onClick} />,
  prosesPengambilan: (onClick) => <Button label="Proses Pengambilan" variant="greenPrimary" onClick={onClick} />,
  simpan: (onClick) => <Button label="Simpan" variant="greenPrimary" onClick={onClick} />,
};

export default Button;
