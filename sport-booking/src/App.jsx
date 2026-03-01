import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Nav/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import FieldDetail from './pages/FieldDetail';
import History from './pages/History';

function App() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const handleAddBooking = (newBooking) => {
    const isOverlap = bookings.some(
      b => b.date === newBooking.date && b.slot === newBooking.slot && b.status !== 'Đã hủy'
    );

    if (isOverlap) {
      alert("Bạn đã đặt lịch vào ngày và giờ này rồi! Vui lòng chọn thời gian khác.");
      return false;
    }

    setBookings([newBooking, ...bookings]);
    return true;
  };

  const handleCancelBooking = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn hủy lịch đặt sân này không?")) {
      setBookings(bookings.map(b => b.id === id ? { ...b, status: 'Đã hủy' } : b));
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        <Navbar user={user} onLogout={handleLogout} />

        <div className="container mx-auto mt-6 pb-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />}
            />
            <Route
              path="/field/:id"
              element={<FieldDetail onBook={handleAddBooking} bookings={bookings} />}
            />
            <Route
              path="/history"
              element={user ? <History bookings={bookings} onCancel={handleCancelBooking} /> : <Navigate to="/login" />}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;