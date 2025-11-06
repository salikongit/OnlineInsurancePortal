// // import React from "react";

// // function Navbar() {
// //   return (
// //     <div>
// //       <h1 className="bg-amber-200">hello</h1>
// //     </div>
// //   );
// // }

// // export default Navbar;
// import { Link, useLocation } from "react-router-dom";

// export default function Navbar() {
//   const location = useLocation();

//   const navItems = [
//     { path: "/", label: "Home" },
//     { path: "/about", label: "About Us" },
//     { path: "/contact", label: "Contact Us" },
//     { path: "/claim", label: "Claim" },
//     { path: "/myaccount", label: "My Account" },
//     { path: "/login", label: "Login" },
//   ];

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-3 shadow-md">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
//         {/* Logo / Brand Name */}
//         <Link to="/" className="text-2xl font-bold tracking-wide">
//           Online Insurance Portal
//         </Link>

//         {/* Navigation Links */}
//         <div className="space-x-6 hidden md:flex">
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`hover:text-yellow-300 transition-colors duration-200 ${
//                 location.pathname === item.path
//                   ? "text-yellow-300 font-semibold"
//                   : ""
//               }`}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </div>

//         {/* Mobile Menu (optional toggle for later) */}
//         <button className="md:hidden border px-3 py-1 rounded-lg hover:bg-blue-700">
//           ☰
//         </button>
//       </div>
//     </nav>
//   );
// }

// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import navbarLogo from "../assets/navbarLogo.png";
// import { useToast } from "../components/hooks/use-toast";

// const Navbar = () => {
//   const navigate = useNavigate();

//   const [isScrolled, setIsScrolled] = React.useState(false);
//   const [isMenuOpen, setIsMenuOpen] = React.useState(false);
//   const { toast } = useToast();
//   // Get login info from localStorage
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role");

//   // Build nav links dynamically based on role
//   const navLinks = [
//     { name: "Home", path: "/" },
//     { name: "About Us", path: "/about" },
//     { name: "Contact", path: "/contact" },
//   ];

//   if (role === "user") {
//     navLinks.push({ name: "Claim", path: "/claim" });
//     navLinks.push({ name: "My Account", path: "/myaccount" });
//   }

//   if (role === "admin") {
//     navLinks.push({ name: "Add Policy", path: "/add-policy" });
//   }

//   React.useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleLogout = () => {
//     toast({
//       title: "Logout Successfull",
//       description: " You are now redirected to the Login page",
//     });

//     localStorage.removeItem("token");
//     localStorage.removeItem("role");

//     setTimeout(() => {
//       navigate("/login");
//     }, 2000);
//   };

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
//         isScrolled
//           ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
//           : "bg-indigo-500 text-white py-4 md:py-6"
//       }`}
//     >
//       {/* Logo */}
//       <Link to="/" className="flex items-center gap-3">
//         <img src={navbarLogo} alt="AssureX logo" className="w-10" />
//         <div className="flex flex-col">
//           <span
//             className={`text-2xl font-bold ${
//               isScrolled ? "text-indigo-600" : "text-white"
//             }`}
//           >
//             AssureX
//           </span>
//           <span className="text-sm text-gray-300">
//             An Online Solution to your Insurance
//           </span>
//         </div>
//       </Link>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-6 lg:gap-10">
//         {navLinks.map((link, i) => (
//           <Link
//             key={i}
//             to={link.path}
//             className={`group flex flex-col gap-0.5 ${
//               isScrolled ? "text-gray-700" : "text-white"
//             }`}
//           >
//             {link.name}
//             <div
//               className={`${
//                 isScrolled ? "bg-gray-700" : "bg-white"
//               } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
//             />
//           </Link>
//         ))}
//       </div>

//       {/* Right side buttons */}
//       <div className="hidden md:flex items-center gap-4">
//         <svg
//           className={`h-6 w-6 transition-all duration-500 ${
//             isScrolled ? "text-gray-700" : "text-white"
//           }`}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           <circle cx="11" cy="11" r="8" />
//           <line x1="21" y1="21" x2="16.65" y2="16.65" />
//         </svg>

//         {!token ? (
//           <button
//             onClick={() => navigate("/login")}
//             className={`px-6 py-2 rounded-full ml-4 transition-all duration-500 ${
//               isScrolled
//                 ? "text-white bg-black hover:bg-gray-800"
//                 : "bg-white text-black hover:bg-gray-200"
//             }`}
//           >
//             Login
//           </button>
//         ) : (
//           <button
//             onClick={handleLogout}
//             className={`px-6 py-2 rounded-full ml-4 transition-all duration-500 ${
//               isScrolled
//                 ? "text-white bg-red-600 hover:bg-red-700"
//                 : "bg-white text-red-600 hover:bg-red-100"
//             }`}
//           >
//             Logout
//           </button>
//         )}
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="flex items-center gap-3 md:hidden">
//         <svg
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           className={`h-6 w-6 cursor-pointer ${
//             isScrolled ? "text-gray-800" : "text-white"
//           }`}
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           viewBox="0 0 24 24"
//         >
//           <line x1="4" y1="6" x2="20" y2="6" />
//           <line x1="4" y1="12" x2="20" y2="12" />
//           <line x1="4" y1="18" x2="20" y2="18" />
//         </svg>
//       </div>

