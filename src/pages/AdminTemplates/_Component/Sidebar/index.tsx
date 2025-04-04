import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 p-4 bg-gray-900 text-white ${
          isOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Toggle Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="mb-4">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Logo */}
        <div className="flex items-center space-x-3 mb-6">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          {isOpen && <span className="text-2xl font-semibold">Admin</span>}
        </div>

        {/* Menu Items */}
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/list-user"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/course"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Course
          </NavLink>
          <NavLink
            to="/admin/registerCourse"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg transition ${
                isActive ? "bg-blue-600" : "hover:bg-gray-700"
              }`
            }
          >
            Register
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
