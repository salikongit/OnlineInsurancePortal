// components/MainLayout.jsx
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content grows so footer stays bottom */}
      <main className="flex-grow pt-20">{children}</main>

      <Footer />
    </div>
  );
}
