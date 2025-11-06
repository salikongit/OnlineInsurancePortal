export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 ">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center md:text-left mb-3 md:mb-0">
          <h2 className="text-lg font-semibold text-white">AssureX</h2>
          <p className="text-sm text-gray-400">
            Secure • Reliable • Hassle-free insurance management
          </p>
        </div>

        {/* Center Section */}
        <div className="flex space-x-6 mb-3 md:mb-0">
          <a
            href="/about"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            About Us
          </a>
          <a
            href="/contact"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Contact
          </a>
          <a
            href="/claim"
            className="hover:text-blue-400 transition-colors duration-200"
          >
            Claim
          </a>
        </div>

        {/* Right Section */}
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()}{" "}
          <span className="text-blue-400">Insurance Portal</span>. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
