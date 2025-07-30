// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import TenantBooking from "./pages/TenantBooking";
import LoginUser from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import About from "./pages/About";
import MyPitches from "./pages/MyPitches";
import PitchDetail from "./pages/PitchDetail";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import AdminLogin from './pages/AdminLogin'





function App() {
  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link className="btn btn-outline-primary me-2" to="/">
          Hjem
        </Link>
        <Link className="btn btn-outline-success me-2" to="/owner/dashboard">
          Eier
        </Link>
        <Link className="btn btn-outline-warning me-2" to="/book">
          Leie
        </Link>
        <Link className="btn btn-outline-info" to="/about">
          Om oss
        </Link>
        <Link className="btn btn-outline-info me-2" to="/profile">
          Min profil
        </Link>
        <Link className="btn btn-outline-dark" to="/contact">
          Kontakt
        </Link>
        <Link className="btn btn-outline-dark" to="/loginuser">
          User Login 
        </Link>
        <Link className="btn btn-outline-dark" to="/user/register">
          User Register
        </Link>
        <Link className="btn btn-outline-dark" to="/owner/register">
          Owner Register
        </Link>
        <Link className="btn btn-outline-dark" to="/dashboard">
          User Dashboard
        </Link>
        <Link className="btn btn-outline-dark" to="/mybookings">
          My bookings
        </Link>
        <Link className="btn btn-outline-dark" to="/owner/login">
          Owner Login
        </Link>
        <Link className="btn btn-outline-dark" to="/admin/login">
          Admin Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/book" element={<TenantBooking />} />
        <Route path="/loginuser" element={<LoginUser />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/about" element={<About />} />
        <Route path="/owner/mypitches" element={<MyPitches />} />
        <Route path="/owner/mypitches/:id" element={<PitchDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/admin/login" element={<AdminLogin />} />

      </Routes>
    </div>
  );
}

export default App;
