import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/auth';
import axios from 'axios';

const NavigationBar = () => {
  const navigate = useNavigate();
  const { auth, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isDashboardPage = location.pathname === '/dashboard';
  const isLoginPage = location.pathname === '/login';
  const isRegisterPage = location.pathname === '/register';

  return (
    <div className="navbar-container">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/" className="mx-auto">
          Ostad User Login System
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {isDashboardPage && auth.token && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          {isDashboardPage && auth.token ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              {isLoginPage && (
                <Button variant="outline-light" as={Link} to="/register">
                  Register
                </Button>
              )}
              {isRegisterPage && (
                <Button variant="outline-light" as={Link} to="/login">
                  Login
                </Button>
              )}
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer />
    </div>
  );
};

export default NavigationBar;
