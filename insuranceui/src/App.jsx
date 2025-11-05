import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import Claim from "./pages/Claim";
import AdminAddPolicy from "./pages/AdminAddPolicy";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import MyAccount from "./pages/MyAccount";
import Footer from "./components/Footer";

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
    path: "/claim",
    element: (
      <>
        <Navbar />
        <Claim />
        <Footer />
      </>
    ),
  },
  {
    path: "/add-policy",
    element: (
      <>
        <Navbar />
        <AdminAddPolicy />
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
    path: "/myaccount",
    element: (
      <>
        <Navbar />
        <MyAccount />
        <Footer />
      </>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
