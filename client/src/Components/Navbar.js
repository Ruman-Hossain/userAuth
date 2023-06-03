import React from 'react';
import { Nav, Navbar, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/auth';

const NavigationBar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ user: null, token: '' });
    localStorage.removeItem('auth');
    navigate('/login');
  };

  const handleDashboardClick = () => {
    if (!auth.token) {
      toast.error('Please login or register to access the Dashboard.', {
        position: toast.POSITION.TOP_CENTER,
      });
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="navbar-container">
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            {auth.token && (
              <Nav.Link as={Link} to="/dashboard" onClick={handleDashboardClick}>
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          {auth.token ? (
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button variant="outline-light" as={Link} to="/login">
                Login
              </Button>
              <Button variant="outline-light" as={Link} to="/register">
                Register
              </Button>
            </>
          )}
        </Navbar.Collapse>
      </Navbar>
      <ToastContainer />
    </div>
  );
};

export default NavigationBar;
