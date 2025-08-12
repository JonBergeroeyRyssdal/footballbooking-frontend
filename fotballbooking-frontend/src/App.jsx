// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Basis-sider
import Home from "./pages/Home";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";

import Pitch from "./Pages/Pitches/Pitch";

// Owner
import OwnerDashboard from "./pages/Owner/OwnerDashboard";
import OwnerLogin from "./pages/Owner/OwnerLogin";
import OwnerRegister from "./pages/Owner/OwnerRegister";
import MyPitches from "./pages/Owner/MyPitches";
import PitchDetail from "./pages/Owner/PitchDetail";
import AddPitch from "./pages/Owner/AddPitch";

// User
import LoginUser from "./pages/User/UserLogin";
import UserRegister from "./pages/User/UserRegister";
import UserDashboard from "./pages/User/UserDashboard";
import MyBookings from "./pages/User/MyBookings";
import Booking from "./pages/User/Booking";

// Admin
import AdminPanel from "./pages/Admin/AdminPanel";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminUserList from "./pages/Admin/AdminUserList";
import AdminOwnerList from "./pages/Admin/AdminOwnerList";
import AdminPitchList from "./pages/Admin/AdminPitchList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/pitches/:id" element={<Pitch />} />


        {/* User */}
        <Route path="/user/login" element={<LoginUser />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/bookings" element={<MyBookings />} />
        <Route path="/user/book" element={<Booking />} />

        {/* Owner */}
        <Route path="/owner/login" element={<OwnerLogin />} />
        <Route path="/owner/register" element={<OwnerRegister />} />
        <Route path="/owner/dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/pitches" element={<MyPitches />} />
        <Route path="/owner/pitches/add" element={<AddPitch />} />
        <Route path="/owner/pitches/:id" element={<PitchDetail />} />

        {/* Admin */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminPanel />} />
        <Route path="/admin/users" element={<AdminUserList />} />
        <Route path="/admin/owners" element={<AdminOwnerList />} />
        <Route path="/admin/pitches" element={<AdminPitchList />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
