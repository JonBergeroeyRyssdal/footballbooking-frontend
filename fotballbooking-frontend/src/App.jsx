// src/App.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import OwnerDashboard from "./pages/OwnerDashboard";
import OwnerLogin from "./pages/OwnerLogin";
import OwnerRegister from "./pages/OwnerRegister";
import Booking from "./pages/Booking";
import LoginUser from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import About from "./pages/About";
import MyPitches from "./pages/MyPitches";
import PitchDetail from "./pages/PitchDetail";
import AdminPanel from "./pages/AdminPanel";
import ContactUs from "./pages/ContactUs";
import NotFound from "./pages/NotFound";
import UserDashboard from "./pages/UserDashboard";
import MyBookings from "./pages/MyBookings";
import AdminLogin from "./pages/AdminLogin";
import Navbar from "./components/Navbar";
import AddPitch from './pages/AddPitch';
import AdminUserList from './pages/AdminUserList';
import AdminOwnerList from './pages/AdminOwnerList'

function App() {
  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/login" element={<OwnerLogin />} />
          <Route path="/owner/register" element={<OwnerRegister />} />
          <Route path="/loginuser" element={<LoginUser />} />
          <Route path="/user/register" element={<UserRegister />} />
          <Route path="/about" element={<About />} />
          <Route path="/owner/mypitches" element={<MyPitches />} />
          <Route path="/owner/mypitches/:id" element={<PitchDetail />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/owner/add-pitch" element={<AddPitch />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/admin/users" element={<AdminUserList />} />
          <Route path="/admin/owners" element={<AdminOwnerList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
