import React, { useState } from 'react';
import HeaderUser from './components/headerUser';
import { Buttons } from './components/button';
import Dashboard from './user/dashboard'; 

import './index.css';

function App() {
  const [count, setCount] = useState(0);

  // Function to render buttons dynamically
  const renderButtons = (buttons) => {
    return Object.keys(buttons).map((key) => (
      <div key={key}>
        {buttons[key](() => setCount((prevCount) => prevCount + 1))} {/* Update count */}
      </div>
    ));
  };

  return (
    <div>
      <HeaderUser />
      <main>
        {/* Konten lainnya */}
      </main>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="space-y-4">
          <h2>Buttons</h2>
          {renderButtons(Buttons)} {/* Render the buttons */}
          <div>
            <p>Count: {count}</p> {/* Display the count */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
