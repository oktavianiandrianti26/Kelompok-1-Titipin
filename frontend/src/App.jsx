import React from 'react';
import HeaderUser from './components/headerUser';
import HeaderAdmin from './components/headerAdmin';
import './index.css';

function App() {
  return (
    <div>
      <HeaderUser />

      <HeaderAdmin />

      <main>
        {/* Konten lainnya */}
      </main>
    </div>
  );
}

export default App;