//       {/* Mobile Menu Overlay */}
//       <div
//         className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-gray-800 text-lg transition-transform duration-500 md:hidden ${
//           isMenuOpen ? "translate-x-0" : "-translate-x-full"
//         }`}
//       >
//         <button
//           className="absolute top-5 right-5"
//           onClick={() => setIsMenuOpen(false)}
//         >
//           <svg
//             className="h-6 w-6"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <line x1="18" y1="6" x2="6" y2="18" />
//             <line x1="6" y1="6" x2="18" y2="18" />
//           </svg>
//         </button>

//         {navLinks.map((link, i) => (
//           <Link
//             key={i}
//             to={link.path}
//             onClick={() => setIsMenuOpen(false)}
//             className="hover:text-indigo-600 transition-all"
//           >
//             {link.name}
//           </Link>
//         ))}

//         {!token ? (
//           <button
//             onClick={() => {
//               setIsMenuOpen(false);
//               navigate("/login");
//             }}
//             className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800"
//           >
//             Login
//           </button>
//         ) : (
//           <button
//             onClick={() => {
//               setIsMenuOpen(false);
//               handleLogout();
//             }}
//             className="bg-red-600 text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-red-700"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import finalLogo from "../assets/finalLogo.png";
import { useToast } from "../components/hooks/use-toast";

const Navbar = () => {
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { toast } = useToast();
  // Get login info from localStorage
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Build nav links dynamically based on role
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  if (role === "user") {
    navLinks.push({ name: "Claim", path: "/claim" });
    navLinks.push({ name: "My Account", path: "/myaccount" });
  }

  if (role === "admin") {
    navLinks.push({ name: "Add Policy", path: "/add-policy" });
  }

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logout Successfull",
      description: " You are now redirected to the Login page",
    });
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user"); // ✅ FIX added
    window.dispatchEvent(new Event("storage")); // ✅ triggers UI update

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${
        isScrolled
          ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4"
          : "bg-indigo-500 text-white py-4 md:py-6"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="flex items-center gap-3">
        <img src={finalLogo} alt="AssureX logo" className="w-20" />
        <div className="flex flex-col">
          <span
            className={`text-2xl font-bold ${
              isScrolled ? "text-indigo-600" : "text-white"
            }`}
          >
            AssureX
          </span>
          <span className="text-sm text-gray-300">
            An Online Solution to your Insurance
          </span>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-6 lg:gap-10">
        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            className={`group flex flex-col gap-0.5 ${
              isScrolled ? "text-gray-700" : "text-white"
            }`}
          >
            {link.name}
            <div
              className={`${
                isScrolled ? "bg-gray-700" : "bg-white"
              } h-0.5 w-0 group-hover:w-full transition-all duration-300`}
            />
          </Link>
        ))}
      </div>

      {/* Right side buttons */}
      <div className="hidden md:flex items-center gap-4">
        {!token ? (
          <button
            onClick={() => navigate("/login")}
            className={`px-6 py-2 rounded-full ml-4 transition-all duration-500 ${
              isScrolled
                ? "text-white bg-black hover:bg-gray-800"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            Login
          </button>
        ) : (
          <button
            onClick={handleLogout}
            className={`px-6 py-2 rounded-full ml-4 transition-all duration-500 ${
              isScrolled
                ? "text-white bg-red-600 hover:bg-red-700"
                : "bg-white text-red-600 hover:bg-red-100"
            }`}
          >
            Logout
          </button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-3 md:hidden">
        <svg
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`h-6 w-6 cursor-pointer ${
            isScrolled ? "text-gray-800" : "text-white"
          }`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="18" x2="20" y2="18" />
        </svg>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white flex flex-col items-center justify-center gap-6 text-gray-800 text-lg transition-transform duration-500 md:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="absolute top-5 right-5"
          onClick={() => setIsMenuOpen(false)}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {navLinks.map((link, i) => (
          <Link
            key={i}
            to={link.path}
            onClick={() => setIsMenuOpen(false)}
            className="hover:text-indigo-600 transition-all"
          >
            {link.name}
          </Link>
        ))}

        {!token ? (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              navigate("/login");
            }}
            className="bg-black text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-gray-800"
          >
            Login
          </button>
        ) : (
          <button
            onClick={() => {
              setIsMenuOpen(false);
              handleLogout();
            }}
            className="bg-red-600 text-white px-8 py-2.5 rounded-full transition-all duration-500 hover:bg-red-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
