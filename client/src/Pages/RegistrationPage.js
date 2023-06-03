import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const RegistrationPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    if (!username || !email || !phone || !password) {
      toast.error('Please fill in all required fields.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/user/register', {
        username,
        email,
        phone,
        password,
        role,
      });

      if (response.status === 201) {
        toast.success('Registration successful!', {
          position: toast.POSITION.TOP_CENTER,
        });
        navigate('/login'); // Redirect to login page after successful registration
      } else {
        toast.error('Registration failed. Please try again.', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="registration-page">
      <Container>
        <Row>
          <Col md={6} className="mx-auto">
            <h1 className="text-center mb-4">Register</h1>
            <Form onSubmit={handleRegistration}>
              <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter email" value={email} onChange={handleEmailChange} />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone:</Form.Label>
                <Form.Control type="text" placeholder="Enter phone" value={phone} onChange={handlePhoneChange} />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
              </Form.Group>
              <Form.Group controlId="formRole">
                <Form.Label>Role:</Form.Label>
                <Form.Control as="select" value={role} onChange={handleRoleChange}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <p className="text-center mt-2">
                Already registered? <Link to="/login">Login here</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegistrationPage;
