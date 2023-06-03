import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/auth.js';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('ruman.cse.brur@gmail.com');
  const [password, setPassword] = useState('Ostad@2023');
  const { auth, login } = useAuth();

  useEffect(() => {
    if (auth.token) {
      // Redirect to dashboard page if session is not destroyed
      navigate('/dashboard');
    }
  }, [auth.token, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please provide both email and password.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard'); // Redirect to dashboard page
    } catch (error) {
      toast.error('Invalid email or password. Please try again.', {
        position: toast.POSITION.TOP_CENTER,
      });
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
              <Button variant="primary" type="submit">
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
