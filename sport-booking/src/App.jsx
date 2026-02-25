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
      <div className="min-h-screen bg-gray-50 font-sans flex">
        <Navbar user={user} onLogout={handleLogout} />
        
        <div className="flex-1 ml-[280px]">
          <div className="w-full">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/login" 
                element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/" />} 
              />
              <Route 
                path="/field/:id" 
                element={<FieldDetail onBook={handleAddBooking} />} 
              />
              <Route 
                path="/history" 
                element={user ? <History bookings={bookings} onCancel={handleCancelBooking} /> : <Navigate to="/login" />} 
              />
              <Route 
                path="/profile" 
                element={<div className="p-8"><h1 className="text-2xl font-bold">Profile Page</h1><p className="mt-4">Coming soon...</p></div>} 
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;