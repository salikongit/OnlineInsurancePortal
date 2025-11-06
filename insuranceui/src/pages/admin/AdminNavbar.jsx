// import { Link, useNavigate } from "react-router-dom";

// export default function AdminNavbar() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gray-900 text-white flex justify-between items-center px-8 py-4 shadow-md">
//       <h1 className="text-2xl font-bold text-indigo-400">
//         AssureX Admin Panel
//       </h1>
//       <div className="flex gap-6">
//         <Link to="/admin/dashboard" className="hover:text-indigo-400">
//           Dashboard
//         </Link>
//         <Link to="/admin/users" className="hover:text-indigo-400">
//           Users
//         </Link>
//         <Link to="/admin/claims" className="hover:text-indigo-400">
//           Claims
//         </Link>
//         <Link to="/add-policy" className="hover:text-indigo-400">
//           Add Policy
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
//         >
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useToast } from "../../components/hooks/use-toast";
// import { Button } from "../components/lightswind/button";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  FileText,
  Plus,
  LogOut,
  Shield,
} from "lucide-react";

export default function AdminNavbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const handleLogout = () => {
    toast({
      title: "Logout Successfull bro",
      description: "You are now redirected to Home page",
    });

    // clearing local storage
    localStorage.clear();

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-linear-to-r from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              AssureX Admin
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm lg:text-base group"
            >
              <LayoutDashboard className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Dashboard
              </span>
            </Link>
            <Link
              to="/admin/users"
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm lg:text-base group"
            >
              <Users className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Users
              </span>
            </Link>
            <Link
              to="/admin/claims"
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm lg:text-base group"
            >
              <FileText className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Claims
              </span>
            </Link>
            <Link
              to="/add-policy"
              className="flex items-center gap-2 px-3 lg:px-4 py-2 rounded-lg hover:bg-slate-700 transition-all duration-200 text-sm lg:text-base group"
            >
              <Plus className="w-4 h-4 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Add Policy
              </span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 px-3 lg:px-5 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl text-sm lg:text-base ml-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-slate-700">
            <Link
              to="/admin/dashboard"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <LayoutDashboard className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Dashboard
              </span>
            </Link>
            <Link
              to="/admin/users"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <Users className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Users
              </span>
            </Link>
            <Link
              to="/admin/claims"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <FileText className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Claims
              </span>
            </Link>
            <Link
              to="/add-policy"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-700 transition-all duration-200 group"
            >
              <Plus className="w-5 h-5 group-hover:text-blue-400 transition-colors" />
              <span className="group-hover:text-blue-400 transition-colors">
                Add Policy
              </span>
            </Link>
            <button
              onClick={() => {
                handleLogout();
                closeMenu();
              }}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
