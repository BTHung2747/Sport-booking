import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, History, LogOut, LogIn, UserPlus, ChevronDown, Mail } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setIsDropdownOpen(false);
    const confirm = window.confirm("Bạn có chắc muốn đăng xuất?");
    if (confirm) {
      onLogout();
      navigate('/');
    }
  };

  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-4 text-white bg-gradient-to-r from-[#6B2C91] via-[#D81B60] to-[#FF6E40] shadow-lg">

      <Link to="/" className="flex items-center gap-2 text-2xl font-bold tracking-wider hover:opacity-90 transition">
        SportBooking
      </Link>

      <div className="flex items-center gap-8">
        <Link to="/" className="font-medium hover:text-orange-100 transition">Trang chủ</Link>

        <div className="relative" ref={dropdownRef}>

          {user ? (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded-lg transition focus:outline-none"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-full border border-white/30 overflow-hidden">
                {user.avatar ? (
                  <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User size={18} />
                )}
              </div>
              <span className="font-semibold hidden md:block">{user.name}</span>
              <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
          ) : (
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-full border border-white/30 hover:bg-white/30 transition focus:outline-none shadow-sm"
            >
              <User size={20} />
            </button>
          )}

          {isDropdownOpen && (
            <div className="dropdown-menu">

              {user ? (
                <>
                  {/* User Info Header */}
                  <div className="dropdown-header">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#FF6E40] to-[#D81B60] rounded-full border-2 border-orange-200 overflow-hidden shadow-md">
                        {user.avatar ? (
                          <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={22} className="text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{user.name}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 truncate">
                          <Mail size={12} />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="dropdown-content">
                    <Link
                      to="/history"
                      onClick={() => setIsDropdownOpen(false)}
                      className="dropdown-item"
                    >
                      <div className="dropdown-item-icon">
                        <History size={18} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm">Lịch sử đặt sân</div>
                        <div className="text-xs text-gray-500 mt-0.5">Xem các lần đặt sân trước đó</div>
                      </div>
                    </Link>
                  </div>

                  {/* Logout Section */}
                  <div className="dropdown-footer">
                    <button
                      onClick={handleLogout}
                      className="dropdown-item dropdown-item-danger"
                    >
                      <div className="dropdown-item-icon-danger">
                        <LogOut size={18} />
                      </div>
                      <span className="font-semibold text-sm">Đăng xuất</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="dropdown-guest">
                  <div className="text-center mb-4">
                    <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-50 to-rose-100 rounded-full flex items-center justify-center">
                      <User size={28} className="text-[#FF6E40]" />
                    </div>
                    <p className="text-gray-600 text-sm font-medium">
                      Đăng nhập để đặt sân
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      và xem lịch sử đặt sân của bạn
                    </p>
                  </div>

                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="dropdown-button-primary"
                  >
                    <LogIn size={18} />
                    <span>Đăng nhập</span>
                  </Link>

                  <Link
                    to="/login"
                    onClick={() => setIsDropdownOpen(false)}
                    className="dropdown-button-secondary"
                  >
                    <UserPlus size={18} />
                    <span>Đăng ký tài khoản</span>
                  </Link>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;