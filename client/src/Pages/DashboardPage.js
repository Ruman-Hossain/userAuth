import React, { useEffect, useState } from 'react';
import { Card, Container, Spinner, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../Context/auth';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    // Fetch user information from the backend API
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/user/dashboard`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            token: auth.token,
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
          navigate('/login'); // Redirect to login page on error
        }
      } catch (error) {
        console.error(error); // Handle error
      } finally {
        setLoading(false);
      }
    };

    if (auth.token) {
      fetchUser();
    } else {
      if (loading) {
        toast.info('Please login to access the dashboard', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      navigate('/login'); // Redirect to login page if user is not authenticated
    }
  }, []);

  return (
    <Container className="mt-4">
      <h1 className="text-center">Welcome to the Dashboard</h1>
      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>User Information</Card.Title>
              <Table borderless style={{ width: '100%' }}>
                <tbody>
                  <tr>
                    <td>Username:</td>
                    <td>{user.username}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{user.email}</td>
                  </tr>
                  <tr>
                    <td>Phone:</td>
                    <td>{user.phone}</td>
                  </tr>
                  <tr>
                    <td>Role:</td>
                    <td>{user.role}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default DashboardPage;
