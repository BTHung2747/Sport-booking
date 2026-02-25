import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, History, User, LogOut } from 'lucide-react';
import { IconSquareLetterSFilled } from '@tabler/icons-react';
import './Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      path: '/',
      icon: Home,
      label: 'Home',
      exact: true
    },
    {
      path: '/history',
      icon: History,
      label: 'My Bookings'
    },
    {
      path: '/profile',
      icon: User,
      label: 'Profile'
    }
  ];

  const isActive = (item) => {
    if (item.exact) {
      return location.pathname === item.path;
    }
    return location.pathname.startsWith(item.path);
  };

  const handleLogout = () => {
    const confirm = window.confirm('Bạn có chắc muốn đăng xuất?');
    if (confirm && onLogout) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <aside className="sidebar">
    
      <div className="sidebar-logo">
        <div className="logo-icon">
          <IconSquareLetterSFilled size={32} />
        </div>
        <span className="logo-text">SportBook</span>
      </div>

      
      <div className="user-profile-card">
        <div className="user-avatar">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" />
          ) : (
            <img src="https://i.pravatar.cc/100?u=johndoe" alt="User Avatar" />
          )}
        </div>
        <div className="user-info">
          <div className="user-name">{user?.name || 'John Doe'}</div>
          <div className="user-role">Customer</div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${active ? 'nav-item-active' : ''}`}
            >
              <Icon size={20} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button
          onClick={handleLogout}
          className="nav-item nav-item-logout"
        >
          <LogOut size={20} className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Navbar;
