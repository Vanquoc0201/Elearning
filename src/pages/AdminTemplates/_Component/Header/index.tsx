import { useSelector } from "react-redux";
import { RootState } from "../../../../store";

export default function Header() {
  const { data } = useSelector((state: RootState) => state.authReducer);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center space-x-3 text-white">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Logo"
          />
          <span className="text-2xl font-bold tracking-wide">Elearning</span>
        </a>

        {/* Menu */}
        <ul className="hidden md:flex space-x-8 font-medium text-white">
          <li>
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-yellow-300 transition-colors duration-300"
            >
              Services
            </a>
          </li>
        </ul>

        {/* User Info */}
        <div className="flex items-center space-x-3 text-white">
          <img
            src="https://via.placeholder.com/40"
            alt="User Avatar"
            className="w-10 h-10 rounded-full border-2 border-white shadow-md"
          />
          {data?.taiKhoan && (
            <span className="font-medium">{data.taiKhoan}</span>
          )}
        </div>
      </div>
    </nav>
  );
}
