import React from 'react';
import { Link } from 'react-router-dom';

export function Sidebar({ children }) {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}

export function SidebarItem({ icon, text, route, active, beranda, keluar }) {
  // Jika props `beranda` atau `keluar` ada, tampilkan dengan logika khusus
  return (
    <div className={`sidebar-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{text}</span>
      {/* Jika beranda atau keluar aktif, bisa diberi efek khusus */}
      {beranda && <span className="beranda-badge">Beranda</span>}
      {keluar && <span className="keluar-badge">Keluar</span>}
    </div>
  );
}
