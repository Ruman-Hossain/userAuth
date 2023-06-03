import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/auth.js';
import axios from 'axios';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // Handle case when email or password is not given
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { user, token } = response.data;
        toast.success('Login successful!', {
          position: toast.POSITION.TOP_CENTER,
        });
        setAuth({ user, token }); // Update auth context with user and token
        localStorage.setItem('auth', JSON.stringify({ user, token })); // Store auth data in local storage
        navigate('/dashboard'); // Redirect to dashboard page
      } else {
        toast.error('Invalid email or password. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="login-page">
      <Container>
        <Row>
          <Col md={6} className="mx-auto">
            <h1 className="text-center mb-4">Login</h1>
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
              </Form.Group>
              <Button variant="primary" type="submit" disabled={!email || !password}>
                Login
              </Button>
              <p className="text-center mt-2">
                Don't have an account? <Link to="/register">Register here</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
