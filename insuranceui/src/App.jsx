import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Home } from "./pages/Home";
import Claim from "./pages/Claim";
import AdminAddPolicy from "./pages/AdminAddPolicy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyAccount from "./pages/MyAccount";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminNavbar from "./pages/admin/AdminNavbar";
import AdminClaims from "./pages/admin/AdminClaims";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPolicies from "./pages/admin/AdminPolicies";
import { Toaster } from "./components/lightswind/toaster";
import PolicyDetails from "./pages/PolicyDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/about",
    element: (
      <>
        <Navbar />
        <AboutUs />
        <Footer />
      </>
    ),
  },
  {
    path: "/contact",
    element: (
      <>
        <Navbar />
        <ContactUs />
        <Footer />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar />
        <Login />
        <Footer />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Navbar />
        <Register />
        <Footer />
      </>
    ),
  },
  // 🧩 Protected routes
  {
    path: "/myaccount",
    element: (
      <>
        <Navbar />
        <ProtectedRoute allowedRole="user">
          <MyAccount />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  {
    path: "/claim",
    element: (
      <>
        <Navbar />
        <ProtectedRoute allowedRole="user">
          <Claim />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  {
    path: "/policy/:id",
    element: (
      <>
        <Navbar />
        <ProtectedRoute allowedRole="user">
          <PolicyDetails />
        </ProtectedRoute>
        <Footer />
      </>
    ),
  },
  // protected Admin routes

  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/claims",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminClaims />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/users", // ✅ New route
    element: (
      <>
        <AdminNavbar />
        <ProtectedRoute allowedRole="admin">
          <AdminUsers />
        </ProtectedRoute>
      </>
    ),
  },
  {
    path: "/add-policy",
    element: (
      <ProtectedRoute allowedRole="admin">
        <AdminPolicies />
      </ProtectedRoute>
    ),
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}
