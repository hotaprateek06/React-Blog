import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ onLogout }) {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-gray-900 text-white border-b border-gray-700">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">SimpleBlog</h1>

        <div className="hidden md:flex gap-8 items-center">
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>

          <Link to="/create" className="hover:text-green-400">
            Create
          </Link>

          <Link to="/profile" className="hover:text-purple-400">
            Profile
          </Link>

          <button
            onClick={onLogout}
            className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-gray-800 px-6 py-4 flex flex-col gap-4">
          <Link to="/" onClick={() => setOpen(false)}>
            Home
          </Link>
          <Link to="/create" onClick={() => setOpen(false)}>
            Create
          </Link>
          <Link to="/profile" onClick={() => setOpen(false)}>
            Profile
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
