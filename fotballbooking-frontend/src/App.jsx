// src/App.jsx
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import TenantBooking from "./pages/TenantBooking";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import MyPitches from "./pages/MyPitches";
import PitchDetail from "./pages/PitchDetail";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import OrderHistory from "./pages/OrderHistory";
import AdminPanel from "./pages/AdminPanel";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div className="container mt-4">
      <nav className="mb-4">
        <Link className="btn btn-outline-primary me-2" to="/">
          Hjem
        </Link>
        <Link className="btn btn-outline-success me-2" to="/owner">
          Eier
        </Link>
        <Link className="btn btn-outline-warning me-2" to="/book">
          Leie
        </Link>
        <Link className="btn btn-outline-info" to="/about">
          Om oss
        </Link>
        <Link className="btn btn-outline-info" to="/mybookings">
          Mine bookinger
        </Link>
        <Link className="btn btn-outline-info me-2" to="/profile">
          Min profil
        </Link>
        <Link className="btn btn-outline-secondary me-2" to="/orders">
          Mine bookinger
        </Link>
        <Link className="btn btn-outline-dark" to="/contact">
          Kontakt
        </Link>
        <Link className="btn btn-outline-dark" to="/login">
          Login
        </Link>
        <Link className="btn btn-outline-dark" to="/login">
          Register
        </Link>
        <Link className="btn btn-outline-dark" to="/dashboard">
          User Dashboard
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/owner" element={<OwnerDashboard />} />
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/book" element={<TenantBooking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/about" element={<About />} />
        <Route path="/mybookings" element={<MyBookings />} />
        <Route path="/owner/mypitches" element={<MyPitches />} />
        <Route path="/owner/mypitches/:id" element={<PitchDetail />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
