import { createContext, useContext, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SidebarContext = createContext();

export function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside className="h-min-screen ">
      <nav className="h-full flex flex-col bg-emerald-500 border-r shadow-sm">
        <div className="p-4 pb-2 flex items-center">
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-0 bg-transparent border-0 flex items-center mr-4 justify-center focus:outline-none"
          >
            {expanded ? (
              <FiChevronLeft size={24} className="text-white" />
            ) : (
              <FiChevronRight size={24} className="text-white" />
            )}
          </button>
          <p
            className={`overflow-hidden transition-all text-xl font-semibold text-white ${
              expanded ? "w-32" : "w-0"
            }`}
          >
            Titipin
          </p>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className="flex-1 px-2">{children}</ul>
        </SidebarContext.Provider>
        {/* user dummy */}
        <div className="border-t flex p-2 items-center justify-center">
          <img
            src="https://gravatar.com/avatar/27205e5c51cb03f862138b22bcb5dc20f94a342e744ff6df1b8dc8af3c865109"
            className="h-8 w-8 rounded-full"
            alt=""
          />
          <div
            className={`overflow-hidden transition-all ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <h4 className="text-white text-xs font-semibold">Andi Pratama</h4>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, active, alert, keluar, beranda }) {
  const expanded = useContext(SidebarContext);

  // Tentukan warna berdasarkan properti
  const itemClass = keluar
    ? "text-red-500 hover:bg-red-100"
    : beranda
    ? "text-blue-500 hover:bg-blue-100 mt-5"
    : active
    ? "bg-white text-emerald-600"
    : "text-white hover:bg-emerald-400";

  const hoverClass = keluar
    ? "bg-red-100 text-red-500"
    : beranda
    ? "bg-blue-100 text-blue-500"
    : "bg-emerald-100 text-emerald-500";

  const alertClass = keluar
    ? "bg-red-500"
    : beranda
    ? "bg-blue-500"
    : "bg-emerald-400";

  return (
    <li
      className={`relative flex items-center mx-3 py-2 px-2 my-1 font-medium rounded-md cursor-pointer transition-colors group ${itemClass}`}
    >
      {icon}

      {/* Teks Ketika sidebar dibuka */}
      <span
        className={`overflow-hidden transition-all text-xs font-medium ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {/* Text Hover ketika sidebar ditutup */}
      {!expanded && (
        <div
          className={`absolute text-xs font-medium left-full opacity-0 rounded-md px-2 py-1 ml-6 ${hoverClass} -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
        >
          {text}
        </div>
      )}

      {/* Alert Notification Jika Diperlukan */}
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded ${alertClass} top-1/2 transform -translate-y-1/2 invisible group-hover:visible group-hover:opacity-100`}
        />
      )}
    </li>
  );
}
