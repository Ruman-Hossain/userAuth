import React, { useEffect, useState } from 'react';
import { Card, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch user information from the backend API
    const fetchUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/user/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          const errorData = await response.json();
          toast.error(errorData.error, {
            position: toast.POSITION.TOP_CENTER,
          });
        }
      } catch (error) {
        console.error(error); // Handle error
      }
    };

    fetchUser();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Welcome to the Dashboard</h1>
      {user ? (
        <Card style={{ width: '18rem' }} className="mt-4">
          <Card.Body>
            <Card.Title>User Information</Card.Title>
            <Card.Text>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
              <p>Role: {user.role}</p>
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <p>
          Please login to view user data. <Link to="/login">Click here to login</Link>
        </p>
      )}
    </Container>
  );
};

export default DashboardPage;
